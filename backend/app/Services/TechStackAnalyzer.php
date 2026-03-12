<?php

namespace App\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;

class TechStackAnalyzer
{
    private Client $client;

    public function __construct()
    {
        $this->client = new Client([
            'timeout'         => 10,
            'verify'          => false,
            'allow_redirects' => true,
            'headers'         => [
                'User-Agent' => 'Mozilla/5.0 (compatible; TechStackGuessr/1.0)',
            ],
        ]);
    }

    public function analyze(string $url): array
    {
        try {
            $response = $this->client->get($url);
            $html     = (string) $response->getBody();
            $headers  = $this->flattenHeaders($response->getHeaders());

            return [
                'headers' => $headers,
                'signals' => $this->extractSignals($html, $headers),
                'html'    => substr($html, 0, 5000), // send first 5kb to AI
            ];
        } catch (RequestException $e) {
            throw new \Exception('Could not reach the URL: ' . $e->getMessage());
        }
    }

    private function flattenHeaders(array $headers): array
    {
        $flat = [];
        foreach ($headers as $name => $values) {
            $flat[strtolower($name)] = implode(', ', $values);
        }
        return $flat;
    }

    private function extractSignals(string $html, array $headers): array
    {
        $signals = [];

        // --- HEADERS ---
        if (!empty($headers['x-powered-by'])) {
            $signals[] = 'Header X-Powered-By: ' . $headers['x-powered-by'];
        }
        if (!empty($headers['server'])) {
            $signals[] = 'Header Server: ' . $headers['server'];
        }
        if (!empty($headers['x-generator'])) {
            $signals[] = 'Header X-Generator: ' . $headers['x-generator'];
        }
        if (!empty($headers['x-drupal-cache'])) {
            $signals[] = 'Header indicates Drupal';
        }
        if (!empty($headers['x-shopify-stage'])) {
            $signals[] = 'Header indicates Shopify';
        }

        // --- COOKIES ---
        if (!empty($headers['set-cookie'])) {
            $cookie = $headers['set-cookie'];
            if (str_contains($cookie, 'PHPSESSID'))   $signals[] = 'Cookie: PHP session detected';
            if (str_contains($cookie, 'laravel'))      $signals[] = 'Cookie: Laravel session detected';
            if (str_contains($cookie, 'wordpress'))    $signals[] = 'Cookie: WordPress detected';
            if (str_contains($cookie, 'shopify'))      $signals[] = 'Cookie: Shopify detected';
        }

        // --- HTML PATTERNS ---
        $patterns = [
            '/wp-content\//i'                         => 'WordPress (wp-content path)',
            '/wp-includes\//i'                        => 'WordPress (wp-includes path)',
            '/<meta[^>]+generator[^>]+wordpress/i'    => 'WordPress meta generator',
            '/<meta[^>]+generator[^>]+drupal/i'       => 'Drupal meta generator',
            '/<meta[^>]+generator[^>]+joomla/i'       => 'Joomla meta generator',
            '/cdn\.shopify\.com/i'                    => 'Shopify CDN',
            '/Shopify\.theme/i'                       => 'Shopify JS object',
            '/_next\/static/i'                        => 'Next.js (_next/static path)',
            '/__nuxt/i'                               => 'Nuxt.js (__nuxt)',
            '/ng-version=/i'                          => 'Angular (ng-version)',
            '/data-reactroot/i'                       => 'React (data-reactroot)',
            '/gatsby-focus-wrapper/i'                 => 'Gatsby',
            '/svelte/i'                               => 'Svelte',
            '/laravel/i'                              => 'Laravel reference in HTML',
            '/bootstrap\.min\.css/i'                  => 'Bootstrap CSS',
            '/tailwind/i'                             => 'Tailwind CSS',
            '/jquery\.min\.js/i'                      => 'jQuery',
            '/cdn\.jsdelivr\.net\/npm\/vue/i'         => 'Vue.js CDN',
            '/unpkg\.com\/react/i'                    => 'React CDN',
            '/fonts\.googleapis\.com/i'               => 'Google Fonts',
            '/cloudflare/i'                           => 'Cloudflare',
            '/amazonaws\.com/i'                       => 'AWS S3 / CloudFront',
            '/vercel/i'                               => 'Vercel deployment',
            '/netlify/i'                              => 'Netlify deployment',
        ];

        foreach ($patterns as $pattern => $label) {
            if (preg_match($pattern, $html)) {
                $signals[] = $label;
            }
        }

        return array_unique($signals);
    }
}

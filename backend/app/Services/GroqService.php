<?php

namespace App\Services;

use GuzzleHttp\Client;

class GroqService
{
    private Client $client;
    private string $apiKey;
    private string $model = 'llama-3.3-70b-versatile';

    public function __construct()
    {
        $this->apiKey = config('services.groq.key');
        $this->client = new Client([
            'base_uri' => 'https://api.groq.com/openai/v1/',
            'timeout'  => 30,
            'headers'  => [
                'Authorization' => 'Bearer ' . $this->apiKey,
                'Content-Type'  => 'application/json',
            ],
        ]);
    }

    public function analyzeTechStack(string $url, array $signals, string $htmlSnippet): array
    {
        $signalsList = implode("\n", array_map(fn($s) => "- $s", $signals));

        $prompt = <<<PROMPT
You are a senior web developer and tech stack detective. Analyze the following signals from the website "{$url}" and identify the technologies used.

DETECTED SIGNALS:
{$signalsList}

HTML SNIPPET (first 5kb):
{$htmlSnippet}

Based on these signals, respond ONLY with a valid JSON object (no markdown, no explanation) in this exact format:
{
  "technologies": [
    {
      "name": "Technology Name",
      "category": "Frontend|Backend|CMS|Database|DevOps|CDN|Analytics|CSS Framework|JS Library|Hosting",
      "confidence": 95,
      "reason": "One short sentence explaining why you detected this"
    }
  ],
  "summary": "2-3 sentence plain English summary of what this site is built with and why",
  "interesting_fact": "One cool/surprising insight about their stack choice"
}

Rules:
- confidence is a number 0-100
- Only include technologies you're reasonably sure about (confidence >= 40)
- Order by confidence descending
- Be specific (e.g. "Next.js" not just "React")
- Max 10 technologies
PROMPT;

        $response = $this->client->post('chat/completions', [
            'json' => [
                'model'    => $this->model,
                'messages' => [
                    ['role' => 'user', 'content' => $prompt],
                ],
                'max_tokens'  => 1000,
                'temperature' => 0.3,
            ],
        ]);

        $data    = json_decode((string) $response->getBody(), true);
        $content = $data['choices'][0]['message']['content'] ?? '{}';

        // Strip potential markdown fences
        $content = preg_replace('/^```json\s*/m', '', $content);
        $content = preg_replace('/^```\s*/m', '', $content);
        $content = trim($content);

        $parsed = json_decode($content, true);

        if (!$parsed || !isset($parsed['technologies'])) {
            throw new \Exception('AI returned invalid response');
        }

        return $parsed;
    }
}

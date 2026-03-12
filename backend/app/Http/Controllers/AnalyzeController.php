<?php

namespace App\Http\Controllers;

use App\Services\GroqService;
use App\Services\TechStackAnalyzer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AnalyzeController extends Controller
{
    public function __construct(
        private TechStackAnalyzer $analyzer,
        private GroqService $groq
    ) {}

    public function analyze(Request $request): JsonResponse
    {
        $request->validate([
            'url' => ['required', 'url', 'max:500'],
        ]);

        $url = $request->input('url');

        // Ensure URL has a scheme
        if (!str_starts_with($url, 'http')) {
            $url = 'https://' . $url;
        }

        try {
            // Step 1: Fetch & extract signals
            $data = $this->analyzer->analyze($url);

            // Step 2: Send to AI for smart analysis
            $result = $this->groq->analyzeTechStack(
                $url,
                $data['signals'],
                $data['html']
            );

            return response()->json([
                'success' => true,
                'url'     => $url,
                'result'  => $result,
                'signals' => $data['signals'], // raw signals for debugging
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 422);
        }
    }
}

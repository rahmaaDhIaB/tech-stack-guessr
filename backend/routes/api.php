<?php

use App\Http\Controllers\AnalyzeController;
use Illuminate\Support\Facades\Route;

Route::post('/analyze', [AnalyzeController::class, 'analyze']);

Route::get('/health', fn() => response()->json(['status' => 'ok', 'service' => 'TechStackGuessr API']));

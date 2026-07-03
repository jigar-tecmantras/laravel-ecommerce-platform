<?php

namespace App\Services\Integration;

use Illuminate\Support\Facades\Log;

class AnalyticsTracker
{
    public static function trackEvent(string $event, array $payload = []): void
    {
        Log::info('Analytics event dispatched', [
            'event' => $event,
            'payload' => $payload,
        ]);
    }
}

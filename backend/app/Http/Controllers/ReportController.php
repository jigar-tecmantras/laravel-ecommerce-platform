<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Services\Integration\AnalyticsTracker;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function sales(Request $request)
    {
        $this->ensureAdmin($request);

        $start = Carbon::parse($request->input('start', Carbon::now()->subMonth()))
            ->startOfDay();
        $end = Carbon::parse($request->input('end', Carbon::now()))
            ->endOfDay();

        $orders = Order::with('customer')
            ->whereBetween('created_at', [$start, $end])
            ->get();

        $summary = [
            'total_orders' => $orders->count(),
            'total_revenue' => $orders->sum('total'),
            'average_order_value' => $orders->count() ? round($orders->sum('total') / $orders->count(), 2) : 0,
        ];

        $payload = [
            'start' => $start->toDateString(),
            'end' => $end->toDateString(),
            'summary' => $summary,
            'orders' => $orders,
        ];

        AnalyticsTracker::trackEvent('admin_report_requested', $payload);

        return response()->json($payload);
    }

    protected function ensureAdmin(Request $request): void
    {
        if ($request->user()->role !== 'admin') {
            abort(403, 'Administrator access required.');
        }
    }
}

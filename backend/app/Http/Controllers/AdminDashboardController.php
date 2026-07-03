<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;

class AdminDashboardController extends Controller
{
    public function overview(Request $request)
    {
        $this->ensureAdmin($request);

        $metrics = [
            'total_orders' => Order::count(),
            'pending_orders' => Order::where('status', 'pending')->count(),
            'total_revenue' => Order::sum('total'),
            'low_stock_products' => Product::where('stock', '<', 10)
                ->orderBy('stock')
                ->limit(5)
                ->get(['id', 'name', 'stock']),
            'recent_orders' => Order::with('customer')
                ->latest()
                ->limit(5)
                ->get(['id', 'customer_id', 'total', 'status', 'created_at']),
        ];

        return response()->json($metrics);
    }

    protected function ensureAdmin(Request $request): void
    {
        if ($request->user()->role !== 'admin') {
            abort(403, 'Administrator access required.');
        }
    }
}

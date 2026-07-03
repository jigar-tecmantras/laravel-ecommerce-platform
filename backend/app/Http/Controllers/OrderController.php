<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use App\Services\Integration\AnalyticsTracker;
use App\Services\Integration\NotificationHub;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function checkout(Request $request)
    {
        $customer = $request->user();
        $cartItems = CartItem::with('product')->where('customer_id', $customer->id)->get();

        if ($cartItems->isEmpty()) {
            return response()->json(['message' => 'Cart is empty.'], 422);
        }

        $total = $cartItems->reduce(function ($carry, CartItem $item) {
            if (! $item->product) {
                return $carry;
            }

            return $carry + ($item->product->price * $item->quantity);
        }, 0);

        $order = DB::transaction(function () use ($customer, $cartItems, $request, $total) {
            $order = Order::create([
                'customer_id' => $customer->id,
                'status' => 'pending',
                'payment_status' => 'pending',
                'total' => $total,
                'currency' => $request->input('currency', 'USD'),
                'notes' => $request->input('notes', ''),
            ]);

            foreach ($cartItems as $cartItem) {
                $product = $cartItem->product;

                if (! $product) {
                    continue;
                }

                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'quantity' => $cartItem->quantity,
                    'unit_price' => $product->price,
                    'total_price' => $product->price * $cartItem->quantity,
                ]);

                $product->decrement('stock', $cartItem->quantity);
            }

            CartItem::where('customer_id', $customer->id)->delete();

            return $order;
        });

        $order->loadMissing(['items.product', 'customer']);

        NotificationHub::sendOrderNotifications($order);

        AnalyticsTracker::trackEvent('order_created', [
            'order_id' => $order->id,
            'customer_id' => $customer->id,
            'total' => $order->total,
        ]);

        return response()->json([
            'message' => 'Checkout complete.',
            'order' => $order,
        ], 201);
    }

    public function index(Request $request)
    {
        $customer = $request->user();
        $orders = Order::with(['items.product'])
            ->where('customer_id', $customer->id)
            ->latest()
            ->get();

        return response()->json($orders);
    }

    public function show(Request $request, Order $order)
    {
        $customer = $request->user();

        if ($order->customer_id !== $customer->id) {
            return response()->json(['message' => 'Not authorized to view this order'], 403);
        }

        $order->load('items.product');

        return response()->json($order);
    }
}

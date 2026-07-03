<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrderSeeder extends Seeder
{
    public function run(): void
    {
        $customer = Customer::where('email', 'anisa.diaz@example.com')->first();
        $product = Product::where('slug', 'northwind-task-lamp')->first();

        if (! $customer || ! $product) {
            return;
        }

        DB::transaction(function () use ($customer, $product) {
            $order = Order::create([
                'customer_id' => $customer->id,
                'status' => 'processing',
                'payment_status' => 'paid',
                'total' => $product->price * 2,
                'currency' => 'USD',
                'notes' => 'Expedited shipping requested',
            ]);

            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $product->id,
                'quantity' => 2,
                'unit_price' => $product->price,
                'total_price' => $product->price * 2,
            ]);
        });
    }
}

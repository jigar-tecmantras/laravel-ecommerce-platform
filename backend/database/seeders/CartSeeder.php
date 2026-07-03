<?php

namespace Database\Seeders;

use App\Models\CartItem;
use App\Models\Customer;
use App\Models\Product;
use Illuminate\Database\Seeder;

class CartSeeder extends Seeder
{
    public function run(): void
    {
        $customer = Customer::where('email', 'leo.park@example.com')->first();
        $product = Product::where('slug', 'cedarwood-modular-sofa')->first();

        if (! $customer || ! $product) {
            return;
        }

        CartItem::create([
            'customer_id' => $customer->id,
            'product_id' => $product->id,
            'quantity' => 1,
            'price_at_add' => $product->price,
        ]);
    }
}

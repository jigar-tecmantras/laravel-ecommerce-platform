<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function index(Request $request)
    {
        $customer = $request->user();
        $items = CartItem::with('product')->where('customer_id', $customer->id)->get();

        $summary = [
            'items' => $items,
            'subtotal' => $items->reduce(function ($carry, CartItem $item) {
                if (! $item->product) {
                    return $carry;
                }

                return $carry + ($item->product->price * $item->quantity);
            }, 0),
        ];

        return response()->json($summary);
    }

    public function store(Request $request)
    {
        $customer = $request->user();

        $payload = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $product = Product::find($payload['product_id']);

        if (! $product || $product->stock < $payload['quantity']) {
            return response()->json(['message' => 'Requested quantity is not available.'], 422);
        }

        $item = CartItem::updateOrCreate(
            [
                'customer_id' => $customer->id,
                'product_id' => $product->id,
            ],
            [
                'quantity' => $payload['quantity'],
                'price_at_add' => $product->price,
            ]
        );

        return response()->json([
            'message' => 'Item added to cart.',
            'item' => $item->load('product'),
        ]);
    }

    public function update(Request $request, CartItem $cartItem)
    {
        $customer = $request->user();

        if ($cartItem->customer_id !== $customer->id) {
            return response()->json(['message' => 'Unauthorized cart item'], 403);
        }

        $payload = $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $product = $cartItem->product;

        if (! $product || $product->stock < $payload['quantity']) {
            return response()->json(['message' => 'Cannot reserve the requested quantity.'], 422);
        }

        $cartItem->update(['quantity' => $payload['quantity']]);

        return response()->json([
            'message' => 'Cart updated.',
            'item' => $cartItem->load('product'),
        ]);
    }

    public function destroy(Request $request, CartItem $cartItem)
    {
        $customer = $request->user();

        if ($cartItem->customer_id !== $customer->id) {
            return response()->json(['message' => 'Unauthorized cart action'], 403);
        }

        $cartItem->delete();

        return response()->json(['message' => 'Cart item removed.']);
    }
}

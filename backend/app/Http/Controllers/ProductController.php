<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with(['category', 'brand']);

        if ($request->filled('category_id')) {
            $query->where('category_id', $request->input('category_id'));
        }

        if ($request->filled('brand_id')) {
            $query->where('brand_id', $request->input('brand_id'));
        }

        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        if ($request->filled('search')) {
            $term = '%' . $request->input('search') . '%';
            $query->where(function ($q) use ($term) {
                $q->where('name', 'like', $term)
                    ->orWhere('description', 'like', $term);
            });
        }

        $perPage = max(12, (int) $request->input('per_page', 12));

        return response()->json($query->paginate($perPage));
    }

    public function show(Product $product)
    {
        $product->load(['category', 'brand']);

        return response()->json($product);
    }

    public function store(Request $request)
    {
        $payload = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:products,slug',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'status' => 'required|string|in:active,inactive',
            'category_id' => 'required|exists:categories,id',
            'brand_id' => 'nullable|exists:brands,id',
            'image_url' => 'nullable|url',
        ]);

        $product = Product::create($payload);

        return response()->json([
            'message' => 'Product created.',
            'product' => $product,
        ], 201);
    }

    public function update(Request $request, Product $product)
    {
        $payload = $request->validate([
            'name' => 'sometimes|string|max:255',
            'slug' => ['sometimes', 'string', Rule::unique('products', 'slug')->ignore($product->id)],
            'description' => 'nullable|string',
            'price' => 'sometimes|numeric|min:0',
            'stock' => 'sometimes|integer|min:0',
            'status' => 'sometimes|string|in:active,inactive',
            'category_id' => 'sometimes|exists:categories,id',
            'brand_id' => 'nullable|exists:brands,id',
            'image_url' => 'nullable|url',
        ]);

        $product->update($payload);

        return response()->json([
            'message' => 'Product updated.',
            'product' => $product,
        ]);
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json(['message' => 'Product removed.']);
    }
}

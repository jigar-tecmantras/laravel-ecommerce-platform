<?php

namespace App\Http\Controllers;

use App\Models\Category;

class CategoryController extends Controller
{
    public function index()
    {
        return response()->json(Category::withCount('products')->get());
    }

    public function show(Category $category)
    {
        $category->load('products');

        return response()->json($category);
    }
}

<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\ReportController;

Route::get('/', function () {
    return response()->json(['message' => 'Laravel Ecommerce API']);
});

Route::post('auth/register', [AuthController::class, 'register']);
Route::post('auth/login', [AuthController::class, 'login']);

Route::get('products', [ProductController::class, 'index']);
Route::get('products/{product}', [ProductController::class, 'show']);
Route::get('categories', [CategoryController::class, 'index']);
Route::get('categories/{category}', [CategoryController::class, 'show']);
Route::get('brands', [BrandController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('auth/logout', [AuthController::class, 'logout']);

    Route::post('products', [ProductController::class, 'store']);
    Route::patch('products/{product}', [ProductController::class, 'update']);
    Route::delete('products/{product}', [ProductController::class, 'destroy']);

    Route::post('cart', [CartController::class, 'store']);
    Route::patch('cart/{cartItem}', [CartController::class, 'update']);
    Route::delete('cart/{cartItem}', [CartController::class, 'destroy']);
    Route::get('cart', [CartController::class, 'index']);

    Route::post('checkout', [OrderController::class, 'checkout']);
    Route::get('orders', [OrderController::class, 'index']);
    Route::get('orders/{order}', [OrderController::class, 'show']);

    Route::prefix('admin')->group(function () {
        Route::get('overview', [AdminDashboardController::class, 'overview']);
        Route::post('reports/sales', [ReportController::class, 'sales']);
    });
});

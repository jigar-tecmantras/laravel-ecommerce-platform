<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $bluePrint = [
            [
                'name' => 'Cedarwood Modular Sofa',
                'slug' => 'cedarwood-modular-sofa',
                'description' => 'Deep seating with removable covers and hidden storage.',
                'price' => 1899,
                'stock' => 24,
                'status' => 'active',
                'image_url' => 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80',
                'category' => 'living-room',
                'brand' => 'hearth-timber',
            ],
            [
                'name' => 'Pulse Console Table',
                'slug' => 'pulse-console-table',
                'description' => 'Textured oak with a steel frame and valet drawer.',
                'price' => 749,
                'stock' => 18,
                'status' => 'active',
                'image_url' => 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80',
                'category' => 'decor-wall',
                'brand' => 'atlas-atelier',
            ],
            [
                'name' => 'Northwind Task Lamp',
                'slug' => 'northwind-task-lamp',
                'description' => 'Brushed brass arm with dimmable touch controls.',
                'price' => 238,
                'stock' => 52,
                'status' => 'active',
                'image_url' => 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=600&q=80',
                'category' => 'home-office',
                'brand' => 'northwind-studio',
            ],
            [
                'name' => 'Solstice Dining Set',
                'slug' => 'solstice-dining-set',
                'description' => 'Extendable table with sculpted corner seats.',
                'price' => 2199,
                'stock' => 8,
                'status' => 'active',
                'image_url' => 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=80',
                'category' => 'dining-kitchen',
                'brand' => 'hearth-timber',
            ],
        ];

        $bluePrint = collect($bluePrint);

        $bluePrint->each(function ($item) {
            $category = Category::where('slug', $item['category'])->first();
            $brand = Brand::where('slug', $item['brand'])->first();

            Product::create([
                'name' => $item['name'],
                'slug' => $item['slug'],
                'description' => $item['description'],
                'price' => $item['price'],
                'stock' => $item['stock'],
                'status' => $item['status'],
                'image_url' => $item['image_url'],
                'category_id' => $category->id,
                'brand_id' => $brand->id,
            ]);
        });
    }
}

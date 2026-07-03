<?php

namespace Database\Seeders;

use App\Models\Brand;
use Illuminate\Database\Seeder;

class BrandSeeder extends Seeder
{
    public function run(): void
    {
        collect([
            ['name' => 'Hearth & Timber', 'slug' => 'hearth-timber', 'description' => 'Sustainable hardwood blends with artisan finishing.', 'website' => 'https://hearthandtimber.example.com'],
            ['name' => 'Northwind Studio', 'slug' => 'northwind-studio', 'description' => 'Handwrapped textiles and lighting for modern simplicity.', 'website' => 'https://northwind.example.com'],
            ['name' => 'Atlas Atelier', 'slug' => 'atlas-atelier', 'description' => 'Refined metalwork meets organic silhouettes.', 'website' => 'https://atlasatelier.example.com'],
        ])->each(fn($brand) => Brand::create($brand));
    }
}

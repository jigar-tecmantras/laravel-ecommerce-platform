<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        collect([
            ['name' => 'Living Room', 'slug' => 'living-room', 'description' => 'Comfortable seating and accent pieces for everyday living.'],
            ['name' => 'Dining & Kitchen', 'slug' => 'dining-kitchen', 'description' => 'Tableware, seating, and prep surfaces inspired by modern dining.'],
            ['name' => 'Home Office', 'slug' => 'home-office', 'description' => 'Functional desks, storage, and lighting for productive work.'],
            ['name' => 'Decor & Wall', 'slug' => 'decor-wall', 'description' => 'Textiles, mirrors, and wall art that finish a room.'],
        ])->each(fn($category) => Category::create($category));
    }
}

<?php

namespace Database\Seeders;

use App\Models\Customer;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class CustomerSeeder extends Seeder
{
    public function run(): void
    {
        Customer::create([
            'first_name' => 'Maya',
            'last_name' => 'Kim',
            'email' => 'maya.kim@example.com',
            'password' => Hash::make('Welcome123!'),
            'phone' => '+12025550123',
            'role' => 'admin',
        ]);

        Customer::create([
            'first_name' => 'Leo',
            'last_name' => 'Park',
            'email' => 'leo.park@example.com',
            'password' => Hash::make('Catalog123!'),
            'phone' => '+13105550123',
            'role' => 'customer',
        ]);

        Customer::create([
            'first_name' => 'Anisa',
            'last_name' => 'Diaz',
            'email' => 'anisa.diaz@example.com',
            'password' => Hash::make('CartTime7!'),
            'phone' => '+14155550123',
            'role' => 'customer',
        ]);
    }
}

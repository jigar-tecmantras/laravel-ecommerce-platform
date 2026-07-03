<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'description',
        'website',
    ];

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}

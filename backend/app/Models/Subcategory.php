<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subcategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'name_ar',
        'name_en',
        'slug',
        'description_ar',
        'description_en',
        'icon',
        'color',
        'image',
        'is_active',
        'is_popular',
        'order',
        'services_count',
        'projects_count',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'is_popular' => 'boolean',
        'services_count' => 'integer',
        'projects_count' => 'integer',
        'order' => 'integer',
        'category_id' => 'integer',
    ];

    /**
     * Get the category that owns the subcategory.
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get the services for the subcategory.
     */
    // public function services()
    // {
    //     // Will be implemented when Service model is created
    //     return $this->hasMany(Service::class);
    // }

    /**
     * Get the projects for the subcategory.
     */
    // public function projects()
    // {
    //     // Will be implemented when Project model is created
    //     return $this->hasMany(Project::class);
    // }

    /**
     * Scope a query to only include active subcategories.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to only include popular subcategories.
     */
    public function scopePopular($query)
    {
        return $query->where('is_popular', true);
    }

    /**
     * Scope a query to order by the order column.
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('order');
    }
}
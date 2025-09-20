<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
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
    ];

    /**
     * Get the subcategories for the category.
     */
    public function subcategories()
    {
        return $this->hasMany(Subcategory::class);
    }

    /**
     * Get the services for the category through subcategories.
     */
    // public function services()
    // {
    //     // Will be implemented when Service model is created
    //     return $this->hasManyThrough(\App\Models\Service::class, Subcategory::class);
    // }

    /**
     * Get the projects for the category through subcategories.
     */
    // public function projects()
    // {
    //     // Will be implemented when Project model is created
    //     return $this->hasManyThrough(\App\Models\Project::class, Subcategory::class);
    // }

    /**
     * Get active subcategories.
     */
    public function activeSubcategories()
    {
        return $this->subcategories()->where('is_active', true)->orderBy('order');
    }

    /**
     * Get popular subcategories.
     */
    public function popularSubcategories()
    {
        return $this->subcategories()
            ->where('is_active', true)
            ->where('is_popular', true)
            ->orderBy('order');
    }

    /**
     * Scope a query to only include active categories.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to only include popular categories.
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
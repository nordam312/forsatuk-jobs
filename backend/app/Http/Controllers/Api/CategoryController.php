<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of categories with subcategories.
     */
    public function index(Request $request)
    {
        $categories = Category::active()
            ->ordered()
            ->with(['subcategories' => function ($query) {
                $query->active()->ordered()->limit(6);
            }])
            ->withCount(['subcategories'])
            ->get();

        // Add dummy counts for now
        $categories->each(function ($category) {
            $category->services_count = 0;
            $category->projects_count = 0;

            // Add dummy counts for subcategories
            $category->subcategories->each(function ($subcategory) {
                $subcategory->services_count = rand(5, 50);
                $subcategory->projects_count = rand(2, 20);
            });
        });

        return response()->json([
            'success' => true,
            'data' => $categories
        ]);
    }

    /**
     * Display the specified category with all its subcategories.
     */
    public function show($idOrSlug)
    {
        // Check if it's a slug (contains letters) or ID (numeric)
        $category = is_numeric($idOrSlug)
            ? Category::with(['subcategories' => function ($query) {
                $query->active()->ordered();
            }])
            ->withCount(['subcategories'])
            ->findOrFail($idOrSlug)
            : Category::with(['subcategories' => function ($query) {
                $query->active()->ordered();
            }])
            ->withCount(['subcategories'])
            ->where('slug', $idOrSlug)
            ->firstOrFail();

        // Add dummy counts for now
        $category->services_count = rand(50, 200);
        $category->projects_count = rand(20, 100);

        // Add dummy counts for subcategories
        $category->subcategories->each(function ($subcategory) {
            $subcategory->services_count = rand(5, 50);
            $subcategory->projects_count = rand(2, 20);
        });

        return response()->json([
            'success' => true,
            'data' => $category
        ]);
    }

    /**
     * Get categories for dropdown/options
     */
    public function options()
    {
        $categories = Category::active()
            ->ordered()
            ->select('id', 'name_ar', 'name_en', 'slug', 'icon', 'color')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $categories
        ]);
    }
}
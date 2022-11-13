<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category as Category;

class CategoryController extends Controller
{
    public function show()
    {
        $data = Category::all();
        return response()
            ->json([
                'data' => $data
            ]);
    }
    public function show_id(Request $request, $id)
    {
        $data = Category::find($id);
        return response()
            ->json([
                'data' => $data
            ]);
    }
    public function created_at(Request $request)
    {
        $category = new Category();
        $category->name_category = $request->name_category;
        $category->save();
        return response()
            ->json([
                'data' =>  $category,
                'status' => true
            ]);
    }
    public function update(Request $request, $id)
    {
        $category = Category::find($id)->first();
        $category->name_category = $request->name_category;
        $category->save();
        return response()
            ->json([
                'data' =>  $category,
                'status' => true
            ]);
    }
    public function delete(Request $request, $id)
    {
        $category = Category::find($id);
        $category->delete();
        return response()
            ->json([
                'data' =>  $category,
                'status' => true
            ]);
    }
}

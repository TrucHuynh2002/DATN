<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category as Category;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function show()
    {
        $data = Category::all();
        return response()
            ->json([
                'data' => $data
            ]);
        // return $data;
        // echo "chào ";
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
        $validation = Validator::make($request->all(),[ 
            'name_category' => 'required|string|unique:category'
        ],[
            'name_category.required' => 'Không được bỏ trống',
            'name_category.string' => 'Không đúng định dạng',
            'name_category.unique' => 'Đã tồn tại',
        ]);
        if($validation->fails()){
            return response()
            ->json([
                'messages' =>  $validation->messages(),
                'status'=> false
            ]);
        }
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
        $validation = Validator::make($request->all(),[        
            'name_category' => 'required|string|unique:category'
        ],[
            'name_category.required' => 'Không được bỏ trống',
            'name_category.string' => 'Không đúng định dạng',
            'name_category.unique' => 'Đã tồn tại',
        ]);
        if($validation->fails()){
            return response()
            ->json([
                'messages' =>  $validation->messages(),
                'status'=> false
            ]);
        }
        $category = Category::find($id);
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

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Furniture as Furniture;
use Illuminate\Support\Facades\Validator;

class FurnitureController extends Controller
{
    public function show()
    {
        $data = Furniture::all();
        return response()
            ->json([
                'data' => $data
            ]);
    }
    public function show_id(Request $request, $id)
    {
        $data = Furniture::find($id);
        return response()
            ->json([
                'data' => $data
            ]);
    }
    public function created_at(Request $request)
    {
        $validation = Validator::make($request->all(),[ 
            'name' => 'required',
            'icon' => 'required'
        ],[
            'name.required' => 'Không được bỏ trống',
            'icon.required' => 'Không được bỏ trống',
        ]);
        if($validation->fails()){
            return response()
            ->json([
                'messages' =>  $validation->messages(),
                'status'=> false
            ]);
        }
        $furniture = new Furniture();
        $furniture->name = $request->name;
        $furniture->icon = $request->icon;
        $furniture->save();
        return response()
            ->json([
                'data' =>  $furniture,
                'status' => true
            ]);
    }
    public function update(Request $request, $id)
    {
        $validation = Validator::make($request->all(),[ 
            'name' => 'required',
            'icon' => 'required'
        ],[
            'name.required' => 'Không được bỏ trống',
            'icon.required' => 'Không được bỏ trống',
        ]);
        if($validation->fails()){
            return response()
            ->json([
                'messages' =>  $validation->messages(),
                'status'=> false
            ]);
        }
        $furniture = Furniture::find($id);
        $furniture->name = $request->name;
        $furniture->icon = $request->icon;
        $furniture->save();
        return response()
            ->json([
                'data' =>  $furniture,
                'status' => true
            ]);
    }

    public function delete(Request $request, $id)
    {
        $furniture = Furniture::find($id);
        $furniture->delete();
        return response()
            ->json([
                'data' =>  $furniture,
                'status' => true
            ]);
    }
}

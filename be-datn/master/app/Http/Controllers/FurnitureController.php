<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Furniture as Furniture;

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
        $furniture = new Furniture();
        $furniture->name = $request->name_furniture;
        $furniture->icon = $request->icon_furniture;
        $furniture->save();
        return response()
            ->json([
                'data' =>  $furniture,
                'status' => true
            ]);
    }
    public function update(Request $request, $id)
    {
        $furniture = Furniture::find($id)->first();
        $furniture->name = $request->name_furniture;
        $furniture->icon = $request->icon_furniture;
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

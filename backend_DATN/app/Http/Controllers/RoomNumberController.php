<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RoomNumberModel;
class RoomNumberController extends Controller
{
    public function show()
    {
        $data = RoomNumberModel::all();
        return response()
            ->json([
                'data' => $data,
                'status' => true
            ]);
    }
    public function show_one(Request $request, $id_post)
    {
        $data = RoomNumberModel::where('id','=',$id_post)->get();
        return response()
            ->json([
                'data' => $data,
                'status' => true
            ]);
    }
    public function update(Request $request, $id)
    {
        $data = RoomNumberModel::find($id);
        
        return response()
            ->json([
                'data' => $data,
                'status' => true
            ]);
    }
}

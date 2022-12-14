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
    public function show_one(Request $request, $id)
    {
        $data = RoomNumberModel::where('id_post', '=', $id)->get();
        // $data = RoomNumberModel::find($id);
        return response()
            ->json([
                'data' => $data,
                'status' => true
            ]);
    }
    public function show_id(Request $request, $id)
    {
        // $data = RoomNumberModel::where('id_post', '=', $id)->get();
        $data = RoomNumberModel::find($id);
        return response()
            ->json([
                'data' => $data,
                'status' => true
            ]);
    }
    public function update(Request $request, $id)
    {
        $data = RoomNumberModel::find($id);
        $data->status = $request->status;
        $data->id_user_two = $request->id_user_two;
        $data->save();
        return response()
            ->json([
                'data' => $data,
                'status' => true
            ]);
    }
}

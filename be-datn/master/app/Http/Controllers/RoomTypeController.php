<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RoomType as RoomType;

class RoomTypeController extends Controller
{
    public function show()
    {
        $data = RoomType::all();
        return response()
            ->json([
                'data' => $data
            ]);
    }
    public function show_id(Request $request, $id)
    {
        $data = RoomType::find($id);;
        return response()
            ->json([
                'data' => $data
            ]);
    }
    public function created_at(Request $request)
    {
        $RoomType = new RoomType();
        $RoomType->name_room_type = $request->name_room_type;
        $RoomType->save();
        return response()
            ->json([
                'data' =>   $RoomType,
                'status' => true
            ]);
    }
    public function update(Request $request, $id)
    {
        $RoomType = RoomType::find($id)->first();
        $RoomType->name_room_type = $request->name_room_type;
        $RoomType->save();
        return response()
            ->json([
                'data' =>   $RoomType,
                'status' => true
            ]);
    }
    public function delete(Request $request, $id)
    {
        $RoomType = RoomType::find($id);
        $RoomType->delete();
        return response()
            ->json([
                'data' =>   $RoomType,
                'status' => true
            ]);
    }
}

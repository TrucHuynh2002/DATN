<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
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
    public function show_postID(Request $request, $id)
    {
        $data = DB::table('room_number')
            // ->join('room_number', 'bill.id_roomNumber', '=', 'room_number.id')
            ->join('post', 'post.id_post', '=', 'room_number.id_post')
            ->where('room_number.id', '=', $id)
            ->get();
        return response()
            ->json([
                'data' => $data,

            ]);
    }
    public function show_id_user_two(Request $request, $id)
    {
        // $data = RoomNumberModel::where('id_post', '=', $id)->get();
        $data = RoomNumberModel::where('id_user_two', '=', $id)->get();
        return response()
            ->json([
                'data' => $data,
                'status' => false,
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

    public function update_checkRoom(Request $request, $id)
    {
        $data = RoomNumberModel::where('id_user_two', '=', $id)->first();
        $data->check_room = 1;
        $data->save();
        return response()
            ->json([
                'data' => $data,
                'status' => true,
                'id' => $id
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
                'status' => true,
                'user' => $request->id_user_two,
            ]);
    }
    public function update_user(Request $request, $id)
    {
        $data = RoomNumberModel::find($id);
        $data->status = $request->status;
        $data->save();
        return response()
            ->json([
                'data' => $data,
                'status' => true,
            ]);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RoomType as RoomType;
use Illuminate\Support\Facades\Validator;

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
        $validation = Validator::make($request->all(), [
            'name_room_type' => 'required|string|max:255'

        ], [
            'name_category.required' => 'Không được bỏ trống',
            'name_category.string' => 'Không đúng định dạng',
            'name_category.max' => 'Độ dài không cho phép'
        ]);
        if ($validation->fails()) {
            return response()
                ->json([
                    'messages' =>  $validation->messages(),
                    'status' => false
                ]);
        }
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
        $validation = Validator::make($request->all(), [
            'name_room_type' => 'required|string|max:255'

        ], [
            'name_category.required' => 'Không được bỏ trống',
            'name_category.string' => 'Không đúng định dạng',
            'name_category.max' => 'Độ dài không cho phép'
        ]);
        if ($validation->fails()) {
            return response()
                ->json([
                    'messages' =>  $validation->messages(),
                    'status' => false
                ]);
        }
        $RoomType = RoomType::find($id);
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

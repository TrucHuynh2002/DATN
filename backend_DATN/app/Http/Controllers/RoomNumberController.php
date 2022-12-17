<?php

namespace App\Http\Controllers;

use App\Mail\BookRoomAdmin;
use App\Mail\BookRoomUser;
// use App\Models\Bill;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\RoomNumberModel;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

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
        
        $admin = RoomNumberModel::join('users','room_number.id_user','=','users.id_user')->first();
        
        $user = RoomNumberModel::join('users','room_number.id_user_two','=','users.id_user')
        ->join('post','room_number.id_post','=','post.id_post')
        ->first();
        // $checkEmail_admin = User::where('email', '=', $request->email)->first();
        if($admin){
            Mail::to($admin->mail)->send(new BookRoomAdmin($user,$admin));
        }
        if($user){
            Mail::to($user->mail)->send(new BookRoomUser($user));
        }
        return response()
            ->json([
                'data' => $data,
                'status' => true,
            
            ]);
    }
    public function update_user(Request $request, $id)
    {
        $data = RoomNumberModel::find($id);
        if($data){
        $data->status = 2;
        if($request->id_user_two != 'null'){
        $data->id_user_two = $request->id_user_two;
        }
        $data->save();
        return response()
            ->json([
                'data' => $data,
                'status' => true,
                'id_post' => $request->idPost
            ]); 
        }
        return response()
        ->json([
            'mess' => "Phòng này không tồn tài",
            'status' => true,
        ]);
    }

    // Trả phòng

    public function checkOutRoom(Request $request,$id){
        $data = RoomNumberModel::find($id);
        if($data){
            $data->status = 0;
            $data->id_user_two = null;
            $data->save();
        }
        return response()
        ->json([
            'mess' => "Trả phòng thành công",
            'data' => $data,
            'status' => true,
        ]);
    }
    public function showRoomBookUser(Request $request,$id_user){
        if($id_user && $request->id_post){
            if($request->id_post == null){
                return response()
                ->json([
                    'data' => 'Lỗi',
                    'status' => false,
                ]);
            }
            else{
                $data = RoomNumberModel::where('id_user_two','=',$id_user)
                ->where('id_post','=',$request->id_post)
                ->first();
                return response()
                ->json([
                    'data' => $data,
                    'status' => true,
                ]);
            }
            
        }else{
            return response()
            ->json([
                'data' => 'Lỗi',
                'status' => false,
            ]);
        }
    }
    public function cancelRoomBookUser(Request $request,$id_user){
        if($id_user && $request->id_post && $request->room_number){
            if($request->id_post == null || $request->room_number == null){
                return response()
                ->json([
                    'data' => 'Chưa có dữ liệu',
                    'status' => false,
                ]);
            }else{
                $data = RoomNumberModel::where('id_user_two','=',$id_user)
                ->where('id_post','=',$request->id_post)
                ->where('room_number','=',$request->room_number)
                ->where('status','=',1)
                ->first();
                $data->id_user_two = null;
                $data->status = 0;
                $data->save();
                return response()
                ->json([
                    'messeges' => 'hủy đặt phòng thành công',
                    'status' => true,
                ]);
            }  
        }else{
            return response()
            ->json([
                'data' => 'Lỗi',
                'status' => false,
            ]);
        }
        
    }
}

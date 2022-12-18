<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Mail\BookRoomAdmin;
use App\Mail\BookRoomUser;
use App\Models\RoomNumberModel;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

class EmailBookRoomController extends Controller{
    public function store(Request $request){
        
        $checkEmail_admin = User::where('email', '=', $request->email)->first();
        $user = RoomNumberModel::join('users','room_number.id_user_two','=','users.id_user')
        ->join('post','room_number.id_post','=','post.id_post')
        ->first();
        if($checkEmail_admin){
            Mail::to($request->email)->send(new BookRoomAdmin($checkEmail_admin,$user));
            return response()->json([
                "status" => true,
                "messages" => "Có người đặt phòng"
            ]);
        }
        $checkEmail_user = User::where('email', '=', $request->email)->first();
        if($checkEmail_user){
            Mail::to($request->email)->send(new BookRoomUser($checkEmail_user));
            return response()->json([
                "status" => true,
                "messages" => "Đặt phòng thành công"
            ]);
        }else{
            return response()->json([
                "status" => false,
                "messages" => "Đặt phòng thất bại"
            ]);
        }
    }
}

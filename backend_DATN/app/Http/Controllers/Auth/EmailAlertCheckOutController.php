<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Mail\CheckOutAlertSuccess;
use App\Mail\CheckOutAlertUnSuccess;
use App\Models\RoomNumberModel;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

class EmailAlertCheckOutController extends Controller{
    public function success(Request $request){
        $user = RoomNumberModel::join('users','room_number.id_user_two','=','users.id_user')->first();
        if($user){
            Mail::to($user->email)->send(new CheckOutAlertSuccess($user));
            return response()->json([
                "status" => true,
                "messages" => "Thông báo trả phòng thành công"
            ]);
        }
    }
    public function unsuccess(Request $request){
        $user = RoomNumberModel::join('users','room_number.id_user_two','=','users.id_user')->first();
        if($user){
            Mail::to($user->email)->send(new CheckOutAlertUnSuccess($user));
            return response()->json([
                "status" => true,
                "messages" => "Thông báo trả phòng không thành công"
            ]);
        }
    }
}

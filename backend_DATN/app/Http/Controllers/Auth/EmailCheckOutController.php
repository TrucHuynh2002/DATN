<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Mail\CheckOut;
use App\Models\RoomNumberModel;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

class EmailCheckOutController extends Controller{
    public function store(Request $request){
        
        $admin = RoomNumberModel::join('users','room_number.id_user','=','users.id_user')->first();
        $user = RoomNumberModel::join('users','room_number.id_user_two','=','users.id_user')->first();
        if($admin){
            Mail::to($admin->email)->send(new CheckOut($admin,$user));
            return response()->json([
                "status" => true,
                "messages" => "Thông báo trả phòng thành công"
            ]);
        }
    }
}

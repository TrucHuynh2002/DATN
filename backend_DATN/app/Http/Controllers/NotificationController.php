<?php

namespace App\Http\Controllers;

use App\Models\CommentModel;
use App\Models\NotificationModel;
use App\Models\User;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function getNotification(Request $request,$id_user){

        $get_data = User::find($id_user)->Notifications;
        // $get_data = $get_data->unreadNotifications;
        // $datas = [];
        // foreach($get_data as $data){
        //     $datas = $data->unreadNotifications;
        // }
        return response()->json([
            'data' => $get_data,
            'status' => true
        ]);
    }
}

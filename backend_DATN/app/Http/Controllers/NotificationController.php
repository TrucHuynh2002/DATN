<?php

namespace App\Http\Controllers;

use App\Models\CommentModel;
use App\Models\NotificationModel;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function getNotification(Request $request,$id_user){
        $get_data = User::find($id_user)->Notifications;
        $get_notificationsUnread = User::find($id_user)->unreadNotifications;
        return response()->json([
            'data' => $get_data,
            'notificationUnread' => $get_notificationsUnread,
            'status' => true
        ]);
    }

    public function maskAsReads(Request $request,$id_user){
        $get_data = User::find($id_user);
        $get_data->unreadNotifications->markAsRead();
    }

    public function maskAsReadsId(Request $request, $id_notification){
        $noti = NotificationModel::find($id_notification);
        $noti->read_at = Carbon::now();
        $noti->save();
        return response()->json([
            'status' => true,
            'message' => 'Đã ok'
        ]);
    }
}

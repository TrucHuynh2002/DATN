<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\NotifyModel as Notify;
use Illuminate\Support\Facades\Validator;

class NotifyController extends Controller
{
    public function getLimit_Notify()
    {
        $get_post = DB::table('notify')
            ->join('users', 'notify.id_user', '=', 'users.id_user')
            ->join('post', 'notify.id_post', '=', 'post.id_post')
            ->take(10)
            ->orderBy('notify.id_notify', 'DESC')
            ->get();
        return response()->json([
            'status' => true,
            'data' => $get_post
        ]);
    }

    public function getNotyfi_interactive(Request $request, $id)
    {
        $get_notify_favorite = DB::table('notify')
            ->join('users', 'notify.id_user', '=', 'users.id_user')
            ->where('notify.id_user_tow', '=', $id)
            ->take(10)
            ->orderBy('notify.id_notify', 'DESC')
            ->get();
        $get_notify_bill  = DB::table('bill')
            ->join('room_number','bill.id_roomNumber','=','room_number.room_number')
            ->join('users','users.id_user','=','room_number.id_user_two')
            ->select('users.full_name','bill.id','bill.created_at','room_number.id_user_two')
            ->where('room_number.id_user_two','=',$id)
            ->orderBy('bill.id','DESC')
            ->get();
        return response()->json([
            'status' => true,
            'data' => $get_notify_favorite,
            'bill' => $get_notify_bill
        ]);
    }
    
    public function NotifyAddComment(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'id_user_tow' => 'required',
            'interaction' => 'required',
            'id_user' => 'required',
            'id_post' => 'required',
        ], [
            'id_user_tow.required' => 'Không được bỏ trống',
            'interaction.required' => 'Không được bỏ trống',
            'id_user.required' => 'Không được bỏ trống',
            'id_post.required' => 'Không được bỏ trống',

        ]);
        if ($validation->fails()) {
            return response()
                ->json([
                    'messages' =>  $validation->messages(),
                    'status' => false
                ]);
        }
        $t = new Notify();
        $t->id_user_tow = $request->id_user_tow;
        $t->status = 1;
        $t->interaction = $request->interaction;
        $t->id_user = $request->id_user;
        $t->id_post = $request->id_post;
        $t->save();
        return response()
            ->json([
                'data' => $t,
                'status' => true
            ]);
    }
}

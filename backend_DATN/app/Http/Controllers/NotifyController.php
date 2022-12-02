<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\NotifyModel as Notify;

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
            ->join('users', 'notify.id_user_tow', '=', 'users.id_user')
            ->where('notify.id_user', '=', $id)
            ->take(10)
            ->orderBy('notify.id_notify', 'DESC')
            ->get();
        return response()->json([
            'status' => true,
            'data' => $get_notify_favorite
        ]);
    }
    public function NotifyAddComment(Request $request)
    {
        $t = new Notify();
        $t->id_user_tow = $request->id_user_tow;
        $t->status = 1;
        $t->interaction = 'bình luận';
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

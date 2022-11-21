<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NotifyController extends Controller
{
    public function getLimit_Notify(){
        $get_post = DB::table('notify')
                    ->join('user','notify.id_user','=','user.id_user')
                    ->join('post','notify.id_post','=','post.id_post')
                    ->take(10)
                    ->orderBy('notify.id_notify','DESC')
                    ->get();
        return response()->json([
            'status' => true,
            'data' => $get_post
        ]);
    }
}

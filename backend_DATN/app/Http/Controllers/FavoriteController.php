<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Favorite as Favorite;

class FavoriteController extends Controller
{
    public function show()
    {
        $data = Favorite::all();
        return response()
            ->json([
                'data' => $data
            ]);
    }
    public function show_id(Request $request, $id)
    {
        $get_favorite = DB::table('favorite')
            ->join('users', 'favorite.id_user', '=', 'users.id_user')
            ->where('favorite.id_user', '=', $id)
            ->take(10)
            ->orderBy('favorite.id_favorite', 'DESC')
            ->get();
        return response()->json([
            'status' => true,
            'data' => $get_favorite
        ]);
    }
    public function created_at(Request $request)
    {
        $Favorite = new Favorite();
        $Favorite->id_post = $request->id_post;
        $Favorite->id_user = $request->id_user;
        $Favorite->status = 1;
        $Favorite->save();
        return response()
            ->json([
                'data' =>  $Favorite,
                'status' => true
            ]);
    }
}

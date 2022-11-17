<?php

namespace App\Http\Controllers;

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
        $data = Favorite::find($id);;
        return response()
            ->json([
                'data' => $data
            ]);
    }
    public function created_at(Request $request)
    {
        $Favorite = new Favorite();
        $Favorite->id_post = $request->id_post;
        $Favorite->id_user = $request->id_user;
        $Favorite->save();
        return response()
            ->json([
                'data' =>  $Favorite,
                'status' => true
            ]);
    }
}

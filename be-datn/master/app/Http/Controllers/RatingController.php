<?php

namespace App\Http\Controllers;

use App\Models\RatingModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class RatingController extends Controller
{
    public function Rating_Selectall(Request $request){
        $t = RatingModel::all();
        return response()
                ->json([
                    'data' => $t,
                    'status'=> true
                ]);
    }
    public function RatingAdd(Request $request){
        $t = new RatingModel();
        $t->rate = $request->rate;
        $t->id_post = $request->id_post;
        $t->id_comment = $request->id_comment;
        $t->save();
        return response()
                ->json([
                    'data' => $t,
                    'status'=> true
                ]);
    }
    public function RatingEdit(Request $request, $id_post_rate){
        $t = RatingModel::find($id_post_rate);
        $t->rate = $request->rate;
        $t->id_post = $request->id_post;
        $t->id_comment = $request->id_comment;
        $t->save();
        return response()
                ->json([
                    'data' => $t,
                    'status'=> true
                ]);
    }
    public function RatingDelete(Request $request,$id_post_rate){
        $t= RatingModel::find($id_post_rate);
        $t->delete();
        return response()
                ->json([
                    'data' => $t,
                    'status'=> true
                ]);
    }
    public function Rating_SelectUser(Request $request,$id_rating){
        // $t = DB::table('post_rate')->join('users','rating.id_user','=','users.id')
        //                         ->where('rating.id_user','=','users.id')->get();
                                $t = RatingModel::find($id_rating);
        return response()
                ->json([
                    'data' => $t,
                    'status'=> true
                ]);
    }
    public function Rating_SelectOne(Request $request,$id_rating){
        $t = DB::table('rating')->join('users','rating.id_user','=',Auth::user()->id)
                                ->where('rating.id_user','=',Auth::user()->id)->get();
        return response()
                ->json([
                    'data' => $t,
                    'status'=> true
                ]);
    }
}

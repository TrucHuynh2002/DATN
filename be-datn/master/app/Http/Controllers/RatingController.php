<?php

namespace App\Http\Controllers;

use App\Models\RatingModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class RatingController extends Controller
{
    public function RatingAdd(Request $request){
        $t = new RatingModel();
        // $t->ten_congty = $request->ten_congty;
        // $t->dia_chi = $request->dia_chi;
        // $t->ma_sothue = $request->ma_sothue;
        // $t->sdt = $request->sdt;
        // $t->nguoi_daidien = $request->nguoi_daidien;
        $t->save();
    }
    public function RatingEdit(Request $request, $id_rating){
        $t = RatingModel::find($id_rating);
        // $t->ten_congty = $request->ten_congty;
        // $t->dia_chi = $request->dia_chi;
        // $t->ma_sothue = $request->ma_sothue;
        // $t->sdt = $request->sdt;
        // $t->nguoi_daidien = $request->nguoi_daidien;
        $t->save();
    }
    public function RatingDelete(Request $request,$id_rating){
        $t= RatingModel::find($id_rating);
        $t->delete();
        // return response()
        //         ->json([
        //             'data' => $Contact_SelectAll
        //         ]);
    }
    public function Rating_SelectUser(Request $request,$id_rating){
        $t = DB::table('rating')->join('users','rating.id_user','=','users.id')
                                ->where('rating.id_user','=','users.id')->get();
        // return response()
        //         ->json([
        //             'data' => $Contact_SelectAll
        //         ]);
    }
    public function Rating_SelectOne(Request $request,$id_rating){
        $t = DB::table('rating')->join('users','rating.id_user','=',Auth::user()->id)
                                ->where('rating.id_user','=',Auth::user()->id)->get();
        // return response()
        //         ->json([
        //             'data' => $Contact_SelectAll
        //         ]);
    }
}

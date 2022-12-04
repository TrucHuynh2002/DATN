<?php

namespace App\Http\Controllers;

use App\Models\ProvinceModel;
use Illuminate\Http\Request;

class ProvinceController extends Controller
{
    function get_ProvinceAll(Request $request){
        $getProvince =  ProvinceModel::all();
        return  response()->json([
            "status" => true,
            "data" => $getProvince
        ]);
    }
}

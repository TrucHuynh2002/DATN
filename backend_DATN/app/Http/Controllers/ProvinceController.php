<?php

namespace App\Http\Controllers;

use App\Models\ProvinceModel;
use Illuminate\Http\Request;
use App\Models\Post as Post;

class ProvinceController extends Controller
{
    function get_ProvinceAll(Request $request)
    {
        $getProvince =  ProvinceModel::all();
        return  response()->json([
            "status" => true,
            "data" => $getProvince
        ]);
    }
    function get_ProvincePost(Request $request)
    {
        $getPost_id_Province = ProvinceModel::join('post', 'post.id_province', '=', 'province.id')
            ->select('province._name', 'post.id_province')
            ->distinct()->get();
        return  response()->json([
            "status" => true,
            "data" => $getPost_id_Province
        ]);
    }
}

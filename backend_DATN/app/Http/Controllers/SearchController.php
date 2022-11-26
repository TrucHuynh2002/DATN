<?php

namespace App\Http\Controllers;

use App\Models\PostModel;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function keyword_searching(Request $request)
    {
        $keyword = $request->keyword;
        $get_data =  PostModel::where('post_name', '=', $keyword)->get();
        return response()->json([
            'status' => true,
            'data' => $get_data
        ]);
    }
}

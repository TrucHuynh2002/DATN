<?php

namespace App\Http\Controllers;

use App\Models\PostModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SearchController extends Controller
{
    public function keyword_searching(Request $request)
    {
        $get_data = DB::table('post');
        if ($request->keyword) {
            $get_data =  $get_data->where('post_name', 'like', '%' . $request->keyword . '%');
        }
        if ($request->typeRoom) {
            $get_data = $get_data->where('id_roomType', '=', $request->typeRoom);
        }
        if ($request->province) {
            $get_data = $get_data->where('id_province', '=', $request->province);
        }
        if ($request->district) {
            $get_data = $get_data->where('id_district', '=', $request->district);
        }
        if ($request->ward) {
            $get_data = $get_data->where('id_ward', '=', $request->ward);
        }
        if ($request->price) {
            $price = $request->price;
            if ((int) $price == 1) {
                $get_data = $get_data->where('room_price', '<', 3000000);
            }
            if ((int)$price == 2) {
                $get_data = $get_data->where('room_price', 'BETWEEN', 1000000, 'AND', 2000000);
            }
        }
        if ($request->area) {
            $area = $request->area;
            if ($area == 1) {
                $get_data = $get_data->where('area', '<', 20);
            }
            if ($area == 2) {
                $get_data = $get_data->where('area', '>', 20);
            }
        }
        $get_postSearch = $get_data->get();

        // $get_data->get();
        return response()->json([
            'status' => true,
            'abc' => $get_data,
            'data' => $get_postSearch,
            'keyword' => $request->keyword
        ]);
    }
}

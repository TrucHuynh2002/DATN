<?php

namespace App\Http\Controllers;

use App\Models\PostModel;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function keyword_searching(Request $request)
    {
        $keyword = $request->keyword;
        $get_data =  PostModel::where('post_name', 'like', '%'. $keyword . '%');
        if($request->typeRoom){
            
            $get_data = $get_data->Where('id_roomType','=',$request->typeRoom);

        }

        if($request->province){
            $get_data = $get_data->where('id_province','=',$request->province);
        }
        
        if($request->price){
            $price = $request->price;
            if($price == 1){
                $get_data= $get_data->where('room_price','<',1000000);
            }
            if($price == 2){
                $get_data= $get_data->where('room_price','>',1000000)->where('room_price','<',2000000);
            }
            // $get_data= $get_data->where('room_price','>',0);
        }

        if($request->area){
            $area = $request->area;
            if($area == 1){
                $get_data= $get_data->where('area','<',20);
            }
            if($area == 2){
                $get_data= $get_data->where('area','>',20);
            }
        }
        $get_postSearch = $get_data->get();

        // $get_data->get();
        return response()->json([
            'status' => true,
            'data' => $get_postSearch,
            'keyword' => (integer) $request->typeRoom
        ]);
    }
}

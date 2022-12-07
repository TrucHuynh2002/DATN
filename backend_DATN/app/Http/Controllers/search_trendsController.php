<?php

namespace App\Http\Controllers;

use App\Models\search_trendsModel as search_trendsModel;
use Illuminate\Http\Request;

class search_trendsController extends Controller
{
    public function search_key_word(Request $request)
    {   
        $get_data = search_trendsModel::all();
        $get_key_word = search_trendsModel::where('key_word' ,'=', $request->key_word  )->get();
        // dd($get_key_word);
        if($get_key_word){
            dd(123);
            $get_key_word->view++;
            return response()
            ->json([
                'data' => $get_key_word,
                'status'=> true
            ]);
        }else{
            dd(345);
            $data = new search_trendsModel();
            $data->key_word = $request->key_word;
            $data->view = 0;
            $data->save();
            return response()
            ->json([
                'data' => $data,
                'status'=> true
            ]);
        }
        
    }
}

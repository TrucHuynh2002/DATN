<?php

namespace App\Http\Controllers;

use App\Models\search_trendsModel as search_trendsModel;
use Illuminate\Http\Request;

class search_trendsController extends Controller
{
    public function search_key_word(Request $request)
<<<<<<< HEAD
    {

        $get_key_word = search_trendsModel::where('key_word', '=', $request->key_word)->first();
        if ($get_key_word) {
            $get_key_word->view = $get_key_word->view + 1;
            $get_key_word->save();
=======
    {   
        $get_data = search_trendsModel::all();
        $get_key_word = search_trendsModel::where('key_word' ,'=', $request->key_word  )->get();
        // dd($get_key_word);
        if($get_key_word){
            dd(123);
            $get_key_word->view++;
>>>>>>> 77c67ac7e23578e281e477952eb1c6ea329d02a3
            return response()
                ->json([
                    'data' => $get_key_word,
                    'status' => true
                ]);
        } else {
            $data = new search_trendsModel();
            $data->key_word = $request->key_word;
            $data->view = 0;
            $data->save();
            return response()
                ->json([
                    'data' => $data,
                    'status' => true
                ]);
        }
    }
}

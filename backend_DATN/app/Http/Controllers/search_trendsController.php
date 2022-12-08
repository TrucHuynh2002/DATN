<?php

namespace App\Http\Controllers;

use App\Models\search_trendsModel as search_trendsModel;
use Illuminate\Http\Request;

class search_trendsController extends Controller
{
    public function search_key_word(Request $request)
    {
        $get_key_word = search_trendsModel::where('key_word', '=', $request->key_word)->first();
        if ($get_key_word) {
            $get_key_word->view = $get_key_word->view + 1;
            $get_key_word->save();
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
    public function show(Request $request)
    {
        $count_post = search_trendsModel::where('view', '>', 0)->orderby('view', 'DESC')->take(10)->get();
        return response()
            ->json([
                'data' => $count_post,
                'status' => true
            ]);
    }
}

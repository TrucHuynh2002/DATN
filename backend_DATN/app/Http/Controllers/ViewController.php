<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\View;

class ViewController extends Controller
{
    public function updateViewIndex()
    {
        $a = View::all();
        foreach ($a as $val) {
            $view = $val['view_index'];
        };
        // $update = View::update(['view_index' => $view + 1]);
        // return response()
        //     ->json([
        //         'data' =>  $update,
        //         'status' => true
        //     ]);
        return $view;
    }
}

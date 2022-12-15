<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\View;
use Carbon\Carbon;

class ViewController extends Controller
{
    public function updateViewIndex()
    {
        // $a = View::all();
        // foreach ($a as $val) {
        //     $view = $val['view_index'];
        // };
        // return $view;
        // $update = View::updated('view_index','=','view_index'+1);
        // $update;
        
        $data = View::orderBy('id_view_index','DESC')->first();
        dd($data->updated_at->day);
        if($data->updated_at->day == Carbon::now('Asia/Ho_Chi_Minh')->day){
            $data->view_index++;
            $data->save();
            return response()
            ->json([
                'data' =>  $data,
                'status' => true
            ]);
        }else{
            $data_new = new View();
            $data_new->view_index++;
            $data_new->save();
            return response()
            ->json([
                'messeges' =>  'ngày mới',
                'data' =>  $data_new,
                'status' => true
            ]);
        }

        // $data = View::find(1);
        // $data->view_index++;
        // $data->save();
        
        
    }
    public function show()
    {
        $data = View::all();
        return response()
            ->json([
                'data' =>  $data,
                'status' => true
            ]);
    }
}

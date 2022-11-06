<?php

namespace App\Http\Controllers;

use App\Models\ConfigModel;
use Illuminate\Http\Request;

class ConfigController extends Controller
{
    public function get_Config(){
        $getConfig = ConfigModel::find(1);
        return response()->json(
            [
                'status' => true,
                'data' => $getConfig
            ]
            );
    }

    public function create_config(Request $request){

        $config = new ConfigModel();
        $get_image = $request->file('logo');
        $config->sdt = $request->sdt;
        $config->email = $request->email;
        $config->title = $request->title;
        $config->address = $request->address;
        if ($get_image) {
            $get_name_image = $get_image->getClientOriginalName();
            $path = 'upload/';
            $name_image  = current(explode('.',$get_name_image));
            $new_image = $name_image.rand(0,99).'.'. $get_image->getClientOriginalExtension();
            $get_image->move($path,$new_image);
            $config->img = $new_image;
        }
        $config->save();
        return response()->json(
            [
                'status' => true,
                'data' => $config
            ]
            );
    }
    public function update_config(Request $request){

        $config = ConfigModel::find(1)->first();
        $get_image = $request->file('logo');
        $config->sdt = $request->sdt;
        $config->email = $request->email;
        $config->title = $request->title;
        $config->address = $request->address;
        if ($get_image) {
            $get_name_image = $get_image->getClientOriginalName();
            $path = 'upload/';
            $name_image  = current(explode('.',$get_name_image));
            $new_image = $name_image.rand(0,99).'.'. $get_image->getClientOriginalExtension();
            $get_image->move($path,$new_image);
            $config->img = $new_image;
        }
        $config->save();
        return response()->json(
            [
                'status' => true,
                'data' => $config
            ]
            );
    }
}

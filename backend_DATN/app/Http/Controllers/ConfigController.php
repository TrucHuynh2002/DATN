<?php

namespace App\Http\Controllers;

use App\Models\ConfigModel;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ConfigController extends Controller
{
    public function get_Config(Request $request)
    {
        $getConfig = ConfigModel::find(1);
        return response()->json(
            [
                'status' => true,
                'data' => $getConfig
            ]
        );
    }


    public function update_Config(Request $request)
    {
        // $validation = Validator::make($request->all(), [
        //     'sdt' => 'required||min:10|max:12|unique:config',
        //     'email' => 'required|email|unique:config',
        //     'title' => 'required|string|max:255',
        //     'address' => 'required',
        // ], [
        //     'sdt.required' => 'Không được bỏ trống',
        //     'sdt.min' => 'Không đủ 10 số',
        //     'sdt.max' => 'Không đúng',
        //     'sdt.unique' => 'Đã tồn tại',
        //     'email.required' => 'Không được bỏ trống',
        //     'email.email' => 'Không đúng định dạng',
        //     'email.unique' => 'Đã tồn tại',
        //     'title.required' => 'Không được bỏ trống',
        //     'title.string' => 'Không đúng định dạng',
        //     'title.max' => 'Độ dài không cho phép',
        //     'address.required' => 'Không được bỏ trống'
        // ]);
        // if ($validation->fails()) {
        //     return response()
        //         ->json([
        //             'messages' =>  $validation->messages(),
        //             'status' => false
        //         ]);
        // }
        $config = ConfigModel::where('id_config', '=', '1')->first();
        //LOGO
        // dd($request->file('logo'));
        $get_image_logo = $request->file('logo');
        $name = '';
        if ($request->file('logo')) {
            foreach ($request->file('logo') as $img) {
                $get_image_logo = $img->getClientOriginalName();
                $path = 'uploads/logo/';
                $name_image_logo  = current(explode('.', $get_image_logo));
                $name_image_logo = explode('.', $get_image_logo);
                $new_image_logo = $name_image_logo[0] . rand(0, 99);
                $name = $get_image_logo;
                $img->move($path, $new_image_logo);
                $link_img_logo = env('APP_URL') . ':8000/uploads/logo/' . $new_image_logo;
                $config->logo = $link_img_logo;

                // return response()->json([
                //     'img' => $name
                // ]);
            }
        }
        // dd($name);
        $config->sdt = $request->sdt;
        $config->email = $request->email;
        $config->title = $request->title;
        $config->address = $request->address;
        $config->introduce = $request->introduce;
        // dd($request->sdt);

        $config->save();
        return response()->json(
            [
                'status' => true,
                'data' => $config
            ]
        );
    }
}

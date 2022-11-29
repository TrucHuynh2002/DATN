<?php

namespace App\Http\Controllers;

use App\Models\ConfigModel;
use App\Models\banner_configModel;
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

    // public function create_Config(Request $request)
    // {
    //     $validation = Validator::make($request->all(), [
    //         'sdt' => 'required||min:10|max:12|unique:config',
    //         'email' => 'required|email|unique:config',
    //         'title' => 'required|string|max:255',
    //         'address' => 'required',
    //     ], [
    //         'sdt.required' => 'Không được bỏ trống',
    //         'sdt.min' => 'Không đủ 10 số',
    //         'sdt.max' => 'Không đúng',
    //         'sdt.unique' => 'Đã tồn tại',
    //         'email.required' => 'Không được bỏ trống',
    //         'email.email' => 'Không đúng định dạng',
    //         'email.unique' => 'Đã tồn tại',
    //         'title.required' => 'Không được bỏ trống',
    //         'title.string' => 'Không đúng định dạng',
    //         'title.max' => 'Độ dài không cho phép',
    //         'address.required' => 'Không được bỏ trống'
    //     ]);
    //     if ($validation->fails()) {
    //         return response()
    //             ->json([
    //                 'messages' =>  $validation->messages(),
    //                 'status' => false
    //             ]);
    //     }
    //     $config = new ConfigModel();
    //     $get_image = $request->file('logo');
    //     $config->sdt = $request->sdt;
    //     $config->email = $request->email;
    //     $config->title = $request->title;
    //     $config->address = $request->address;
    //     if ($get_image) {
    //         $get_name_image = $get_image->getClientOriginalName();
    //         $path = 'upload/';
    //         $name_image  = current(explode('.', $get_name_image));
    //         $new_image = $name_image . rand(0, 99) . '.' . $get_image->getClientOriginalExtension();
    //         $get_image->move($path, $new_image);
    //         $config->img = $new_image;
    //     }
    //     $config->save();
    //     return response()->json(
    //         [
    //             'status' => true,
    //             'data' => $config
    //         ]
    //     );
    // }
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
        $config = ConfigModel::where('id_config','=','1')->first();
        //LOGO
        $get_image_logo = $request->file('logo');
        if ($request->file('logo')) {
                    $get_image_logo->getClientOriginalName();
                    $path = 'uploads/logo/';
                    $name_image_logo  = current(explode('.',$get_image_logo));
                    $name_image_logo = explode('.', $get_image_logo);
                    $new_image_logo = $name_image_logo . rand(0, 99);
                    $get_image_logo->move($path, $new_image_logo);
                    $link_img_logo = env('APP_URL').'/uploads/logo/'.$new_image_logo;
                    $config->logo = $link_img_logo;
            // return response()->json([
            //     'img' => $name
            // ]);
        }
        $config->sdt = $request->sdt;
        $config->email = $request->email;
        $config->title = $request->title;
        $config->address = $request->address;
        $config->introduce = $request->introduce;

        //BANNER
        $get_image_banner = $request->file('banner');
        // $name = '';
        if ($request->file('banner')) {
            foreach ($get_image_banner as $img) {
                
                    $get_name_image_banner = $img->getClientOriginalName();
                    // $name = $get_name_image;
                    $path = 'uploads/banner/';
                    $name_image_banner  = current(explode('.',$get_name_image_banner));
                    $name_image_banner = explode('.', $get_name_image_banner);
                    $new_image_banner = $name_image_banner[0] . rand(0, 99);
                    $img->move($path, $new_image_banner);
                    // $imgPost->img = $new_image;
                    $imgbanner = new banner_configModel();
                    $imgbanner->link_img_banner = env('APP_URL').'/uploads/banner/'.$new_image_banner;
                    $imgbanner->id_config = 1; // khóa ngoại
                    $imgbanner->save();
                
            }
            // return response()->json([
            //     'img' => $name
            // ]);
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

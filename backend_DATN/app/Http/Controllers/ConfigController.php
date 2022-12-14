<?php

namespace App\Http\Controllers;

use App\Models\ConfigModel;
use App\Models\banner_configModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
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

    public function get_About(Request $request)
    {
        $getConfig = ConfigModel::select('introduce')->get();
        return response()->json(
            [
                'status' => true,
                'data' => $getConfig
            ]
        );
    }
    
    public function create_Config(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'sdt' => 'required||min:10|max:12|unique:config',
            'email' => 'required|email|unique:config',
            'title' => 'required|string|max:255',
            'address' => 'required',
        ], [
            'sdt.required' => 'Không được bỏ trống',
            'sdt.min' => 'Không đủ 10 số',
            'sdt.max' => 'Không đúng',
            'sdt.unique' => 'Đã tồn tại',
            'email.required' => 'Không được bỏ trống',
            'email.email' => 'Không đúng định dạng',
            'email.unique' => 'Đã tồn tại',
            'title.required' => 'Không được bỏ trống',
            'title.string' => 'Không đúng định dạng',
            'title.max' => 'Độ dài không cho phép',
            'address.required' => 'Không được bỏ trống'
        ]);
        if ($validation->fails()) {
            return response()
                ->json([
                    'messages' =>  $validation->messages(),
                    'status' => false
                ]);
        }
        $config = new ConfigModel();
        $get_image = $request->file('logo');
        $config->sdt = $request->sdt;
        $config->email = $request->email;
        $config->title = $request->title;
        $config->address = $request->address;
        if ($get_image) {
            $get_name_image = $get_image->getClientOriginalName();
            $path = 'upload/';
            $name_image  = current(explode('.', $get_name_image));
            $new_image = $name_image . rand(0, 99) . '.' . $get_image->getClientOriginalExtension();
            $get_image->move($path, $new_image);
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
    
    public function update_Config(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'sdt' => 'required||min:10|max:12',
            'email' => 'required|email',
            'title' => 'required|string|max:255',
            'address' => 'required',
            'introduce' => 'required',
        ], [
            'sdt.required' => 'Không được bỏ trống',
            'sdt.min' => 'Không đủ 10 số',
            'sdt.max' => 'Không đúng',
            'email.required' => 'Không được bỏ trống',
            'email.email' => 'Không đúng định dạng',
            'title.required' => 'Không được bỏ trống',
            'title.string' => 'Không đúng định dạng',
            'title.max' => 'Độ dài không cho phép',
            'address.required' => 'Không được bỏ trống',
            'introduce.required' => 'Không được bỏ trống'
        ]);
        if ($validation->fails()) {
            return response()
                ->json([
                    'messages' =>  $validation->messages(),
                    'status' => false
                ]);
        }
        $config = ConfigModel::where('id_config', '=', '1')->first();

        $config->sdt = $request->sdt;
        $config->email = $request->email;
        $config->title = $request->title;
        $config->address = $request->address;
        $config->introduce = $request->introduce;

        $config->save();


        return response()->json(
            [
                'status' => true,
                'data' => $config
            ]
        );
    }

    public function Logo(Request $request, $id)
    {
        $get_image_logo = $request->file('logo');
        if ($request->file('logo')) {
            foreach ($request->file('logo') as $img) {
                $get_image_logo = $img->getClientOriginalName();
                $path = 'uploads/logo/';
                $name_image_logo  = current(explode('.', $get_image_logo));
                $name_image_logo = explode('.', $get_image_logo);
                $new_image_logo = $name_image_logo[0] . rand(0, 99);
                $img->move($path, $new_image_logo);
                $link_img_logo = env('APP_URL') . '/uploads/logo/' . $new_image_logo;
                $config = ConfigModel::find($id);
                if (File::exists($path . $config->name_logo)) {
                    File::delete($path . $config->name_logo);
                };
                $config->name_logo = $new_image_logo;
                $config->logo = $link_img_logo;
                $config->save();

            }
            return response()->json([
                'status' => true,
                'messages' => 'Cập nhật thành công'
            ]);
        } else {
            return response()->json([
                'status' => false,
                'messages' => 'Cập nhật thất bại'
            ]);
        }
    }

    // public function banner(Request $request)
    // {
    //     //BANNER
    //     $get_image_banner = $request->file('banner');
    //     if ($request->file('banner')) {
    //         foreach ($request->file('banner') as $img) {
    //             $get_name_image_banner = $img->getClientOriginalName();
    //             $path = 'uploads/banner/';
    //             $name_image_banner  = current(explode('.', $get_name_image_banner));
    //             $name_image_banner = explode('.', $get_name_image_banner);
    //             $new_image_banner = $name_image_banner[0] . rand(0, 99);
    //             $img->move($path, $new_image_banner);
    //             // $imgPost->img = $new_image;
    //             $imgbanner = new banner_configModel();
    //             $imgbanner->link_img_banner = env('APP_URL') . '/uploads/banner/' . $new_image_banner;
    //             $imgbanner->id_config = 1; // khóa ngoại
    //             $imgbanner->save();
    //         }
    //         return response()->json([
    //             'status' => true,
    //             'message' => "Cập nhật thành công"
    //         ]);
    //     }
    //     return response()->json([
    //         'status' => false,
    //         'message' => "Cập nhật thất bại",
    //         'data' => $request->file('banner')
    //     ]);
    // }
}

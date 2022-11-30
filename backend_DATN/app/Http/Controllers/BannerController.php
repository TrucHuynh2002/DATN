<?php

namespace App\Http\Controllers;
use App\Models\banner_configModel;
use Illuminate\Http\Request;

class BannerController extends Controller
{
    public function get_Banner(Request $request)
    {
        $getBanner = banner_configModel::all();
        return response()->json(
            [
                'status' => true,
                'data' => $getBanner
            ]
        );
    }
    public function update_Banner(Request $request,$id){
         //BANNER
         $imgbanner = banner_configModel::find($id);
        //  dd($imgbanner);
         $get_image_banner = $request->file('banner');
         if ($request->file('banner')) {
             foreach ($request->file('banner') as $img) {
                     $get_name_image_banner = $img->getClientOriginalName();
                     // $name = $get_name_image;
                     $path = 'uploads/banner/';
                     $name_image_banner  = current(explode('.',$get_name_image_banner));
                     $name_image_banner = explode('.', $get_name_image_banner);
                     $new_image_banner = $name_image_banner[0] . rand(0, 99);
                     $img->move($path, $new_image_banner);
                     // $imgPost->img = $new_image;
                     $imgbanner->link_img_banner = env('APP_URL').':8000/uploads/banner/'.$new_image_banner;
                     // $imgbanner->id_config = 1; // khóa ngoại
                     $imgbanner->save();
                 
             }
             // return response()->json([
             //     'img' => $name
             // ]);
             return response()->json(
                [
                    'status' => true,
                    'data' => $imgbanner
                ]
            );
         }
         
    }
}

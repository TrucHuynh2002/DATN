<?php

namespace App\Http\Controllers;

use App\Models\imgPost;
use App\Models\imgUserModel;
use App\Models\furniture_post;
use App\Models\ProvinceModel;
use App\Models\furniture;
use App\Models\districtModel;
use Illuminate\Support\Facades\DB;
use App\Models\wardModel;
use App\Models\StreetModel;
use Illuminate\Http\Request;
use App\Models\Post as Post;
use App\Models\RoomNumberModel;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{

    public function show()
    {
        $data = Post::all();
        // $heart = DB::table('post')
        //     ->join('img_post', 'post.id_post', '=', 'img_post.id_post')
        //     ->orderBy('post.id_post')
        //     ->get();
        return response()
            ->json([
                'data' => $data,
                'status' => true
            ]);
    }
    public function showHeart()
    {
        $data = Post::all();
        $heart = DB::table('post')
            ->join('heart_feeling', 'post.id_post', '=', 'heart_feeling.id_post')
            ->select('heart_feeling.heart_feeling', 'heart_feeling.id_post', 'heart_feeling.id_user')
            ->orderBy('post.id_post')
            ->get();
        return response()
            ->json([
                'data' => $data,
                'heart' => $heart
            ]);
    }
    public function show_trend()
    {
        $data = DB::table('search_trends')
            ->orderBy('view', 'DESC')->take(10)->get();
        $abc = [];
        foreach ($data as $key) {
            $post =  DB::table('post')->where('post_name', 'like', '%' . $key->key_word . '%')->orderBy('view', 'DESC')->first();
            array_push($abc, array($post));
        }

        return response()
            ->json([
                'data' => $data,
                'post' => $abc,
                'status' => true
            ]);
    }
    public function show_id(Request $request, $id)
    {
        $data = Post::find($id);
        $image = imgPost::where('id_post', '=', $id)->get();
        $furniture_post = furniture_post::where('id_post', '=', $id)->get();
        return response()
            ->json([
                'data' => $data,
                'img' => $image,
                'fur' => $furniture_post,
                'id-img' => $id
            ]);
    }
    public function showUser(Request $request, $id)
    {
        $data = DB::table('post')
            ->join('users', 'post.id_user', '=', 'users.id_user')
            ->join('img_user', 'img_user.id_user', '=', 'post.id_user')
            ->where('post.id_user', '=', $id)
            ->orderBy('post.id_post', 'DESC')
            ->get();
        return response()
            ->json([
                'data' => $data
            ]);
    }
    public function show_province(Request $request)
    {
        $data = ProvinceModel::all();
        return response()
            ->json([
                'data' => $data,
                'status' => true
            ]);
    }
    public function show_district(Request $request)
    {
        $data = districtModel::where('district._province_id', '=', $request->id_province)->get();
        return response()
            ->json([
                'data' => $data,
                'status' => true,

            ]);
    }

    public function show_districtAll(Request $request)
    {
        if ($request->id_province) {
            $data = districtModel::where('_province_id', '=', $request->id_province)->get();
        } else {
            $data = districtModel::all();
        }
        return response()
            ->json([
                'data' => $data,
                'status' => true
            ]);
    }


    public function show_ward(Request $request)
    {
        if ($request->id_province && $request->id_district) {
            $data = wardModel::where('_province_id', '=', $request->id_province)
                ->where('_district_id', '=', $request->id_district)
                ->get();
        } else {
            $data = wardModel::all();
        }
        return response()
            ->json([
                'data' => $data,
                'status' => true
            ]);
    }
    public function show_tree(Request $request)
    {
        if ($request->id_province && $request->id_district) {
            $data = StreetModel::where('_province_id', '=', $request->id_province)
                ->where('_district_id', '=', $request->id_district)
                ->get();
        } else {
            $data = StreetModel::all();
        }
        return response()
            ->json([
                'data' => $data,
                'status' => true,

            ]);
    }
    public function showPost(Request $request, $id)
    {
        $data = DB::table('post')
            ->join('users', 'post.id_user', '=', 'users.id_user')
            ->where('post.id_post', '=', $id)
            ->orderBy('post.id_post', 'DESC')
            ->select('post.id_post','users.id_user','post.post_name', 'post.description_sort', 'post.description', 'post.area', 'post.room_price', 'post.electricity_price', 'post.water_price', 'post.address', 'post.id_province', 'post.id_district', 'post.id_ward', 'post.id_street', 'post.ifarme', 'post.quantity', 'post.view', 'users.phone')
            ->get();
        return response()
            ->json([
                'data' => $data
            ]);
    }
    public function show_tv(Request $request)
    {
        $data = DB::table('post')
            ->join('users', 'post.id_user', '=', 'users.id_user')
            ->join('img_user', 'img_user.id_user', '=', 'post.id_user')
            ->where('users.role', '=', '0')
            ->orderBy('post.id_post', 'DESC')
            ->get();
        return response()
            ->json([
                'data' => $data
            ]);
    }
    public function created_at(Request $request)
    {
        // $validation = Validator::make($request->all(), [
        //     'post_name' => 'required',
        //     'quantity' => 'required',
        //     'area' => 'required',
        //     'room_price' => 'required',
        //     'electricity_price' => 'required',
        //     'water_price' => 'required',
        //     'address' => 'required',
        //     'id_province' => 'required',
        //     'id_district' => 'required',
        //     'id_ward' => 'required',
        //     'id_street' => 'required',
        //     'description' => 'required',
        //     'description_sort' => 'required',
        //     'meta_keywords' => 'required',
        //     'meta_title' => 'required',
        //     'meta_description' => 'required',
        //     'verification' => 'required',
        //     'id_user' => 'required',
        //     'id_furniture' => 'required',
        //     'id_roomType' => 'required',
        // ], [
        //     'post_name.required' => 'Không được bỏ trống',
        //     'quantity.required' => 'Không được bỏ trống',
        //     'area.required' => 'Không được bỏ trống',
        //     'room_price.required' => 'Không được bỏ trống',
        //     'electricity_price.required' => 'Không được bỏ trống',
        //     'water_price.required' => 'Không được bỏ trống',
        //     'address.required' => 'Không được bỏ trống',
        //     'id_province.required' => 'Không được bỏ trống',
        //     'id_district.required' => 'Không được bỏ trống',
        //     'id_ward.required' => 'Không được bỏ trống',
        //     'id_street.required' => 'Không được bỏ trống',
        //     'description.required' => 'Không được bỏ trống',
        //     'description_sort.required' => 'Không được bỏ trống',
        //     'meta_keywords.required' => 'Không được bỏ trống',
        //     'meta_title.required' => 'Không được bỏ trống',
        //     'meta_description.required' => 'Không được bỏ trống',
        //     'verification.required' => 'Không được bỏ trống',
        //     'id_user.required' => 'Không được bỏ trống',
        //     'id_furniture.required' => 'Không được bỏ trống',
        //     'id_roomType.required' => 'Không được bỏ trống',
        // ]);
        // if ($validation->fails()) {
        //     return response()
        //         ->json([
        //             'messages' =>  $validation->messages(),
        //             'status' => false
        //         ]);
        // }
        $Post = new Post();
        // thêm post
        $Post->post_name = $request->post_name;
        $Post->description_sort = $request->description_sort;
        $Post->description = $request->description;
        $Post->area = $request->area;
        $Post->room_price = $request->room_price;
        $Post->water_price = $request->water_price;
        $Post->electricity_price = $request->electricity_price;
        $Post->address = $request->address;
        $Post->id_province = $request->id_province;
        $Post->id_district = $request->id_district;
        $Post->id_ward = $request->id_ward;
        $Post->id_street = $request->id_street;
        $Post->ifarme = $request->ifarme;
        $Post->quantity = $request->quantity;
        $Post->meta_title = $request->meta_title;
        $Post->meta_description = $request->meta_description;
        $Post->meta_keywords = $request->meta_keywords;
        $Post->verification = 1;
        $Post->status = 1;
        $Post->delete = 0;
        $Post->view = 0;
        $Post->id_user = $request->id_user; // khóa ngoại
        $Post->id_roomType = $request->id_roomType; // khóa ngoại
        $Get_Post = Post::orderby('id_post', 'DESC')->first();
        $get_image = $request->file('img');
        if ($request->file('img')) {
            $get_name_image = $get_image[0]->getClientOriginalName();
            $path = 'uploads/';
            $name_image = explode('.', $get_name_image);
            $new_image = $name_image[0] . rand(0, 99);
            // $get_image->move($path, $new_image);
            $Post->link_img = env('APP_URL') . '/uploads/' . $new_image;
            $Post->name_img = $new_image;
        }
        $Post->save();
        
            
        if ($request->quantity) {
            for ($i = 1; $i <= $request->quantity; $i++) {
                $roomNumber = new RoomNumberModel();
                $roomNumber->id_user = $request->id_user;
                $roomNumber->id_post = $Get_Post->id_post;
                $roomNumber->room_number = $i;
                $roomNumber->status = 0;
                $roomNumber->save();
            };
        }
        if ($request->id_furniture) {
            $array_fur = explode(',', $request->id_furniture);
            foreach ($array_fur as $furniture) {
                $furniture_post = new furniture_post();
                $furniture_post->id_post = $Get_Post->id_post;
                $furniture_post->id_furniture = $furniture;
                $furniture_post->save();
            }
        }
        
        if ($request->file('img')) {
            foreach ($get_image as $img) {
                $get_name_image = $img->getClientOriginalName();
                $path = 'uploads/';
                $name_image = explode('.', $get_name_image);
                $new_image = $name_image[0] . rand(0, 99);
                $img->move($path, $new_image);
                $imgPost = new imgPost();
                $imgPost->link_img_user = env('APP_URL') . '/uploads/' . $new_image;
                $imgPost->name_image = $new_image;
                $imgPost->id_post = $Get_Post->id_post; // khóa ngoại
                $imgPost->save();
            }
            
        }
        
        return response()
            ->json([
                'data' =>  $Post,
                'status' => true,
            ]);
    }
    public function update(Request $request, $id)
    {
        // $validation = Validator::make($request->all(), [
        //     'post_name' => 'required|string',
        //     'quantity' => 'required',
        //     'area' => 'required',
        //     'room_price' => 'required',
        //     'electricity_price' => 'required',
        //     'water_price' => 'required',
        //     'address' => 'required',
        //     'description' => 'required',
        //     'description_sort' => 'required',
        //     'meta_keywords' => 'required',
        //     'meta_title' => 'required',
        //     'meta_description' => 'required',
        //     // 'verification' => 'required',
        //     'id_user' => 'required',
        //     'id_furniture' => 'required',
        //     'id_roomType' => 'required'
        // ], [
        //     'post_name.required' => 'Không được bỏ trống',
        //     'quantity.required' => 'Không được bỏ trống',
        //     'area.required' => 'Không được bỏ trống',
        //     'room_price.required' => 'Không được bỏ trống',
        //     'electricity_price.required' => 'Không được bỏ trống',
        //     'water_price.required' => 'Không được bỏ trống',
        //     'address.required' => 'Không được bỏ trống',
        //     'description.required' => 'Không được bỏ trống',
        //     'description_sort.required' => 'Không được bỏ trống',
        //     'meta_keywords.required' => 'Không được bỏ trống',
        //     'meta_title.required' => 'Không được bỏ trống',
        //     'meta_description.required' => 'Không được bỏ trống',
        //     // 'verification.required' => 'Không được bỏ trống',
        //     'id_user.required' => 'Không được bỏ trống',
        //     'id_furniture.required' => 'Không được bỏ trống',
        //     'id_roomType.required' => 'Không được bỏ trống',
        // ]);
        // if ($validation->fails()) {
        //     return response()
        //         ->json([
        //             'messages' =>  $validation->messages(),
        //             'status' => false
        //         ]);
        // }
        $Post = Post::find($id);
        // cập nhật theo id_post
        // $Post->post_name = $request->post_name;
        // $Post->quantity = $request->quantity;
        // $Post->area = $request->area;
        // $Post->room_price = $request->room_price;
        // $Post->electricity_price = $request->electricity_price;
        // $Post->water_price = $request->water_price;
        // $Post->address = $request->address;
        // $Post->id_province = $request->id_province;
        // $Post->id_district = $request->id_district;
        // $Post->id_ward = $request->id_ward;
        // $Post->ifarme = $request->ifarme;
        // $Post->description = $request->description;
        // $Post->description_sort = $request->description_sort;
        // $Post->meta_keywords = $request->meta_keywords;
        // $Post->meta_title = $request->meta_title;
        // $Post->meta_description = $request->meta_description;
        // $Post->verification = 0;
        // $Post->id_roomType = $request->id_roomType;
        // $Post->id_province = $request->id_province;
        // $Post->id_district = $request->id_district;
        // $Post->id_street = $request->id_street;
        // $Post->save();
        $Post->post_name = $request->post_name;
        $Post->description_sort = $request->description_sort;
        $Post->description = $request->description;
        $Post->area = $request->area;
        $Post->room_price = $request->room_price;
        $Post->water_price = $request->water_price;
        $Post->electricity_price = $request->electricity_price;
        $Post->address = $request->address;
        $Post->id_province = $request->id_province;
        $Post->id_district = $request->id_district;
        $Post->id_ward = $request->id_ward;
        $Post->id_street = $request->id_street;
        $Post->ifarme = $request->ifarme;
        $Post->quantity = $request->quantity;
        $Post->meta_title = $request->meta_title;
        $Post->meta_description = $request->meta_description;
        $Post->meta_keywords = $request->meta_keywords;
        $Post->verification = 1;
        $Post->status = 1;
        $Post->delete = 0;
        $Post->view = 0;
        $Post->id_user = $request->id_user; // khóa ngoại
        $Post->id_roomType = $request->id_roomType; // khóa ngoại
        $Get_Post = Post::orderby('id_post', 'DESC')->first();
        $get_image = $request->file('img');
        if ($request->file('img')) {
            $get_name_image = $get_image[0]->getClientOriginalName();
            $path = 'uploads/';
            $name_image = explode('.', $get_name_image);
            $new_image = $name_image[0] . rand(0, 99);
            $get_image->move($path, $new_image);
            $Post->link_img = env('APP_URL') . '/uploads/' . $new_image;
            $Post->name_img = $new_image;
        }
        $Post->save();
        // $Post->id_furniture = $request->id_furniture; // khóa ngoại
        if ($request->id_furniture) {
            // $array_fur = explode(',', $request->id_furniture);

            furniture_post::where('id_post', '=', $id)->delete();
            foreach ($request->id_furniture as $furniture) {
                $furniture_post = new furniture_post();
                $furniture_post->id_post = $id;
                $furniture_post->id_furniture = $furniture;
                $furniture_post->save();
            }
        }
        $get_image = $request->file('img');
        $name = '';
        if ($request->file('img')) {
            foreach ($get_image as $img) {

                $get_name_image = $img->getClientOriginalName();
                // $name = $get_name_image;
                $path = 'uploads/';
                $name_image = explode('.', $get_name_image);
                $new_image = $name_image[0] . rand(0, 99);
                $img->move($path, $new_image);
                // $imgPost->img = $new_image;
                $imgPost = new imgPost();
                $imgPost->link_img_user = env('APP_URL') . '/uploads/' . $new_image;
                $imgPost->id_post = $id; // khóa ngoại
                $imgPost->name_image = $new_image;
                $imgPost->save();
            }

            return response()
                ->json([
                    'data' =>  $request->file('img'),
                    'status' => true
                ]);
        }
        return response()
            ->json([
                'data' =>  $Post,
                'status' => true
            ]);
    }
    public function updateView(Request $request, $id)
    {
        $Post = Post::all()->where('id_post', '=', $id);
        foreach ($Post as $val) {
            $view = $val['view'];
        };
        $update = Post::where('id_post', '=', $id)->update(['view' => $view + 1]);
        return response()
            ->json([
                'data' =>  $update,
                'status' => true
            ]);
    }
    public function delete(Request $request, $id)
    {

        $Post = Post::find($id);
        // $Post->delete = 1;
        $Post->delete();
        return response()
            ->json([
                'data' =>  'đã xóa',
                'status' => true
            ]);
    }
    public function show_delete()
    {
        $data = Post::all()->where('delete', '=', 1);
        return response()
            ->json([
                'data' => $data
            ]);
    }
    public function show_status()
    {
        $data = Post::all()->where('status', '=', 1);
        return response()
            ->json([
                'data' => $data
            ]);
    }

    public function show_furniture_post(Request $request, $id_post)
    {
        $data = DB::table('furniture_post')
            ->join('furniture', 'furniture_post.id_furniture', '=', 'furniture.id_furniture')
            ->where('furniture_post.id_post', '=', $id_post)->get();
        return response()
            ->json([
                'data' => $data,
                'status' => true
            ]);
    }
    public function show_province_detail(Request $request, $id_post)
    {
        $data = DB::table('post')
            ->join('province', 'post.id_province', '=', 'province.id')
            ->where('post.id_post', '=', $id_post)
            ->get();
        return response()
            ->json([
                'data' => $data,
                'status' => true
            ]);
    }

    public function show_district_detail(Request $request, $id_post)
    {
        $data = DB::table('post')

            ->join('district', 'post.id_district', '=', 'district.id')
            ->where('post.id_post', '=', $id_post)
            ->get();
        return response()
            ->json([
                'data' => $data,
                'status' => true
            ]);
    }
    public function show_ward_detail(Request $request, $id_post)
    {
        $data = DB::table('post')
            ->join('ward', 'post.id_ward', '=', 'ward.id')
            ->where('post.id_post', '=', $id_post)
            ->get();
        return response()
            ->json([
                'data' => $data,
                'status' => true
            ]);
    }
    public function show_street_detail(Request $request, $id_post)
    {
        $data = DB::table('post')
            ->join('street', 'post.id_street', '=', 'street.id')
            ->where('post.id_post', '=', $id_post)
            ->get();
        return response()
            ->json([
                'data' => $data,
                'status' => true
            ]);
    }
    public function show_room_type(Request $request, $id_post)
    {
        $data = DB::table('post')
            ->join('room_type', 'post.id_roomType', '=', 'room_type.id_room_type')
            ->where('post.id_post', '=', $id_post)
            ->get();
        return response()
            ->json([
                'data' => $data,
                'status' => true
            ]);
    }

    public function Post_DeleteImage(Request $request, $id_img)
    {
        $path = 'uploads/';
        $image = imgPost::find($id_img)->first();
        if (File::exists($path . $image->name_image)) {
            File::delete($path . $image->name_image);
        }
        imgPost::find($id_img)->delete();
        return response()->json([
            "status" => true,
            'img' => $image
        ]);
    }
    public function Post_view_top5(Request $request)
    {
        $data = Post::orderBy('view','DESC')->take(5)->get();
        return response()->json([
            "status" => true,
            'data' => $data
        ]);
    }
    public function Post_count_roomNumber(Request $request, $id)
    {
        $data = RoomNumberModel::where('id_post', '=', $id)->where('status','=',0)->get();
        // $data = RoomNumberModel::find($id);
        return response()
            ->json([
                'data' => $data,
                'status' => true
            ]);
    }
}

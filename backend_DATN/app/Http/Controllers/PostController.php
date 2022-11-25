<?php

namespace App\Http\Controllers;

use App\Models\imgPost;
use App\Models\furniture_post;
use Illuminate\Http\Request;
use App\Models\Post as Post;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    
    public function show()
    {
        $data = Post::all();
        return response()
            ->json([
                'data' => $data
            ]);
    }
    public function show_id(Request $request, $id)
    {
        $data = Post::find($id);;
        return response()
            ->json([
                'data' => $data
            ]);
    }
    public function created_at(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'post_name' => 'required|string',
            'quantity' => 'required',
            'area' => 'required',
            'room_price' => 'required',
            'electricity_price' => 'required',
            'water_price' => 'required',
            'address' => 'required',
            'description' => 'required',
            'description_sort' => 'required',
            'meta_keywords' => 'required',
            'meta_title' => 'required',
            'meta_description' => 'required',
            'verification' => 'required',
            'id_user' => 'required',
            'id_furniture' => 'required',
            'id_roomType' => 'required'
        ], [
            'post_name.required' => 'Không được bỏ trống',
            'quantity.required' => 'Không được bỏ trống',
            'area.required' => 'Không được bỏ trống',
            'room_price.required' => 'Không được bỏ trống',
            'electricity_price.required' => 'Không được bỏ trống',
            'water_price.required' => 'Không được bỏ trống',
            'address.required' => 'Không được bỏ trống',
            'description.required' => 'Không được bỏ trống',
            'description_sort.required' => 'Không được bỏ trống',
            'meta_keywords.required' => 'Không được bỏ trống',
            'meta_title.required' => 'Không được bỏ trống',
            'meta_description.required' => 'Không được bỏ trống',
            'verification.required' => 'Không được bỏ trống',
            'id_user.required' => 'Không được bỏ trống',
            'id_furniture.required' => 'Không được bỏ trống',
            'id_roomType.required' => 'Không được bỏ trống',
        ]);
        if ($validation->fails()) {
            return response()
                ->json([
                    'messages' =>  $validation->messages(),
                    'status' => false
                ]);
        }
        $Post = new Post();
        // thêm post
        $Post->post_name = $request->post_name;
        $Post->quantity = $request->quantity;
        $Post->area = $request->area;
        $Post->room_price = $request->room_price;
        $Post->electricity_price = $request->electricity_price;
        $Post->water_price = $request->water_price;
        $Post->address = $request->address;
        $Post->description = $request->description;
        $Post->description_sort = $request->description_sort;
        $Post->meta_keywords = $request->meta_keywords;
        $Post->meta_title = $request->meta_title;
        $Post->meta_description = $request->meta_description;
        $Post->verification = $request->verification;
        $Post->status = $request->status;
        $Post->delete = 0;
        $Post->id_user = 2; // khóa ngoại
        $Post->id_room_type = 1; // khóa ngoại
        $Post->save();
        $Get_Post = Post::orderby('id_post','DESC')->first();
        // $Post->id_furniture = $request->id_furniture; // khóa ngoại
        if($request->id_furniture){
            foreach ($request->id_furniture as $furniture) {
                $furniture_post = new furniture_post();
                $furniture_post->id_post = $Get_Post->id_post;
                $furniture_post->id_furniture = $furniture->id_furniture;
                $furniture_post->save();
            }
        }
        $get_image = $request->file('img');
            if ($get_image) {
                foreach ($request->file as $img) {
                    $get_name_image = $get_image->getClientOriginalName();
                    $path = 'upload/';
                    // $name_image  = current(explode('.',$get_name_image));
                    $name_image = explode('.',$get_name_image);
                    $new_image = $name_image[0].rand(0,99);
                    $get_image->move($path,$new_image);
                    // $imgPost->img = $new_image;
                    $imgPost = new imgPost();
                    $imgPost->img_post_name = $new_image;
                    $imgPost->type_img = $name_image[1];
                    $imgPost->link_img_user = $request->link_img_user;
                    $imgPost->id_post = $Get_Post->id_post; // khóa ngoại
                    $imgPost->save();
                }
            }
            # code...
        
        return response()
            ->json([
                'data' =>  $Post,
                'status' => true
            ]);
    }
    public function update(Request $request, $id)
    {
        $validation = Validator::make($request->all(), [
            'post_name' => 'required|tring',
            'quantity' => 'required',
            'area' => 'required',
            'room_price' => 'required',
            'electricity_price' => 'required',
            'water_price' => 'required',
            'address' => 'required',
            'description' => 'required',
            'description_sort' => 'required',
            'meta_keywords' => 'required',
            'meta_title' => 'required',
            'meta_description' => 'required',
            'verification' => 'required',
            'id_user' => 'required',
            'id_furniture' => 'required',
            'id_roomType' => 'required'
        ], [
            'post_name.required' => 'Không được bỏ trống',
            'quantity.required' => 'Không được bỏ trống',
            'area.required' => 'Không được bỏ trống',
            'room_price.required' => 'Không được bỏ trống',
            'electricity_price.required' => 'Không được bỏ trống',
            'water_price.required' => 'Không được bỏ trống',
            'address.required' => 'Không được bỏ trống',
            'description.required' => 'Không được bỏ trống',
            'description_sort.required' => 'Không được bỏ trống',
            'meta_keywords.required' => 'Không được bỏ trống',
            'meta_title.required' => 'Không được bỏ trống',
            'meta_description.required' => 'Không được bỏ trống',
            'verification.required' => 'Không được bỏ trống',
            'id_user.required' => 'Không được bỏ trống',
            'id_furniture.required' => 'Không được bỏ trống',
            'id_roomType.required' => 'Không được bỏ trống',
        ]);
        if ($validation->fails()) {
            return response()
                ->json([
                    'messages' =>  $validation->messages(),
                    'status' => false
                ]);
        }
        $Post = Post::find($id);
        // cập nhật theo id_post
        $Post->post_name = $request->post_name;
        $Post->quantity = $request->quantity;
        $Post->area = $request->area;
        $Post->room_price = $request->room_price;
        $Post->electricity_price = $request->electricity_price;
        $Post->water_price = $request->water_price;
        $Post->address = $request->address;
        $Post->description = $request->description;
        $Post->description_sort = $request->description_sort;
        $Post->meta_keywords = $request->meta_keywords;
        $Post->meta_title = $request->meta_title;
        $Post->meta_description = $request->meta_description;
        $Post->verification = $request->verification;
        $Post->save();
        return response()
            ->json([
                'data' =>  $Post,
                'status' => true
            ]);
    }

    public function delete(Request $request, $id)
    {

        $Post = Post::find($id);
        $Post->delete = 1;
        $Post->save();
        return response()
            ->json([
                'data' =>  $Post,
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
}

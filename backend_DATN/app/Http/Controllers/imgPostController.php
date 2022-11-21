<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\imgPost as imgPost;

class imgPostController extends Controller
{
    public function show()
    {
        $data = imgPost::all();
        return response()
            ->json([
                'data' => $data
            ]);
    }
    public function show_id(Request $request, $id)
    {
        $data = imgPost::find($id);;
        return response()
            ->json([
                'data' => $data
            ]);
    }
    public function created_at(Request $request)
    {
        $imgPost = new imgPost();
        $imgPost->img_post_name = $request->img_post_name;
        $imgPost->type_img = $request->type_img;
        $imgPost->link_img_user = $request->link_img_user;
        $imgPost->id_post = $request->id_post; // khóa ngoại
        $imgPost->save();
        return response()
            ->json([
                'data' =>  $imgPost,
                'status' => true
            ]);
    }
    public function update(Request $request, $id)
    {
        $imgPost = imgPost::find($id);
        $imgPost->img_post_name = $request->img_post_name;
        $imgPost->type_img = $request->type_img;
        $imgPost->link_img_user = $request->link_img_user;
        $imgPost->id_post = $request->id_post; // khóa ngoại
        $imgPost->save();
        return response()
            ->json([
                'data' =>  $imgPost,
                'status' => true
            ]);
    }

    public function delete(Request $request, $id)
    {
        $imgPost = imgPost::find($id);
        $imgPost->delete();
        return response()
            ->json([
                'data' =>  $imgPost,
                'status' => true
            ]);
    }
}

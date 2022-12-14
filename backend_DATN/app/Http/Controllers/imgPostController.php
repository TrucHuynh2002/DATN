<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\imgPost as imgPost;
use App\Models\Post as Post;
use Illuminate\Support\Facades\DB;

class imgPostController extends Controller
{

    public function show()
    {
        $data = DB::table('img_post')->get();
        return response()
            ->json([
                'data' => $data
            ]);
    }

    public function show_one()
    {
        $data = DB::table('img_post')->first();
        return response()
            ->json([
                'data' => $data
            ]);
    }

    public function show_id(Request $request, $id)
    {
        $data = imgPost::find($id);
        return response()
            ->json([
                'data' => $data
            ]);
    }

    public function show_img_detail(Request $request, $id)
    {
        $data = DB::table('img_post')
            ->join('post', 'img_post.id_post', '=', 'post.id_post')
            ->where('img_post.id_post', '=', $id)
            ->orderBy('post.id_post', 'DESC')
            ->get();
        return response()
            ->json([
                'data' => $data
            ]);
    }

    public function created_at(Request $request)
    {
        $imgPost = new imgPost();
        $imgPost->img_post_name =    $request->img_post_name;
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

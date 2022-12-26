<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Category;
use App\Models\CommentModel;
use App\Models\Furniture;
use App\Models\imgPost;
use App\Models\PostModel;
use App\Models\RoomType;
use App\Models\search_trendsModel as search_trendsModel;
use App\Models\User;
use Illuminate\Http\Request;

class search_trendsController extends Controller
{
    public function search_key_word(Request $request)
    {
        $get_key_word = search_trendsModel::where('key_word', '=', $request->key_word)->first();
        if ($get_key_word) {
            $get_key_word->view = $get_key_word->view + 1;
            $get_key_word->save();
            return response()
                ->json([
                    'data' => $get_key_word,
                    'status' => true
                ]);
        } else {
            $data = new search_trendsModel();
            $data->key_word = $request->key_word;
            $data->view = 0;
            $data->save();
            return response()
                ->json([
                    'data' => $data,
                    'status' => true
                ]);
        }
    }
    public function show(Request $request)
    {
        $count_post = search_trendsModel::where('view', '>', 0)->orderby('view', 'DESC')->take(10)->get();
        return response()
            ->json([
                'data' => $count_post,
                'status' => true
            ]);
    }
    public function show_keyword(Request $request, $keyword)
    {
        $keywords = search_trendsModel::where('key_word', 'like', '%' . $keyword . '%')->get();
        $get_post = PostModel::where('post_name', 'like', '%' . $keyword . '%')->get();
        $get_image = imgPost::all();
        return response()
            ->json([
                'data' => $keywords,
                'get_post' => $get_post,
                'status' => true,
                'keyword' => $keyword,
                'image' => $get_image
            ]);
    }

    public function show_keyword_catelory(Request $request, $keyword)
    {
        $keywords = search_trendsModel::where('key_word', 'like', '%' . $keyword . '%')->get();
        $get_category = Category::where('name_category', 'like', '%' . $keyword . '%')->get();
        return response()
            ->json([
                'data' => $keywords,
                'get_category' => $get_category,
                'keyword' => $keyword,
                'status' => true,
            ]);
    }
    public function show_keyword_roomType(Request $request, $keyword)
    {
        $keywords = search_trendsModel::where('key_word', 'like', '%' . $keyword . '%')->get();
        $get_room_type = RoomType::where('name_room_type', 'like', '%' . $keyword . '%')->get();
        return response()
            ->json([
                'data' => $keywords,
                'get_category' => $get_room_type,
                'keyword' => $keyword,
                'status' => true,
            ]);
    }
    public function show_keyword_post(Request $request, $keyword)
    {
        $keywords = search_trendsModel::where('key_word', 'like', '%' . $keyword . '%')->get();
        $get_post = PostModel::where('post_name', 'like', '%' . $keyword . '%')->get();
        return response()
            ->json([
                'data' => $keywords,
                'get_category' => $get_post,
                'keyword' => $keyword,
                'status' => true,
            ]);
    }
    public function show_keyword_blog(Request $request, $keyword)
    {
        $keywords = search_trendsModel::where('key_word', 'like', '%' . $keyword . '%')->get();
        $get_blog = Blog::where('name_blog', 'like', '%' . $keyword . '%')->get();
        return response()
            ->json([
                'data' => $keywords,
                'get_category' => $get_blog,
                'keyword' => $keyword,
                'status' => true,
            ]);
    }
    public function show_keyword_furniture(Request $request, $keyword)
    {
        $keywords = search_trendsModel::where('key_word', 'like', '%' . $keyword . '%')->get();
        $get_furniture = Furniture::where('name', 'like', '%' . $keyword . '%')->get();
        return response()
            ->json([
                'data' => $keywords,
                'get_category' => $get_furniture,
                'keyword' => $keyword,
                'status' => true,
            ]);
    }
    public function show_keyword_comment(Request $request, $keyword)
    {
        $keywords = search_trendsModel::where('key_word', 'like', '%' . $keyword . '%')->get();
        $get_comment = CommentModel::where('content', 'like', '%' . $keyword . '%')->get();
        return response()
            ->json([
                'data' => $keywords,
                'get_category' => $get_comment,
                'keyword' => $keyword,
                'status' => true,
            ]);
    }
    public function show_keyword_user(Request $request, $keyword)
    {
        $keywords = search_trendsModel::where('key_word', 'like', '%' . $keyword . '%')->get();
        $get_user = User::where('full_name', 'like', '%' . $keyword . '%')->get();
        return response()
            ->json([
                'data' => $keywords,
                'get_category' => $get_user,
                'keyword' => $keyword,
                'status' => true,
            ]);
    }
}

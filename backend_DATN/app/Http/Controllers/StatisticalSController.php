<?php

namespace App\Http\Controllers;
use App\Models\Category as Category;
use App\Models\RoomType as RoomType;
use App\Models\Post as Post;
use App\Models\Blog as Blog;
use App\Models\Furniture as Furniture;
use App\Models\CommentModel as CommentModel;
use App\Models\User;
use App\Models\ContactModel;
use App\Models\View;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StatisticalSController extends Controller
{
    public function count_category(Request $request)
    {
        $count_category = Category::all()->count();
        return response()
            ->json([
                'data' => $count_category,
                'status' => true
            ]);
    }
    public function count_roomType(Request $request)
    {
        $count_roomType = RoomType::all()->count();
        return response()
            ->json([
                'data' => $count_roomType,
                'status' => true
            ]);
    }
    public function count_post(Request $request)
    {
        $count_post = Post::all()->count();
        return response()
            ->json([
                'data' => $count_post,
                'status' => true
            ]);
    }
    public function count_blog(Request $request)
    {
        $count_blog = Blog::all()->count();
        return response()
            ->json([
                'data' => $count_blog,
                'status' => true
            ]);
    }
    public function count_furniture(Request $request)
    {
        $count_furniture = Furniture::all()->count();
        return response()
            ->json([
                'data' => $count_furniture,
                'status' => true
            ]);
    }
    public function count_comment(Request $request)
    {
        $count_comment = CommentModel::all()->count();
        return response()
            ->json([
                'data' => $count_comment,
                'status' => true
            ]);
    }
    public function count_user(Request $request)
    {
        $count_user = User::all()->count();
        return response()
            ->json([
                'data' => $count_user,
                'status' => true
            ]);
    }
    public function count_contact(Request $request)
    {
        $count_contact = ContactModel::all()->count();
        return response()
            ->json([
                'data' => $count_contact,
                'status' => true
            ]);
    }
    public function count_view(Request $request)
    {
        $count_view = View::find(1);
        return response()
            ->json([
                'data' => $count_view,
                'status' => true
            ]);
    }
}

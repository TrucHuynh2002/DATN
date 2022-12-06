<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;

use Illuminate\Http\Request;
use App\Models\Blog as Blog;
use Illuminate\Support\Facades\DB;

class BlogController extends Controller
{
    public function show()
    {
        $data = Blog::all();
        return response()
            ->json([
                'data' => $data
            ]);
        // return $data;
        // echo "chào ";
    }
    public function show_id(Request $request, $id)
    {
        $data = Blog::find($id);
        return response()
            ->json([
                'data' => $data
            ]);
    }
    public function show_user(Request $request, $id)
    {
        $data = DB::table('blog')
            ->join('users', 'blog.id_user', '=', 'users.id_user')
            ->where('blog.id_user', '=', $id)
            ->orderBy('blog.id_blog', 'DESC')
            ->get();
        return response()
            ->json([
                'data' => $data
            ]);
    }
    public function created_at(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'name_blog' => 'required|string|unique:blog',
            'meta_keywords' => 'required',
            'description' => 'required',
            'description_sort' => 'required',
        ], [
            'name_blog.required' => 'Không được bỏ trống',
            'meta_keywords.required' => 'Không được bỏ trống',
            'description.required' => 'Không được bỏ trống',
            'description_sort.required' => 'Không được bỏ trống',
        ]);
        if ($validation->fails()) {
            return response()
                ->json([
                    'messages' =>  $validation->messages(),
                    'status' => false
                ]);
        }
        $Blog = new Blog();
        $Blog->name_blog = $request->name_blog;
        $Blog->meta_keywords = $request->meta_keywords;
        $Blog->description_sort = $request->description_sort;
        $Blog->description = $request->description;
        $Blog->view = 0;
        $Blog->id_user = $request->id_user;
        $Blog->save();
        return response()
            ->json([
                'data' =>  $Blog,
                'status' => true
            ]);
    }
    public function update(Request $request, $id)
    {
        $validation = Validator::make($request->all(), [
            'name_blog' => 'required|string|unique:blog',
            'meta_keywords' => 'required',
            'description' => 'required',
            'description_sort' => 'required',
        ], [
            'name_blog.required' => 'Không được bỏ trống',
            'meta_keywords.required' => 'Không được bỏ trống',
            'description.required' => 'Không được bỏ trống',
            'description_sort.required' => 'Không được bỏ trống',
        ]);
        if ($validation->fails()) {
            return response()
                ->json([
                    'messages' =>  $validation->messages(),
                    'status' => false
                ]);
        }
        $Blog = Blog::find($id);
        $Blog->name_blog = $request->name_blog;
        $Blog->meta_keywords = $request->meta_keywords;
        $Blog->description_sort = $request->description_sort;
        $Blog->description = $request->description;
        $Blog->id_user = $request->id_user;
        $Blog->save();
        return response()
            ->json([
                'data' =>  $Blog,
                'status' => true
            ]);
    }
    public function updateView(Request $request, $id)
    {
        $blog = Blog::all()->where('id_blog', '=', $id);
        foreach ($blog as $val) {
            $view = $val['view'];
        };
        $update = Blog::where('id_blog', '=', $id)->update(['view' => $view + 1]);
        return response()
            ->json([
                'data' =>  $update,
                'status' => true
            ]);
    }
    public function delete(Request $request, $id)
    {
        $Blog = Blog::find($id);
        $Blog->delete();
        return response()
            ->json([
                'data' =>  $Blog,
                'status' => true
            ]);
    }
}

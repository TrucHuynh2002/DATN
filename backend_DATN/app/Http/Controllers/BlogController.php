<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
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
        $Blog->name_img_blog = $request->name_img_blog;
        $Blog->meta_keywords = $request->meta_keywords;
        $Blog->description_sort = $request->description_sort;
        $Blog->description = $request->description;
        $Blog->view = 0;
        $Blog->id_user = $request->id_user;
        $get_image = $request->file('img_blog');
        if ($get_image) {


            $get_name_image = $get_image->getClientOriginalName();
            $path = 'uploads/blog';
            $name_image  = current(explode('.', $get_name_image));
            $new_image = $name_image . rand(0, 99) . '.' . $get_image->getClientOriginalExtension();
            $get_image->move($path, $new_image);
            $link_img_blog = env('APP_URL') . '/uploads/blog/' . $new_image;
            $Blog->img_blog = $link_img_blog;
        }


        $Blog->save();
        return response()
            ->json([
                'data' =>  $Blog,
                'status' => true
            ]);
    }

    public function img_Blog(Request $request, $id)
    {
        $get_image_blog = $request->file('img_blog');
        if ($request->file('img_blog')) {
            foreach ($request->file('img_blog') as $img) {
                $get_image_blog = $img->getClientOriginalName();
                $path = 'uploads/blog/';
                $name_image_blog  = current(explode('.', $get_image_blog));
                $name_image_blog = explode('.', $get_image_blog);
                $new_image_blog = $name_image_blog[0] . rand(0, 99);
                $img->move($path, $new_image_blog);
                $link_img_blog = env('APP_URL') . '/uploads/blog/' . $new_image_blog;
                $Blog = Blog::find($id);
                if (File::exists($path . $Blog->name_img_blog)) {
                    File::delete($path . $Blog->name_img_blog);
                };
                $Blog->name_img_blog = $new_image_blog;
                $Blog->img_blog = $link_img_blog;
                $Blog->save();
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

    public function update(Request $request, $id)
    {
        $validation = Validator::make($request->all(), [
            'name_blog' => 'required|string',
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
        $get_image = $request->file('img_blog');
        if ($get_image) {

           

            $get_name_image = $get_image->getClientOriginalName();
            $path = 'uploads/blog';
            if(File::exists($path.'/'.$Blog->name_img_blog)){
                File::delete($path.'/'.$Blog->name_img_blog);
            }
            $name_image  = current(explode('.', $get_name_image));
            $new_image = $name_image . rand(0, 99) . '.' . $get_image->getClientOriginalExtension();
            $get_image->move($path, $new_image);
            $link_img_blog = env('APP_URL') . '/uploads/blog/' . $new_image;
            $Blog->img_blog = $link_img_blog;
            $Blog->name_img_blog = $new_image;
        }
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

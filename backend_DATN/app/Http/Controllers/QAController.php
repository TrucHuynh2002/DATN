<?php

namespace App\Http\Controllers;

use App\Models\img_QAModel;
use App\Models\QAModel as qa;
use App\Models\User;
use App\Models\imgUserModel;
use App\Models\QAModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class QAController extends Controller
{
    public function show(Request $request)
    {
        $data = DB::table('qa')
            ->join('users', 'qa.id_user', '=', 'users.id_user')
            ->join('img_user', 'img_user.id_user', '=', 'qa.id_user')
            ->orderBy('qa.id_qa', 'DESC')
            ->get();
        return response()
            ->json([
                'data' => $data
            ]);
    }
    public function created_at(Request $request)
    {
        // $validation = Validator::make($request->all(), [
        //     'id_user' => 'required',
        //     'title' => 'required',
        //     'content' => 'required',
        //     'id_img_qa' => 'required',
        // ], [
        //     'id_user.required' => 'Không được bỏ trống',
        //     'title.required' => 'Không được bỏ trống',
        //     'content.required' => 'Không được bỏ trống',
        //     'id_img_qa.required' => 'Không được bỏ trống',
        // ]);
        // if ($validation->fails()) {
        //     return response()
        //         ->json([
        //             'messages' =>  $validation->messages(),
        //             'status' => false
        //         ]);
        // }
        $qa = new QAModel();
        // thêm QA
        $qa->id_user = $request->id_user;
        // $qa->title = $request->title;
        $qa->content = $request->content;
        // $qa->id_img_qa = $request->id_img_qa; // khóa ngoại
        $Get_qa = QAModel::orderby('id_qa', 'DESC')->first();
        $get_image = $request->file('img');
        if ($request->file('img')) {
            foreach ($get_image as $img) {
                $get_name_image = $img->getClientOriginalName();
                // $name = $get_name_image;
                $path = 'uploads/';
                // dd($get_name_image);
                $name_image  = current(explode('.', $get_name_image));
                $name_image = explode('.', $get_name_image);
                $new_image = $name_image[0] . rand(0, 99);
                $img->move($path, $new_image);
                // $imgqa$qa->img = $new_image;
                $imgqa = new img_QAModel();
                $imgqa->link_img_qa = env('APP_URL') . '/uploads/' . $new_image;
                $imgqa->id_qa = $Get_qa->id_qa+1; // khóa ngoại
                $imgqa->save();
            }
            // return response()->json([
            //     'img' => $name
            // ]);
        }
        $qa->save();
        return response()
            ->json([
                'data' =>  $qa,
                'status' => true,
            ]);
    }

    public function getAllCommentPostUserOwner(Request $request,$id_user){
        $get_inforOwnerParent = DB::table('comment_qa')->join('qa','comment_qa.id_qa','=','qa.id_qa')
            ->join('users','users.id_user','=','comment_qa.id_user')
            ->where('qa.id_user','=',$id_user)
            ->where('parent_id','=',NULL)
            ->get();
        $get_inforOwnerChild = DB::table('comment_qa')->join('qa','comment_qa.id_qa','=','qa.id_qa')
            ->join('users','users.id_user','=','comment_qa.id_user')
            ->where('qa.id_user','=',$id_user)
            ->whereNot('parent_id','=',NULL)
            ->get();

        return response()->json([
            'status' => true,
            'dataParent' => $get_inforOwnerParent,
            'dataChild' => $get_inforOwnerChild
        ]);
    }

    
}

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
        $data = DB::table('user')
            ->join('img_user', 'img_user.id_user', '=', 'qa.id_user')
            ->join('qa', 'qa.id_user', '=', 'users.id_user')
            ->orderBy('qa.id_qa', 'DESC')
            ->get();
      
        return response()
            ->json([
                'status' => true,
                'data' => $data,
               
            ]);
    }

    public function show_detail(Request $request,$id_qa)
    {
        $data = QAModel::join('users', 'qa.id_user', '=', 'users.id_user')
        ->join('img_user', 'img_user.id_user', '=', 'qa.id_user')
        ->where('id_qa','=',$id_qa)->get();
        return response()
            ->json([
                'data' => $data,
                'status' => true
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
        $qa->content = $request->content;
        $Get_qa = QAModel::orderby('id_qa', 'DESC')->first();
        // $get_image = $request->file('img');
        // if ($request->file('img')) {
        //     foreach ($get_image as $img) {
        //         $get_name_image = $img->getClientOriginalName();
        //         $path = 'uploads/';
        //         $name_image  = current(explode('.', $get_name_image));
        //         $name_image = explode('.', $get_name_image);
        //         $new_image = $name_image[0] . rand(0, 99);
        //         $img->move($path, $new_image);
        //         $imgqa = new img_QAModel();
        //         $imgqa->link_img_qa = env('APP_URL') . '/uploads/' . $new_image;
        //         $imgqa->id_qa = $Get_qa->id_qa+1; // khóa ngoại
        //         $imgqa->save();
        //     }
        // }
        $qa->save();
        return response()
            ->json([
                'data' =>  $qa,
                'status' => true,
            ]);
    }

    public function deleteQa(Request $request, $id)
    {
        $qaDelete = QAModel::find($id);
        $qaDelete->delete();
        return response()
            ->json([
                'data' =>  $qaDelete,
                'status' => true
            ]);
    }
}

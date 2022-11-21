<?php

namespace App\Http\Controllers;

use App\Models\CommentModel;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function CommentAdd(Request $request){
        $t = new CommentModel();
        $t->content = $request->content;
        $t->date = $request->date;
        $t->status = $request->status;
        $t->id_user = $request->id_user;
        $t->save();
        return response()
                ->json([
                    'data' => $t,
                    'status'=> true
                ]);
    }
    public function CommentEdit(Request $request, $id_comment){
        $t = CommentModel::find($id_comment);
        $t->content = $request->content;
        $t->date = $request->date;
        $t->status = $request->status;
        $t->id_user = $request->id_user;
        $t->save();
        return response()
                ->json([
                    'data' => $t,
                    'status'=> true
                ]);
    }
    public function CommentDelete(Request $request,$id_comment){
        //Xóa comment
        $t= CommentModel::find($id_comment);
        $t->delete();
        return response()
                ->json([
                    'data' => $t,
                    'status'=> true
                ]);
    }
    public function Comment_SelectAll(){
        $Title = "Danh sách các hỗ trợ";
        $Comment_SelectAll = CommentModel::all();
        return response()
                ->json([
                    'data' => $Comment_SelectAll,
                    'status'=> true
                ]);
    }
    public function Comment_SelectOne(Request $request,$id_comment){
        $Title = "Danh sách các hỗ trợ";
        $Comment_SelectOne = CommentModel::find($id_comment);
        return response()
                ->json([
                    'data' => $Comment_SelectOne,
                    'status'=> true
                ]);
    }
    public function CommentApprove(Request $request,$id_comment){
        //phê duyệt comment
        $t= CommentModel::find($id_comment);
        $t->status = $request->status;
        $t->save();
        return response()
                ->json([
                    'data' => $t,
                    'status'=> true
                ]);
    }

    
    public function Comment_SelectApprove(){
        $Title = "Các bình luận đã phê duyệt";
        $Contact_SelectApprove = CommentModel::where('status','=','1');
        return response()
                ->json([
                    'data' => $Contact_SelectApprove,
                    'status'=> true
                ]);
    }
}

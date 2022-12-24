<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\QAModel;
use App\Models\comment_QAModel;
use App\Models\User;
use App\Models\imgUserModel;
use App\Models\Post;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Validator;

class comment_QAController extends Controller
{
    public function show_all()
    {
        $data = comment_QAModel::all();
        return response()
            ->json([
                'data' => $data,
                'status' => true
            ]);
    }
    public function show_QA(Request $request)
    {
        $data = DB::table('comment_qa')
            ->join('users', 'comment_qa.id_user', '=', 'users.id_user')
            ->join('img_user', 'img_user.id_user', '=', 'comment_qa.id_user')
            ->whereNull('comment_qa.parent_id')
            // ->join('qa','comment_qa.id_qa','=','qa.id_qa')
            ->orderBy('comment_qa.id_comment_qa', 'DESC')
            ->get();
        $data_child = DB::table('comment_qa')
            ->join('users', 'comment_qa.id_user', '=', 'users.id_user')
            ->join('img_user', 'img_user.id_user', '=', 'comment_qa.id_user')
            ->select('comment_qa.content', 'users.full_name', 'img_user.link_img_user', 'comment_qa.created_at', 'comment_qa.id_comment_qa', 'comment_qa.parent_id', 'comment_qa.id_user')
            ->whereNot('comment_qa.parent_id', '=', "NULL")
            // ->join('qa','comment_qa.id_qa','=','qa.id_qa')
            ->orderBy('comment_qa.id_comment_qa', 'DESC')
            ->get();
        return response()
            ->json([
                'data' => $data,
                'status' => true,
                'data_child' => $data_child
            ]);
    }
    public function Comment_QA_Add(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'content' => 'required',
        ], [
            'content.required' => 'Bạn vui lòng viết nội dung bình luận',
        ]);
        if ($validation->fails()) {
            return response()
                ->json([
                    'messages' =>  $validation->messages(),
                    'status' => false
                ]);
        }
        $t = new comment_QAModel();
        $t->content = $request->content;
        $t->id_user = $request->id_user;
        $t->id_qa = $request->id_qa;
        if ($request->parent_id) {
            $t->parent_id = $request->parent_id;
        }
        $t->save();
        $Comment_PostUser = DB::table('comment_qa')
            ->join('qa', 'qa.id_qa', '=', 'comment_qa.id_qa')
            ->select('comment_qa.id_user')
            ->orderBy('comment_qa.id_comment_qa', 'DESC')
            ->first();
        return response()->json([
            'message' => 'Bình luận thành công',
            'status' => true,
            'data' => $t,
            'id_qa' => $Comment_PostUser
        ]);
    }

    public function Comment_QASelectOne(Request $request, $id_comment)
    {
        $content = comment_QAModel::where('id_comment_qa', '=', $id_comment)->get();
        return response()->json([
            'status' => true,
            'id' => $id_comment,
            'data' => $content
        ]);
    }

    public function CommentEdit(Request $request, $id_comment)
    {
        $up_content = comment_QAModel::find($id_comment);
        if ($up_content) {
            $up_content->content = $request->content;
            $up_content->save();
        }
        return response()->json([
            'status' => true,
            'id_comment' => $id_comment,
            'data' => $up_content
        ]);
    }

    public function CommentDelete(Request $request, $id_comment)
    {
        $up_content = comment_QAModel::find($id_comment)->delete();
        return response()->json([
            'status' => true,
            'id_comment' => $id_comment,
            'alert' => 'Xóa thành công'
        ]);
    }

    public function getAllCommentPostUserOwner(Request $request,$id_user){
        $get_inforOwnerParent = DB::table('comment_qa')
            ->join('qa','comment_qa.id_qa','=','qa.id_qa')
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
    public function Count_Comment(Request $request, $id_qa){
        $Count_Comment = comment_QAModel::where('id_qa','=',$id_qa)->where('parent_id','=',null)->count();
        return response()
            ->json([
                'data' => $Count_Comment,
                'status' => true
            ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\CommentModel as CommentModel;
use App\Models\RatingModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller
{
    public function CommentAdd(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'content' => 'required',
            'id_user' => 'required',
            'id_post' => 'required',

        ], [
            'content.required' => 'Bạn vui lòng viết nội dung bình luận',
            'id_user.required' => 'Không được bỏ trống',
            'id_post.string' => 'Không được bỏ trống',
        ]);
        if ($validation->fails()) {
            return response()
                ->json([
                    'messages' =>  $validation->messages(),
                    'status' => false
                ]);
        }
        $t = new CommentModel();
        $t->content = $request->content;
        // $t->date = $request->date;
        $t->status = 1;
        $t->id_user = $request->id_user;
        $t->id_post = $request->id_post;
        $t->save();
        $Comment_PostUser = DB::table('comment')
            ->join('post', 'comment.id_post', '=', 'post.id_post')
            ->select('post.id_user')
            ->orderBy('comment.id_comment', 'DESC')
            ->take(1)
            ->get();
        $comment = CommentModel::orderby('id_comment', 'DESC')->first();
        if ($request->rate) {
            $rate = new RatingModel();
            $rate->rate = $request->rate;
            $rate->id_post = $request->id_post;
            $rate->id_comment = $comment->id_comment;
            $rate->save();
        } else {
        }
        return response()->json([
            'message' => 'Cám ơn bạn đã đánh giá!',
            'status' => true,
            'data' => $comment,
            'id' => $Comment_PostUser,
        ]);
    }
    public function CommentEdit(Request $request, $id_comment)
    {
        $t = CommentModel::find($id_comment);
        $t->content = $request->content;
        // $t->date = $request->date;
        $t->status = $request->status;
        $t->id_user = $request->id_user;
        $t->id_post = $request->id_post;
        $t->save();
        return response()
            ->json([
                'data' => $t,
                'status' => true
            ]);
    }
    public function CommentDelete(Request $request, $id_comment)
    {
        //Xóa comment
        $t = CommentModel::find($id_comment);
        $t->delete();
        return response()
            ->json([
                'data' => $t,
                'status' => true
            ]);
    }
    public function Comment_SelectAll()
    {
        $Title = "Danh sách các hỗ trợ";
        $Comment_SelectAll = DB::table('comment')
            ->join('users', 'comment.id_user', '=', 'users.id_user')
            ->orderBy('comment.id_user')
            ->get();
        return response()
            ->json([
                'data' => $Comment_SelectAll,
                'status' => true
            ]);
    }
    public function Comment_SelectPost(Request $request, $id_post)
    {
        $Title = "Danh sách các hỗ trợ";
        $Comment_SelectPost = DB::table('comment')
            ->join('users', 'comment.id_user', '=', 'users.id_user')
            // ->join('post','post.id_post','comment.id_post')
            // ->rightJoin('post_rate','post_rate.id_comment','=','comment.id_comment')
            ->where('comment.id_post', $id_post)
            ->orderBy('comment.id_user', 'DESC')
            ->get();
        return response()
            ->json([
                'data' => $Comment_SelectPost,
                'status' => true,
                'id_post' => $id_post
            ]);
    }
    public function Comment_SelectOne(Request $request, $id_comment)
    {
        $Title = "Danh sách các hỗ trợ";
        $Comment_SelectOne = CommentModel::find($id_comment);
        return response()
            ->json([
                'data' => $Comment_SelectOne,
                'status' => true
            ]);
    }
    public function CommentApprove(Request $request, $id_comment)
    {
        //phê duyệt comment
        $t = CommentModel::find($id_comment);
        $t->status = $request->status;
        $t->save();
        return response()
            ->json([
                'data' => $t,
                'status' => true
            ]);
    }


    public function Comment_SelectApprove()
    {
        $Title = "Các bình luận đã phê duyệt";
        $Contact_SelectApprove = CommentModel::where('status', '=', '1');
        return response()
            ->json([
                'data' => $Contact_SelectApprove,
                'status' => true
            ]);
    }
    public function CommentDes()
    {
        // $Title = "Các bình luận đã phê duyệt";
        $Contact_SelectApprove = CommentModel::orderBy('id_comment', 'desc')->first();
        return response()
            ->json([
                'data' => $Contact_SelectApprove,
                'status' => true
            ]);
    }
}

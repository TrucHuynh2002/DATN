<?php

namespace App\Http\Controllers;

use App\Models\CommentModel as CommentModel;
use App\Models\RatingModel;
use App\Models\User;
use App\Notifications\CommentPostNotification;
use App\Notifications\ReplyCommentPostNotification;
use App\Notifications\ReplyParentCommentNotification;
use Illuminate\Http\Request;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification as FacadesNotification;
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
        if($request->parent_id){
            $t->param_id = (int) $request->parent_id;
        }
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
            $rate->content = $request->content;
            $rate->save();
        } 

        // NOTIFY
        $getUserComment = DB::table('comment')->join('users','comment.id_user','=','users.id_user')
                        ->join('img_user','users.id_user','=','img_user.id_user')
                        ->select('comment.id_user','users.full_name','img_user.link_img_user')
                        ->orderBy('comment.id_comment','DESC')
                        ->first();  
        $getPostComment = DB::table('comment')->join('post','comment.id_post','=','post.id_post')
                        ->join('users','post.id_user','=','users.id_user')
                        ->select('post.id_post','post.post_name','users.id_user','post.id_user as OwnerPost')
                        ->orderBy('comment.id_comment','DESC')
                        ->first();
       
       
        if($request->parent_id){
            $getOwnerCommentPost = DB::table('comment')->join('users','users.id_user','=','comment.id_user')
            ->join('img_user','users.id_user','img_user.id_user')
            ->select('users.id_user','users.full_name')
            ->where('comment.id_comment','=',$request->id_Replycomment)
            ->first();
            $getParentComment = DB::table('comment')
            ->join('users','comment.id_user','=','users.id_user')
            ->select('users.full_name','users.id_user')
            ->where('comment.id_comment','=',$request->id_Replycomment)
            ->first();
            $user = User::find($getPostComment->OwnerPost);
            $userParentComment = User::find($getOwnerCommentPost->id_user);
            FacadesNotification::send($user,new ReplyCommentPostNotification($getUserComment,$getPostComment,$getParentComment));
            FacadesNotification::send($userParentComment,new ReplyParentCommentNotification($getUserComment,$getPostComment,$getParentComment));
        }
        else{
            $user = User::find($getPostComment->OwnerPost);
            if($user->id_user != $request->id_user){
            FacadesNotification::send($user,new CommentPostNotification($getUserComment,$getPostComment));
            }
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

    public function Comment_SelectAll(Request $request)
    {
        if($request->keyword && $request->keyword != ''){
            $Comment_SelectAll = CommentModel::join('users','comment.id_user','=','users.id_user')
            ->where('comment.content','like','%'.$request->keyword.'%')
            ->orwhere('comment.created_at','like','%'.$request->keyword.'%')
            ->orWhere('users.full_name','like','%'.$request->keyword.'%')->get();
        }else{
        $Comment_SelectAll = DB::table('comment')
            ->join('users', 'comment.id_user', '=', 'users.id_user')
            ->orderBy('comment.id_user')
            ->get();
        }
        return response()
            ->json([
                'data' => $Comment_SelectAll,
                'status' => true
            ]);
    }

    public function Comment_SelectPost(Request $request, $id_post)
    {
        $Comment_SelectPost = DB::table('comment')
            ->join('users', 'comment.id_user', '=', 'users.id_user')
            ->join('img_user','users.id_user','=','img_user.id_user')
            ->select('users.full_name','comment.content','comment.id_comment','img_user.link_img_user','comment.id_user')
            ->where('comment.id_post', $id_post)
            ->where('comment.param_id', '=', Null)
            ->orderBy('comment.id_comment', 'DESC')
            ->get();
        
        $Comment_Child = DB::table('comment')
        ->join('users', 'comment.id_user', '=', 'users.id_user')
        ->join('img_user','users.id_user','=','img_user.id_user')
        ->select('users.full_name','comment.content','comment.id_comment','img_user.link_img_user','users.id_user','comment.param_id')
        ->where('comment.id_post', $id_post)
        ->whereNotNull('comment.param_id')
        ->orderBy('comment.id_comment','DESC')
        ->get();
        return response()
            ->json([
                'data' => $Comment_SelectPost,
                'comment_child' => $Comment_Child,
                'status' => true,
                'id_post' => $id_post
            ]);
    }

    public function Comment_SelectPostParamid_NotNull(Request $request, $id_post)
    {
        $Comment_SelectPost = DB::table('comment')
            ->join('users', 'comment.id_user', '=', 'users.id_user')
            ->where('comment.id_post', $id_post and 'param_id', '=', 0)
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
        $Comment_SelectOne = DB::table('comment')->where('id_comment','=',$id_comment)->get();
        return response()
            ->json([
                'data' => $Comment_SelectOne,
                'status' => true,
                'id_comment' => $id_comment
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
        $Contact_SelectApprove = CommentModel::where('status', '=', '1');
        return response()
            ->json([
                'data' => $Contact_SelectApprove,
                'status' => true
            ]);
    }
    
    public function CommentDes()
    {
        $Contact_SelectApprove = CommentModel::orderBy('id_comment', 'desc')->first();
        return response()
            ->json([
                'data' => $Contact_SelectApprove,
                'status' => true
            ]);
    }

    public function Count_Comment(Request $request, $id_post){
        $Count_Comment = CommentModel::where('id_post','=',$id_post);
        return response()
            ->json([
                'data' => $Count_Comment,
                'status' => true
            ]);
    }
}

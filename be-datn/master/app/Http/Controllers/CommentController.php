<?php

namespace App\Http\Controllers;

use App\Models\CommentModel;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function CommentApprove(Request $request,$id_comment){
        //phê duyệt comment
        $t= CommentModel::find($id_comment);
        $t->status = $request->status;
        $t->save();
        // return response()
        //         ->json([
        //             'data' => $Contact_SelectAll
        //         ]);
    }

    public function CommentDelete(Request $request,$id_comment){
        //Xóa comment
        $t= CommentModel::find($id_comment);
        $t->delete();
        // return response()
        //         ->json([
        //             'data' => $Contact_SelectAll
        //         ]);
    }
    public function Comment_SelectApprove(){
        $Title = "Các bình luận đã phê duyệt";
        $Contact_SelectApprove = CommentModel::where('status','=','1');
        return response()
                ->json([
                    'data' => $Contact_SelectApprove
                ]);
    }
}

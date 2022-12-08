<?php

namespace App\Http\Controllers;

use App\Models\CommentModel;
use App\Models\RatingModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class RatingController extends Controller
{
    public function Rating_Selectall()
    {
        $t = RatingModel::all();
        return response()
            ->json([
                'data' => $t,
                'status' => true
            ]);
    }
    public function RatingAdd(Request $request)
    {
        // $validation = Validator::make($request->all(), [
        //     'rate' => 'required|string|max:255|unique:category'

        // ], [
        //     'name_category.required' => 'Không được bỏ trống',
        //     'name_category.string' => 'Không đúng định dạng',
        //     'name_category.unique' => 'Đã tồn tại',
        //     'name_category.max' => 'Độ dài không cho phép'
        // ]);
        // if ($validation->fails()) {
        //     return response()
        //         ->json([
        //             'messages' =>  $validation->messages(),
        //             'status' => false
        //         ]);
        // }
        $t = new CommentModel();
        $t->content = $request->content;
        // $t->date = $request->date;
        $t->status = 1;
        $t->id_user = $request->id_user;
        $t->id_post = $request->id_post;
        $t->save();
        
        if($request->rate){
            $comment =  CommentModel::where('id_comment','DESC')->first();

            $rate = new RatingModel();
            $rate->rate = $request->rate;
            $rate->id_post = $request->id_post;
            $rate->id_comment = $comment->id_comment;
            $rate->save();
        }
        return response()
            ->json([
                'message' => 'Cám ơn bạn đã đánh giá!',
                'status' => true
            ]);
    }
    public function RatingEdit(Request $request, $id_post_rate)
    {
        $t = RatingModel::find($id_post_rate);
        $t->rate = $request->rate;
        $t->id_post = $request->id_post;
        $t->id_comment = $request->id_comment;
        $t->save();
        return response()
            ->json([
                'data' => $t,
                'status' => true
            ]);
    }
    public function RatingDelete(Request $request, $id_post_rate)
    {
        $t = RatingModel::find($id_post_rate);
        $t->delete();
        return response()
            ->json([
                'data' => $t,
                'status' => true
            ]);
    }
    public function Rating_SelectUser(Request $request, $id_rating)
    {
        // $t = DB::table('post_rate')->join('users','rating.id_user','=','users.id')
        //                         ->where('rating.id_user','=','users.id')->get();
        $t = RatingModel::find($id_rating);
        return response()
            ->json([
                'data' => $t,
                'status' => true
            ]);
    }
    public function Rating_SelectOne(Request $request, $id_rating)
    {
        $t = DB::table('rating')->join('users', 'rating.id_user', '=', Auth::user()->id)
            ->where('rating.id_user', '=', Auth::user()->id)->get();
        return response()
            ->json([
                'data' => $t,
                'status' => true
            ]);
    }

    public function Rating_Average(Request $request,$id_post){
        $get_star = RatingModel::where('id_post','=',$id_post)->get();
        $average = 0;
        $ratingNumber = 0;
        $count = 0;
        $five_star = 0;
        $four_star = 0;
        $three_star = 0;
        $two_star = 0;
        $one_star = 0;
        if($get_star){
            foreach ($get_star as $rate) {
                $ratingNumber += $rate->rate;
                $count += 1;
                if($rate->rate == 5) {
                    $five_star++;
                }
                if($rate->rate == 4) {
                    $four_star++;
                }
                if($rate->rate == 3) {
                    $three_star++;
                }
                if($rate->rate == 2) {
                    $two_star++;
                }
                if($rate->rate == 1) {
                    $one_star++;
                }
            }
            $average = $ratingNumber/$count;
        };
        return response()->json([
            'status' => true,
            'ratingNumber' => $average,
            'data' => $get_star,
            'review_star' => [
                "five_star" => $five_star,
                "four_star" => $four_star,
                "three_star" => $three_star,
                "two_star" => $two_star,
                "one_star" => $one_star,
                "count" => $count
            ]
        ]);
    }
}

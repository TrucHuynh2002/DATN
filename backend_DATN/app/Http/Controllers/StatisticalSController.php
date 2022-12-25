<?php

namespace App\Http\Controllers;
use App\Models\Category as Category;
use App\Models\RoomType as RoomType;
use App\Models\Post as Post;
use App\Models\Blog as Blog;
use App\Models\Furniture as Furniture;
use App\Models\CommentModel as CommentModel;
use App\Models\User;
use App\Models\ContactModel;
use App\Models\RoomNumberModel;
use App\Models\View;
use App\Models\Bill;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StatisticalSController extends Controller
{
    public function count_category(Request $request)
    {
        $count_category = Category::all()->count();
        return response()
            ->json([
                'data' => $count_category,
                'status' => true
            ]);
    }
    public function count_roomType(Request $request)
    {
        $count_roomType = RoomType::all()->count();
        return response()
            ->json([
                'data' => $count_roomType,
                'status' => true
            ]);
    }
    public function count_post(Request $request)
    {
        $count_post = Post::all()->count();
        return response()
            ->json([
                'data' => $count_post,
                'status' => true
            ]);
    }
    public function count_blog(Request $request)
    {
        $count_blog = Blog::all()->count();
        return response()
            ->json([
                'data' => $count_blog,
                'status' => true
            ]);
    }
    public function count_furniture(Request $request)
    {
        $count_furniture = Furniture::all()->count();
        return response()
            ->json([
                'data' => $count_furniture,
                'status' => true
            ]);
    }
    public function count_comment(Request $request)
    {
        $count_comment = CommentModel::all()->count();
        return response()
            ->json([
                'data' => $count_comment,
                'status' => true
            ]);
    }
    public function count_user(Request $request)
    {
        $count_user = User::all()->count();
        return response()
            ->json([
                'data' => $count_user,
                'status' => true
            ]);
    }
    public function count_contact(Request $request)
    {
        $count_contact = ContactModel::all()->count();
        return response()
            ->json([
                'data' => $count_contact,
                'status' => true
            ]);
    }
    public function count_view(Request $request)
    {
        $count_view = View::all()->sum('view_index');
        return response()
            ->json([
                'data' => $count_view,
                'status' => true
            ]);
    }

    public function count_MonthRoom(Request $request, $id)
    {
        // $sum_RevenueRoom = RoomNumberModel::join('post','post.id_post','=','room_number.id_post')
        //     ->join('users','post.id_user','users.id_user')
        //     ->where('post.id_user','=',$id)
        //     ->where('room_number.status','=',2)->sum('post.room_price');
        
        $count_MonthRoom = Bill::join('room_number','bill.id_roomNumber','room_number.id')
            ->join('post','post.id_post','=','room_number.id_post')
            ->join('users','post.id_user','users.id_user')->select('bill.created_at','bill.all_money')
            ->where('post.id_user','=',$id)
            ->where('room_number.status','=',2)
            // ->where('bill.created_at' ,'=', Carbon::now('Asia/Ho_Chi_Minh')->format('y'))
            ->get();
            // $data = Bill::find(1);
            // $month = $sum_RevenueRoom->created_at->month;
        //     if($request->filter){
        //         if($request->filter == 1){
        //             $get_monthNow = Carbon::now('Asia/Ho_Chi_Minh')->format('y');
        //         }
        //     }
        // $get_monthNow = Carbon::now('Asia/Ho_Chi_Minh')->format('y');
        // $count_MonthRoom->created_at->format('m-y');
        return response()
            ->json([
                'data' => $count_MonthRoom,
                // 'now' => $count_MonthRoom->created_at->format('m-y'),
                'status' => true               
        ]);
    }
    // doanh thu
    public function count_RevenueRoom(Request $request, $id)
    {
        // $sum_RevenueRoom = RoomNumberModel::join('post','post.id_post','=','room_number.id_post')
        //     ->join('users','post.id_user','users.id_user')
        //     ->where('post.id_user','=',$id)
        //     ->where('room_number.status','=',2)->sum('post.room_price');
        
        $sum_RevenueRoom = RoomNumberModel::join('post','post.id_post','=','room_number.id_post')
            ->join('users','post.id_user','users.id_user')
            ->join('bill','room_number.id','bill.id_roomNumber')
            ->where('post.id_user','=',$id)
            ->where('room_number.status','=',2)
            ->sum('bill.all_money');
        return response()
            ->json([
                'data' => $sum_RevenueRoom,
                'status' => true               
        ]);
    }
     // phong trong
    public function count_EmptyRoom(Request $request, $id)
    {
        $count_EmptyRoom = RoomNumberModel::join('post','post.id_post','=','room_number.id_post')
            ->join('users','post.id_user','users.id_user')
            ->where('room_number.id_user','=',$id)
            ->where('room_number.status','=',0)->count();
        return response()
            ->json([
                'data' => $count_EmptyRoom,
                'status' => true               
        ]);
    }
    // phong dat coc
    public function count_DepositRoom(Request $request, $id)
    {
        $count_DepositRoom = RoomNumberModel::join('post','post.id_post','=','room_number.id_post')
        ->join('users','post.id_user','users.id_user')
        ->where('post.id_user','=',$id)
        ->where('room_number.status','=',1)->count();
        return response()
            ->json([
                'data' => $count_DepositRoom,
                'status' => true
        ]);
    }
    // phong so huu
    public function count_OwnershipRoom(Request $request, $id)
    {
        $count_OwnershipRoom = RoomNumberModel::join('post','post.id_post','=','room_number.id_post')
        ->join('users','post.id_user','users.id_user')
        ->where('room_number.id_user','=',$id)
        ->where('room_number.status','=',2)->count();
        return response()
            ->json([
                'data' => $count_OwnershipRoom,
                'status' => true
        ]);
    }
}

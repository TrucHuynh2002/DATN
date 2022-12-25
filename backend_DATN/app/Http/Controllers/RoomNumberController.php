<?php

namespace App\Http\Controllers;

use App\Mail\BookRoomAdmin;
use App\Mail\BookRoomUser;
use App\Mail\CheckOut;
use App\Mail\CheckOutAlertSuccess;
use App\Mail\CheckOutAlertUnSuccess;
use App\Models\NotificationModel;
// use App\Models\Bill;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\RoomNumberModel;
use App\Models\SavingRoomModel;
use App\Models\User;
use App\Notifications\UpdateRoomNumber;
use App\Notifications\NotificationOwnerBookingRoom;
use App\Notifications\NotificationOwnerPost;
use App\Notifications\ReplyUpdateRoomCancel;
use App\Notifications\ReplyUpdateRoomDelete;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Notification;

class RoomNumberController extends Controller
{
    public function show()
    {
        $data = RoomNumberModel::all();
        return response()
            ->json([
                'data' => $data,
                'status' => true
            ]);
    }
    public function show_one(Request $request, $id)
    {
        $data = RoomNumberModel::where('id_post', '=', $id)->get();
        // $data = RoomNumberModel::find($id);
        return response()
            ->json([
                'data' => $data,
                'status' => true
            ]);
    }
    public function show_postID(Request $request, $id)
    {
        $data = DB::table('room_number')
            // ->join('room_number', 'bill.id_roomNumber', '=', 'room_number.id')
            ->join('post', 'post.id_post', '=', 'room_number.id_post')
            ->where('room_number.id', '=', $id)
            ->get();
        return response()
            ->json([
                'data' => $data,

            ]);
    }
    public function show_id_user_two(Request $request, $id)
    {
        // $data = RoomNumberModel::where('id_post', '=', $id)->get();
        $data = RoomNumberModel::where('id_user_two', '=', $id)->get();
        return response()
            ->json([
                'data' => $data,
                'status' => false,
            ]);
    }
    public function show_id(Request $request, $id)
    {
        // $data = RoomNumberModel::where('id_post', '=', $id)->get();
        $data = RoomNumberModel::find($id);
        return response()
            ->json([
                'data' => $data,
                'status' => true
            ]);
    }

    
    public function detail_checkRoom(Request $request, $id_roomNumber)
    {
        $user = RoomNumberModel::join('users','room_number.id_user','=','users.id_user')
        ->join('post','room_number.id_post','=','post.id_post')
        ->select('post.room_price','post.electricity_price','post.water_price','room_number.room_number','post.post_name','users.full_name','users.email','users.phone')
        ->where('id', '=', $id_roomNumber)
        ->first();
        $user_two = RoomNumberModel::join('users','room_number.id_user_two','=','users.id_user')
        ->select('users.full_name','users.email','users.phone')
        ->where('id', '=', $id_roomNumber)
        ->first();
        return response()
            ->json([
                'user' => $user,
                'user_two' => $user_two,
                'status' => true,
            ]);
    }
    // Đặt phòng
    public function update(Request $request, $id)
    {
        $data = RoomNumberModel::find($id);
        $data->status = $request->status;
        $data->id_user_two = $request->id_user_two;
        $data->save();
        
        $admin = RoomNumberModel::join('users','room_number.id_user','=','users.id_user')->first();
        
        $user = RoomNumberModel::join('users','room_number.id_user_two','=','users.id_user')
        ->join('post','room_number.id_post','=','post.id_post')
        ->first();
        // Get Owner Post
        $getOwnerPost = DB::table('room_number')->join('post','post.id_post','room_number.id_post')
                        ->join('users','users.id_user','=','post.id_user')
                        ->select('users.id_user','users.full_name','post.post_name','post.id_post','post.link_img','room_number.room_number','room_number.id')
                        ->where('room_number.id','=',$id)
                        ->first();
        if($request->id_user_two){

            $getOwnerBookRoomPost = User::find($request->id_user_two);
        }
        $idOwnerPost = User::find($getOwnerPost->id_user);
        Notification::send($idOwnerPost, new NotificationOwnerPost($getOwnerPost,$getOwnerBookRoomPost));
                // $checkEmail_admin = User::where('email', '=', $request->email)->first();
        if($admin){
            Mail::to($admin->email)->send(new BookRoomAdmin($user,$admin));
        }
        if($user){
            Mail::to($user->email)->send(new BookRoomUser($user));
        }
        return response()
            ->json([
                'data' => $data,
                'status' => true,
            
            ]);
    }
    public function update_user(Request $request, $id)
    {
        $data = RoomNumberModel::find($id);
        if($data){
            $data->status = 2;
            if($request->id_user_two != 'null'){
                $data->id_user_two = $request->id_user_two;
                $saveRoom = new SavingRoomModel();
                $saveRoom->id_room = $id;
                $saveRoom->id_user = $request->id_user_two;
                $saveRoom->save();
            }
            
            $data->save();
             if($request->id_notification){
            $notiMaskasRead = DB::table('notifications')->where('id','=',$request->id_notification)->maskAsRead();
            // $notiMaskasRead->read_at = Carbon::now();
            // $notiMaskasRead->save();
        }
            return response()
                ->json([
                    'data' => $data,
                    'status' => true
                ]); 
        }
        return response()
        ->json([
            'mess' => "Phòng này không tồn tại",
            'status' => true,
        ]);
    }

    // Trả phòng

    public function checkOutRoom(Request $request,$id){
        $data = RoomNumberModel::find($id);
        if($data){
            $data->status = 0;
            $data->id_user_two = null;
            $data->save();
        }
        return response()
        ->json([
            'mess' => "Trả phòng thành công",
            'data' => $data,
            'status' => true,
        ]);
    }


    public function bookingRoom(Request $request, $id) {
        $data =  DB::table('room_number')
            ->join('post','room_number.id_post','=','post.id_post')
            ->join('users','users.id_user','=','room_number.id_user')
            ->where('room_number.id_user_two','=',$id)
            ->where('room_number.status','=',1)
            ->orderBy('room_number.id','DESC')
            ->get();
            return response()
            ->json([
                'mess' => "Thông tin phòng đang đặt",
                'data' => $data,
                'status' => true,
            ]);    
    }

    public function getBookingRoom(Request $request, $id){
        $data =  DB::table('room_number')
        ->join('post','room_number.id_post','=','post.id_post')
        ->join('users','users.id_user','=','room_number.id_user_two')
        ->where('room_number.id_user_two','=',$id)
        ->where('room_number.status','=',2)
        ->orderBy('room_number.id','DESC')
        ->get();
        // if($request->id_notification){
        //     $notiMaskasRead = DB::table('notifications')->where('id','=',$request->id_notification)->first();
        //     $notiMaskasRead->read_at = Carbon::now();
        //     $notiMaskasRead->save();
        // }
        return response()
        ->json([
            'mess' => "Thông tin phòng đang đặt",
            'data' => $data,
            'status' => true,
        ]);   
    }
    public function showRoomBookUser(Request $request,$id_user){
        if($id_user && $request->id_post){
            if($request->id_post == null){
                return response()
                ->json([
                    'data' => 'Lỗi',
                    'status' => false,
                ]);
            }
            else{
                $data = RoomNumberModel::where('id_user_two','=',$id_user)
                ->where('id_post','=',$request->id_post)
                ->first();
                return response()
                ->json([
                    'data' => $data,
                    'status' => true,
                ]);
            }
            
        }else{
            return response()
            ->json([
                'data' => 'Lỗi',
                'status' => false,
            ]);
        }
    }
    public function showSendNoti(Request $request,$id_user){
                $data = RoomNumberModel::join('users','room_number.id_user_two','=','users.id_user')
                ->where('room_number.id_user','=',$id_user)
                ->where('room_number.check_room','=','1')
                ->get();
                return response()
                ->json([
                    'data' => $data,
                    'status' => true,
                ]);
           
    }
    public function update_checkRoom(Request $request, $id)
    {
        $data = RoomNumberModel::join('users','room_number.id_user_two','=','users.id_user')->where('id_user_two', '=', $id)->first();
        $data->check_room = 1;
        $data->save();
        $admin = RoomNumberModel::join('users','room_number.id_user','=','users.id_user')->first();
        if($admin){
            Mail::to($admin->email)->send(new CheckOut($data,$admin));   
        }
        // Lấy thông tin người trả phòng
        $User_two = RoomNumberModel::join('users','room_number.id_user_two','=','users.id_user')
        ->join('img_user','users.id_user','=','img_user.id_user')
        ->select('room_number.id_user_two','users.full_name','img_user.link_img_user')
        ->first();
        
        // Lấy thông tin người chủ phòng
        $User = RoomNumberModel::join('users','room_number.id_user','=','users.id_user')
        ->join('post','room_number.id_post','=','post.id_post')
        ->select('room_number.id_user','users.full_name','room_number.room_number','post.post_name')
        ->first();
        $ownerUserId = User::find($User->id_user);
        Notification::send($ownerUserId,new UpdateRoomNumber($User_two,$User));
        return response()
            ->json([
                'data' => $data,
                'status' => true,
                'id' => $id
            ]);
    }
    public function cancelSendNoti(Request $request,$id_roomnumber){
        $data = RoomNumberModel::join('users','room_number.id_user_two','=','users.id_user')->find($id_roomnumber);
        $data->check_room = null;
        $data->id_user_two = null;
        $data->save();
        if($data){
            Mail::to($data->email)->send(new CheckOutAlertSuccess($data));
        }
        // Lấy thông tin người trả phòng
        $User_two = RoomNumberModel::join('users','room_number.id_user_two','=','users.id_user')
        ->select('room_number.id_user_two','users.full_name')
        ->first();
        $ownerUserId = User::find($User_two->id_user);
        Notification::send($ownerUserId,new ReplyUpdateRoomCancel());
        return response()
        ->json([
            'data' => $data,
            'status' => true,
        ]);
   
    }
    public function deleteSendNoti(Request $request,$id_roomnumber){
        $data = RoomNumberModel::join('users','room_number.id_user_two','=','users.id_user')->find($id_roomnumber);
        $data->check_room = null;
        $data->save();
        if($data){
            Mail::to($data->email)->send(new CheckOutAlertUnSuccess($data));
        }
        // Lấy thông tin người trả phòng
        $User_two = RoomNumberModel::join('users','room_number.id_user_two','=','users.id_user')
        ->select('room_number.id_user_two','users.full_name')
        ->first();
        
        // Lấy thông tin người chủ phòng
        // $User = RoomNumberModel::join('users','room_number.id_user','=','users.id_user')
        // ->join('post','room_number.id_post','=','post.id_post')
        // ->select('room_number.id_user','users.full_name','room_number.room_number','post.post_name')
        // ->first();
        $ownerUserId = User::find($User_two->id_user);
        Notification::send($ownerUserId,new ReplyUpdateRoomDelete());
        return response()
            ->json([
                'data' => $data,
                'status' => true,
                'id' => $id_roomnumber
            ]);

    }
    public function cancelRoomBookUser(Request $request,$id_user){
        if($id_user && $request->id_post && $request->room_number){
            if($request->id_post == null || $request->room_number == null){
                return response()
                ->json([
                    'data' => 'Chưa có dữ liệu',
                    'status' => false,
                ]);
            }else{
                $data = RoomNumberModel::where('id_user_two','=',$id_user)
                ->where('id_post','=',$request->id_post)
                ->where('room_number','=',$request->room_number)
                ->where('status','=',1)
                ->first();
                $data->id_user_two = null;
                $data->status = 0;
                $data->save();
                return response()
                ->json([
                    'messeges' => 'Hủy đặt phòng thành công',
                    'status' => true,
                ]);
            }  
        }else{
            return response()
            ->json([
                'data' => 'Lỗi',
                'status' => false,
            ]);
        }
        
    }

    public  function updateRoomNumber(Request $request, $id_roomNumber){
        $roomNumber = RoomNumberModel::find($id_roomNumber);
        $get_OwnerBookingRoom = User::find($roomNumber->id_user_two);
        $get_OwnerPost = DB::table('room_number')->join('post','post.id_post','=','room_number.id_post')
            ->where('room_number.id','=',$id_roomNumber)
            ->first();
        Notification::send($get_OwnerBookingRoom, new NotificationOwnerBookingRoom($get_OwnerBookingRoom,$get_OwnerPost,2));
        $roomNumber->status = 2;
        $roomNumber->check_room = null;
        $roomNumber->save();
        if($request->id_notification){
                  $notiMaskasRead = NotificationModel::find($request->id_notification);
                    $notiMaskasRead->read_at = Carbon::now();
                    $notiMaskasRead->save();
        }



    }

    public function CancelBookingRoom(Request $request, $id_roomNumber){
        $roomNumber = RoomNumberModel::find($id_roomNumber);
        $get_OwnerBookingRoom = User::find($roomNumber->id_user_two);
        $get_OwnerPost = DB::table('room_number')->join('post','post.id_post','=','room_number_id_post')
            ->where('room_number.id','=',$id_roomNumber)
            ->first();
        Notification::send($get_OwnerBookingRoom, new NotificationOwnerBookingRoom($get_OwnerBookingRoom,$get_OwnerPost,0));
        $roomNumber->status = 0;
        $roomNumber->check_room = null;
        $roomNumber->id_user_two = null;
        $roomNumber->save();
        if($request->id_notification){
            $notiMaskasRead = NotificationModel::find($request->id_notification);
            $notiMaskasRead->read_at = Carbon::now();
            $notiMaskasRead->save();
        }
    }
}

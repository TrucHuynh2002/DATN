<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\Auth\LoginRequest;
use App\Mail\Resetpassword;
use App\Models\imgUserModel;
use App\Notifications\AlertNotificatioRoomPostUser;
use Illuminate\Support\Facades\Mail;
use App\Providers\RouteServiceProvider;
use Carbon\Carbon;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;

class UserController extends Controller
{
    public function User_SelectAll(Request $request)
    {
        $Title = "Danh sách tài khoản";
        if($request->keyword && $request->keyword != ''){
            $User_SelectAll = User::where('full_name','like','%'.$request->keyword.'%')->get();
        }else{
        $User_SelectAll = User::all();
        }
        return response()
            ->json([
                'data' => $User_SelectAll,
                'status' => true
            ]);
    }
    public function UserAcount(Request $request, $id_user)
    {
        $User_SelectOne = User::find($id_user);
        return response()
            ->json([
                'data' => $User_SelectOne,
                'status' => true
            ]);
    }


    public function User_SelectOne(Request $request, $id_user)
    {
        $Title = "Chi tiết tài khoản";
        $User_SelectOne = DB::table('users')
            ->join('img_user', 'img_user.id_user', '=', 'users.id_user')
            ->where('users.id_user', '=', $id_user)
            ->orderBy('users.id_user')
            ->get();
        return response()
            ->json([
                'data' => $User_SelectOne,
                'status' => true
            ]);
    }
    public function ImgUserAll()
    {
        $get_img = imgUserModel::all();
        return response()
            ->json([
                'data' => $get_img,
                'status' => true
            ]);
    }
    public function ImgUser(Request $request, $id)
    {
        $get_img = imgUserModel::where('id_user', '=', $id);
        return response()
            ->json([
                'data' => $get_img,
                'status' => true
            ]);
    }

    public function UserAdd(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|max:255',
            'phone' => 'required|min:10|max:11|unique:users|regex:/(0)[0-9]{9}/',
            'address' => 'required|max:255',
        ], [
            'full_name.required' => 'Không được bỏ trống',
            'full_name.string' => 'Không đúng định dạng',
            'full_name.max' => 'Độ dài không cho phép',
            'email.required' => 'Không được bỏ trống',
            'email.email' => 'Không đúng định dạng',
            'email.max' => 'Độ dài không cho phép',
            'email.unique' => 'Đã tồn tại',
            'password.max' => 'Độ dài không cho phép',
            'password.required' => 'Không được bỏ trống',
            'phone.unique' => 'Đã tồn tại',
            'phone.required' => 'Không được bỏ trống',
            'phone.min' => 'Phải từ 10 số',
            'phone.max' => 'Vượt quá độ dài',
            'phone.regex' => 'không đúng',
            'address.required' => 'Không được bỏ trống',
            'address.max' => 'Độ dài không cho phép'
        ]);
        if ($validation->fails()) {
            return response()
                ->json([
                    'messages' =>  $validation->messages(),
                    'status' => false
                ]);
        }
        $t = new User();
        $t->full_name = $request->full_name;
        $t->email = $request->email;
        $t->password = Hash::make($request->password);
        $t->phone = $request->phone;
        $t->address = $request->address;
        $t->id_province = $request->id_province;
        $t->id_district = $request->id_district;
        $t->id_ward = $request->id_ward;
        // $t->id_street = $request->id_street;
        $t->role = $request->role;
        $t->status = 0;
        $t->email_verified_at = $request->email_verified_at;
        $t->remember_token = $request->remember_token;
        $t->save();
        $getUser = User::orderby('id_user', 'DESC')->first();
        $imgUser = new imgUserModel();
        $imgUser->type_img_user = 'Hình đại diện';
        $imgUser->name_img = $getUser->full_name;
        $imgUser->link_img_user = 'https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg';
        $imgUser->id_user = $getUser->id_user;
        $imgUser->save();
        return response()
            ->json([
                'data' => $t,
                'status' => true
            ]);
    }
    public function UserEdit(Request $request, $id_user)
    {
        $t = User::find($id_user);
        $t->full_name = $request->full_name;
        $t->phone = $request->phone;
        $t->address = $request->address;
        $t->id_province = $request->id_province;
        $t->id_district = $request->id_district;
        $t->id_ward = $request->id_ward;
        // $t->id_street = $request->id_street;
        $t->save();
        return response()
            ->json([
                'data' => $t,
                'status' => true
            ]);
    }
    public function UserStatus(Request $request, $id_user)
    {
        $t = User::find($id_user);
        // $t->role = 1;
        $t->status = 1;
        $t->save();
        return response()
            ->json([
                'data' => $t,
                'status' => true
            ]);
    }
    public function UserDelete(Request $request, $id_user)
    {
        $t = User::find($id_user);
        $t->delete();
        return response()
            ->json([
                'data' => $t,
                'status' => true
            ]);
    }
    public function PasswordEdit(Request $request, $id_user)
    {
        $t = User::find($id_user);
        // $pass_old = Hash::make($request->password);
        if ($t) {
            if (Hash::check($request->password, $t->password)) {
                if ($request->password_new == $request->password_neww) {
                    $t->password = Hash::make($request->password_new);
                    $t->save();
                    return response()
                        ->json([
                            'messess' => 'Đổi mật khẩu thành công',
                            'data' => $t,
                            'status' => true
                        ]);
                } else {
                    return response()
                        ->json([
                            'messess' => 'Nhập lại mật khẩu không khớp',
                            // 'data' => $t,
                            'status' => false
                        ]);
                }
            } else {
                // dd($pass_old);
                // dd(Hash::make($t->password));
                return response()
                    ->json([
                        'messess' => 'Mật khẩu hiện tại không đúng',
                        'status' => false
                    ]);
            }
        } else {
            return response()
                ->json([
                    'messess' => 'Không tìm thấy tài khoản của bạn',
                    'status' => false
                ]);
        }
    }
    public function PasswordEditSocial(Request $request, $id_user)
    {
        $t = User::find($id_user);
        // $pass_old = Hash::make($request->password);
        if ($t) {
                if ($request->password_new == $request->password_neww) {
                    $t->password = Hash::make($request->password_new);
                    $t->save();
                    return response()
                        ->json([
                            'messess' => 'Đổi mật khẩu thành công',
                            'data' => $t,
                            'status' => true
                        ]);
                } else {
                    return response()
                        ->json([
                            'messess' => 'Nhập lại mật khẩu không khớp',
                            // 'data' => t,
                            'status' => false
                        ]);
                }
        } else {
            return response()
                ->json([
                    'messess' => 'Không tìm thấy tài khoản của bạn',
                    'status' => false
                ]);
        }
    }
    public function UserLogin(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required',
        ], [
            'email.required' => 'Không được bỏ trống',
            'password.required' => 'Không được bỏ trống',
        ]);
        if ($validation->fails()) {
            return response()
                ->json([
                    'messages' =>  $validation->messages(),
                    'status' => false
                ]);
        }
        $credentials = request(['email', 'password']);
        if (!Auth::attempt($credentials)) {
            return response()
                ->json([
                    'messages' => "Tài khoản hoặc mật khẩu không chính xác",
                    'status' => 1
                ]);
        }
        $user_admin = User::where('email', $request->email)->where('role', '=', '2')->first();
        if ($user_admin) {
            $tokenResult = $user_admin->createToken('authToken')->plainTextToken;
            return response()->json([
                'access_token' => $tokenResult,
                'token_type' => 'Bearer',
                'data' => $user_admin,
                'status' => true,

            ]);
            event(new Registered($user_admin));
            Auth::login($user_admin);
        } else {
            $user_cus = User::where('email', $request->email)->first();
            return response()->json([
                'access_token' => "khách hàng",
                'data' => $user_cus,
                'status' => true,
            ]);
        }
    }

    public function userUpdateImg(Request $request, $id_user)
    {
        if ($request->has('avatar')) {
            $img = $request->file('avatar');
            foreach ($img as $i) {
                $get_name_image = $i->getClientOriginalName();
                // $name = $get_name_image;
                $path = 'uploads/images/';
                // $name_image  = current(explode('.', $get_name_image));
                $name_image = explode('.', $get_name_image);
                $new_image = $name_image[0] . rand(0, 99);
                $i->move($path, $new_image);
                // $imgPost->img = $new_image;
                $imgUser = new imgUserModel();
                $imgUser = $imgUser::where('id_user', '=', $id_user)->first();
                if (File::exists($path . $imgUser->name_img)) {
                    File::delete($path . $imgUser->name_img);
                }
                $imgUser->link_img_user = env('APP_URL') . '/uploads/images/' . $new_image;
                $imgUser->name_img = $new_image;
                $imgUser->type_img_user = $name_image[1]; // khóa ngoại
                $imgUser->save();
            }
            return response()->json([
                'status' => true,
                'messages' => 'Cập nhật thành công',
                'image' => $request->avatar
            ]);
        } else {
            return response()->json([
                'status' => false,
                'messages' => 'Cập nhật thất bại',
                'data' => $request->file('avatar')
            ]);
        };
    }

    public function show_province_detail(Request $request, $id_user)
    {
        $data = DB::table('users')
            ->join('province', 'users.id_province', '=', 'province.id')
            ->where('users.id_user', '=', $id_user)
            ->get();
        return response()
            ->json([
                'data' => $data,
                'status' => true
            ]);
    }
    public function show_district_detail(Request $request, $id_user)
    {
        $data = DB::table('users')

            ->join('district', 'users.id_district', '=', 'district.id')
            ->where('users.id_user', '=', $id_user)
            ->get();
        return response()
            ->json([
                'data' => $data,
                'status' => true
            ]);
    }
    public function show_ward_detail(Request $request, $id_user)
    {
        $data = DB::table('users')
            ->join('ward', 'users.id_ward', '=', 'ward.id')
            ->where('users.id_user', '=', $id_user)
            ->get();
        return response()
            ->json([
                'data' => $data,
                'status' => true
            ]);
    }
    // public function show_street_detail(Request $request, $id_user)
    // {
    //     $data = DB::table('users')
    //         ->join('street', 'users.id_street', '=', 'street.id')
    //         ->where('users.id_user', '=', $id_user)
    //         ->get();
    //     return response()
    //         ->json([
    //             'data' => $data,
    //             'status' => true
    //         ]);
    // }

    public function getUserResignerOwnerPost(Request $request){
        // $get_data = User::whereNot('role','=',2)->orderBy('id_user','DESC')->get();
        if($request->role){
            if($request->role == 0){
                $get_data = User::where('role','=',0)->orderBy('id_user','DESC')->get();
            }
            if($request->role == 1){
                // $get_data = User::whereNot('role','=',1)->orderBy('id_user','DESC')->get();
                if($request->status == 1){
                    $get_data = User::where('role','=',0)->where('status','=',0)->orderBy('id_user','DESC')->get();
                }
                if($request->status == 0){
                    $get_data = User::where('role','=',1)->where('status','=',1)->orderBy('id_user','DESC')->get();
                }
            }
        }
        elseif ($request->keyword){
            $get_data = User::where('full_name','like','%'.$request->keyword.'%')
                ->orWhere('email','like','%'.$request->keyword.'%')    
                ->orWhere('phone','like','%'.$request->keyword.'%')    
                ->orderBy('id_user','DESC')->get();
        }
        else{
            
            $get_data = User::whereNot('role','=',2)->orderBy('id_user','DESC')->get();
        }

        return response()->json([
            'status' => true,
            'data' => $get_data
        ]);
    }
    public function handlePostRoomUser(Request $request, $id_user){
        $find_user = User::find($id_user);
        $find_user->role = 1;
        $find_user->status = 0;
        $find_user->save();
        Notification::send($find_user,new AlertNotificatioRoomPostUser($find_user->id_user));
        return response()->json([
            'status' => true,
            'data' => $find_user
        ]);
    }
    public function handleCancelPostRoomUser(Request $request, $id_user){
        $find_user = User::find($id_user);
        $find_user->role = 0;
        $find_user->status = 0;
        $find_user->save();
        return response()->json([
            'status' => true,
            'data' => $find_user
        ]);
    }
}

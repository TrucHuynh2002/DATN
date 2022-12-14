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
            'full_name.required' => 'Kh??ng ???????c b??? tr???ng',
            'full_name.string' => 'Kh??ng ????ng ?????nh d???ng',
            'full_name.max' => '????? d??i kh??ng cho ph??p',
            'email.required' => 'Kh??ng ???????c b??? tr???ng',
            'email.email' => 'Kh??ng ????ng ?????nh d???ng',
            'email.max' => '????? d??i kh??ng cho ph??p',
            'email.unique' => '???? t???n t???i',
            'password.max' => '????? d??i kh??ng cho ph??p',
            'password.required' => 'Kh??ng ???????c b??? tr???ng',
            'phone.unique' => '???? t???n t???i',
            'phone.required' => 'Kh??ng ???????c b??? tr???ng',
            'phone.min' => 'Ph???i t??? 10 s???',
            'phone.max' => 'V?????t qu?? ????? d??i',
            'phone.regex' => 'kh??ng ????ng',
            'address.required' => 'Kh??ng ???????c b??? tr???ng',
            'address.max' => '????? d??i kh??ng cho ph??p'
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
        $t->role = $request->role;
        $t->status = 0;
        $t->email_verified_at = $request->email_verified_at;
        $t->remember_token = $request->remember_token;
        $t->save();
        $getUser = User::orderby('id_user', 'DESC')->first();
        $imgUser = new imgUserModel();
        $imgUser->type_img_user = 'H??nh ?????i di???n';
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
        if ($t) {
            if (Hash::check($request->password, $t->password)) {
                if ($request->password_new == $request->password_neww) {
                    $t->password = Hash::make($request->password_new);
                    $t->save();
                    return response()
                        ->json([
                            'messess' => '?????i m???t kh???u th??nh c??ng',
                            'data' => $t,
                            'status' => true
                        ]);
                } else {
                    return response()
                        ->json([
                            'messess' => 'Nh???p l???i m???t kh???u kh??ng kh???p',
                            'status' => false
                        ]);
                }
            } else {
                return response()
                    ->json([
                        'messess' => 'M???t kh???u hi???n t???i kh??ng ????ng',
                        'status' => false
                    ]);
            }
        } else {
            return response()
                ->json([
                    'messess' => 'Kh??ng t??m th???y t??i kho???n c???a b???n',
                    'status' => false
                ]);
        }
    }

    public function PasswordEditSocial(Request $request, $id_user)
    {
        $t = User::find($id_user);
        if ($t) {
                if ($request->password_new == $request->password_neww) {
                    $t->password = Hash::make($request->password_new);
                    $t->save();
                    return response()
                        ->json([
                            'messess' => '?????i m???t kh???u th??nh c??ng',
                            'data' => $t,
                            'status' => true
                        ]);
                } else {
                    return response()
                        ->json([
                            'messess' => 'Nh???p l???i m???t kh???u kh??ng kh???p',
                            'status' => false
                        ]);
                }
        } else {
            return response()
                ->json([
                    'messess' => 'Kh??ng t??m th???y t??i kho???n c???a b???n',
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
            'email.required' => 'Kh??ng ???????c b??? tr???ng',
            'password.required' => 'Kh??ng ???????c b??? tr???ng',
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
                    'messages' => "T??i kho???n ho???c m???t kh???u kh??ng ch??nh x??c",
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
                'access_token' => "kh??ch h??ng",
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
                $path = 'uploads/images/';
                $name_image = explode('.', $get_name_image);
                $new_image = $name_image[0] . rand(0, 99);
                $i->move($path, $new_image);
                $imgUser = new imgUserModel();
                $imgUser = $imgUser::where('id_user', '=', $id_user)->first();
                if (File::exists($path . $imgUser->name_img)) {
                    File::delete($path . $imgUser->name_img);
                }
                $imgUser->link_img_user = env('APP_URL') . '/uploads/images/' . $new_image;
                $imgUser->name_img = $new_image;
                $imgUser->type_img_user = $name_image[1]; // kh??a ngo???i
                $imgUser->save();
            }
            return response()->json([
                'status' => true,
                'messages' => 'C???p nh???t th??nh c??ng',
                'image' => $request->avatar
            ]);
        } else {
            return response()->json([
                'status' => false,
                'messages' => 'C???p nh???t th???t b???i',
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

    public function getUserResignerOwnerPost(Request $request){
        if($request->role){
            if($request->role == 1){
                $get_data = User::where('role','=',"0")->where('status','=','0')->orderBy('id_user','DESC')->get();
            }
            if($request->role == 2){
                if($request->status == 1){
                    $get_data = User::where('role','=',0)->where('status','=',1)->orderBy('id_user','DESC')->get();
                }
                elseif($request->status == 2){
                    $get_data = User::where('role','=',1)->where('status','=',0)->orderBy('id_user','DESC')->get();
                }
                if(!$request->status){
                    $get_data = User::where('role','=',1)->orwhere('status','=',1)->orderBy('id_user','DESC')->get();
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

<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\Auth\LoginRequest;
use App\Mail\Resetpassword;
use App\Models\imgUserModel;
use Illuminate\Support\Facades\Mail;
use App\Providers\RouteServiceProvider;
use Carbon\Carbon;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function User_SelectAll()
    {
        $Title = "Danh sách tài khoản";
        $User_SelectAll = User::all();
        return response()
            ->json([
                'data' => $User_SelectAll,
                'status' => true
            ]);
    }

    public function User_SelectOne(Request $request, $id_user)
    {
        $Title = "Chi tiết tài khoản";
        $User_SelectOne = User::find($id_user);
        return response()
            ->json([
                'data' => $User_SelectOne,
                'status' => true
            ]);
    }
    public function UserAdd(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:Users',
            'password' => 'required|max:255',
            'phone' => 'required|max:12|min:10|unique:Users',
            'address' => 'required|max:255',
            // 'role' => 'required',
            // 'id_img_user' => 'required',
            // 'email_verified_at' => 'required',
            // 'remember_token' => 'required',
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
            'phone.max' => 'Độ dài không cho phép',
            'phone.required' => 'Không được bỏ trống',
            'phone.min' => 'Không đúng',
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
        $t->role = $request->role;
        $t->id_img_user = 1;
        $t->email_verified_at = $request->email_verified_at;
        $t->remember_token = $request->remember_token;
        // $t->created_at= Carbon::today();
        $t->save();
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
        $t->email = $request->email;
        // $t->password = $request->password;
        $t->phone = $request->phone;
        $t->address = $request->address;
        // $t->role = $request->role;
        // $t->id_img_user = $request->id_img_user;
        // $t->email_verified_at = $request->email_verified_at;
        // $t->remember_token = $request->remember_token;
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
            if ($t->password == $request->password) {
                $t->password = $request->password_new;
                $t->save();
                return response()
                    ->json([
                        'data' => $t,
                        'status' => true
                    ]);
            } else {
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
    public function UserLogin(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'email' => 'required|email|max:255',
            'password' => 'required|max:255',
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
                    'status' => false
                ]);
        }
        $user_admin = User::where('email', $request->email)->where('role', '=', '1')->first();
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
                $imgUser->link_img_user = env('APP_URL') . ':8000/uploads/images/' . $new_image;
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
    // public function UserForgotPassword(Request $request)
    // {
    //     $Check_User = User::where('email','=',$request->email)->first();
    //     if($Check_User){
    //     $request->authenticate();

    //     $request->session()->regenerate();

    //     return redirect()->intended(RouteServiceProvider::HOME);
    //         return response()
    //             ->json([
    //                 'messages' => "Kiểm tra mail để đổi mật khẩu",
    //                 'status'=> true
    //             ]);
    //         Mail::to($request->email)->send(new Resetpassword($Check_User));
    //     }else{
    //         return response()
    //             ->json([
    //                 'messages' => "Mail không chính xác",
    //                 'status'=> false
    //             ]);
    //     }
    //     $request->authenticate();

    //     $request->session()->regenerate();

    //     return redirect()->intended(RouteServiceProvider::HOME);
    // }
}

<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\Auth\LoginRequest;
use App\Mail\Resetpassword;
use Illuminate\Support\Facades\Mail;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Auth;
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
        // $User_SelectOne = User::where('email','=',$request->email)->where('password','=',Hash::make($request->password))->first();
        // dd(Hash::make($request->password));
        $credentials = request(['email', 'password']);
        // $check_role = User::where('role','=','')->first();
        // $tokenResult = $User_SelectOne->createToken('authToken')->plainTextToken;
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

        // return redirect()->intended(RouteServiceProvider::HOME);
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

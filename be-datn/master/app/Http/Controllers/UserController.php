<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\Auth\LoginRequest;
use App\Mail\Resetpassword;
use Illuminate\Support\Facades\Mail;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function User_SelectAll(){
        $Title = "Danh sách tài khoản";
        $User_SelectAll = User::all();
        return response()
                ->json([
                    'data' => $User_SelectAll,
                    'status'=> true
                ]);
    }

    public function User_SelectOne(Request $request,$id_user){
        $Title = "Chi tiết tài khoản";
        $User_SelectOne = User::find($id_user);
        return response()
                ->json([
                    'data' => $User_SelectOne,
                    'status'=> true
                ]);
    }
    public function UserAdd(Request $request){
        $validation = Validator::make($request->all(),[ 
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:Users',
            'password' => 'required|max:255',
            'phone' => 'required|max:12|min:10|unique:Users',
            'address' => 'required|max:255',
            // 'role' => 'required',
            // 'id_img_user' => 'required',
            // 'email_verified_at' => 'required',
            // 'remember_token' => 'required',
        ],[
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
        if($validation->fails()){
            return response()
            ->json([
                'messages' =>  $validation->messages(),
                'status'=> false
            ]);
        }
        $t = new User();
        $t->full_name = $request->full_name;
        $t->email = $request->email;
        $t->password = $request->password;
        $t->phone = $request->phone;
        $t->address = $request->address;
        $t->role = $request->role;
        $t->id_img_user = $request->id_img_user;
        $t->email_verified_at = $request->email_verified_at;
        $t->remember_token = $request->remember_token;
        $t->save();
        return response()
                ->json([
                    'data' => $t,
                    'status'=> true
                ]);
    }
    public function UserEdit(Request $request, $id_user){
        $t = User::find($id_user);
        $t->full_name = $request->full_name;
        $t->email = $request->email;
        $t->password = $request->password;
        $t->phone = $request->phone;
        $t->address = $request->address;
        $t->role = $request->role;
        $t->id_img_user = $request->id_img_user;
        $t->email_verified_at = $request->email_verified_at;
        $t->remember_token = $request->remember_token;
        $t->save();
        return response()
                ->json([
                    'data' => $t,
                    'status'=> true
                ]);
    }
    public function UserDelete(Request $request,$id_user){
        $t= User::find($id_user);
        $t->delete();
        return response()
                ->json([
                    'data' => $t,
                    'status'=> true
                ]);
    }
    public function UserLogin(Request $request)
    {
        $User_SelectOne = User::where('email','=',$request->email)->where('password','=',$request->password)->first();
        if($User_SelectOne){
            return response()
                ->json([
                    'data' => $User_SelectOne,
                    'status'=> true
                ]);
        }else{
            return response()
                ->json([
                    'data' => "Tài khoản hoặc mật khẩu không chính xác",
                    'status'=> false
                ]);
        }
        // $request->authenticate();

        // $request->session()->regenerate();

        // return redirect()->intended(RouteServiceProvider::HOME);
    }
    public function UserForgotPassword(Request $request)
    {
        $Check_User = User::where('email','=',$request->email)->first();
        if($Check_User){
        // $request->authenticate();

        // $request->session()->regenerate();

        // return redirect()->intended(RouteServiceProvider::HOME);
            return response()
                ->json([
                    'data' => "Kiểm tra mail để đổi mật khẩu",
                    'status'=> true
                ]);
            Mail::to($request->email)->send(new Resetpassword($Check_User));
        }else{
            return response()
                ->json([
                    'data' => "Mail không chính xác",
                    'status'=> false
                ]);
        }
        // $request->authenticate();

        // $request->session()->regenerate();

        // return redirect()->intended(RouteServiceProvider::HOME);
    }
}
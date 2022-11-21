<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Mail\ResetPasswordSuccess;
use App\Models\password_resets;
use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;

class NewPasswordController extends Controller
{
    public function store(Request $request)
    {
        // $request->validate([
        //     'token' => 'required',
        //     'password' => 'required|confirmed',
        //     'password_confirmation' => 'required|same:password'
        // ],[
        //     'password.required' => 'mật khẩu không được bỏ trống',
        //     'password.confirmed' => 'Mật khẩu không trùng khớp',
        //     'password_confirmation.required' => 'Vui lòng nhập lại mật khẩu'
        // ]);
        $check_token = password_resets::where('token','=',$request->token)->first();
        if($check_token){
            $check_user = User::where('email','=',$request->email)->first();
            if($check_user){
                $check_user->password = Hash::make($request->password);
                $check_user->save();     
                Mail::to($request->email)->send(new ResetPasswordSuccess($check_user));
                password_resets::where('token','=',$request->token)->delete();
                return response()
                ->json([
                    "messeges"=>"đổi pass thành công",
                    "status"=>true
                ]);
                // Auth::login($check_user);
            }else{
                return response()
                ->json([
                    "messeges"=>"đổi pass thất bại",
                    "status"=>false
                ]);
                // return redirect(route('login'));
            }
            };
        return redirect('/');

        

    }
}

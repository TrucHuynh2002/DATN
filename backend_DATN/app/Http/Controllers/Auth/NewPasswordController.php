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
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;

class NewPasswordController extends Controller
{
    public function store(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'password' => 'required',
            'password_confirm' => 'required|same:password',
        ],
        [
            'password.required' => 'Vui lòng nhập mật khẩu mới',
            'password_confirm.required' => 'Vui lòng nhập xác nhận mật khẩu mới',
            'password_confirm.same' => 'Nhập lại mật khẩu không khớp'
        ]);

        // We will send the password reset link to this user. Once we have attempted
        // to send the link, we will examine the response then see the message we
        // need to show to the user. Finally, we'll send out a proper response.

        // $status = Password::sendResetLink(
        //     $request->only('email')
        // );

        // return $status == Password::RESET_LINK_SENT
        //             ? back()->with('status', __($status))
        //             : back()->withInput($request->only('email'))
        //                     ->withErrors(['email' => __($status)]);
        if ($validation->fails()) {
            return response()
                ->json([
                    'messages' =>  $validation->messages(),
                    'status' => false
                ]);
        }
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
            $check_user = User::where('email','=',$check_token->email)->first();
            if($check_user){
                if($request->password == $request->password_confirm){
                $check_user->password = Hash::make($request->password);
                $check_user->save();
                Mail::to($check_token->email)->send(new ResetPasswordSuccess($check_user));
                password_resets::where('token','=',$request->token)->delete();
                return response()
                ->json([
                    "messeges"=>"Đổi pass thành công",
                    "status"=>true
                ]);
                // Auth::login($check_user);
                }else{
                    return response()
                ->json([
                    "messeges"=>"Nhập lại mật khẩu không khớp",
                    "status"=>2
                ]);
                }

            }else{
                return response()
                ->json([
                    "messeges"=>"Đổi pass thất bại",
                    "status"=>1
                ]);
                // return redirect(route('login'));
            }
        };
        // return redirect('/');
    }
}

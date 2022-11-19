<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Mail\ResetPassAlert;
use App\Models\password_resets;
use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;

class NewPasswordController extends Controller
{
    /**
     * Display the password reset view.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\View\View
     */
    public function create(Request $request,$token)
    {    $check_token = password_resets::where('token','=',$token)->first();
        if($check_token){
        return view('auth.reset-password', ['token' => $token, 'email' => $request->email]);
        }else{
            return redirect(route('login'));
        }
    }

    /**
     * Handle an incoming new password request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'password' => 'required|confirmed',
            'password_confirmation' => 'required|same:password'
        ],[
            'password.required' => 'mật khẩu không được bỏ trống',
            'password.confirmed' => 'Mật khẩu không trùng khớp',
            'password_confirmation.required' => 'Vui lòng nhập lại mật khẩu'
        ]);
   
       
       
            $check_user = User::where('email','=',$request->email)->first();
            if($check_user){
                $check_user->password = Hash::make($request->password);
                $check_user->save();     
                Mail::to($request->email)->send(new ResetPassAlert($check_user));
                password_resets::where('token','=',$request->token)->delete();
                Auth::login($check_user);
            };
        return redirect('/');

        

    }
}

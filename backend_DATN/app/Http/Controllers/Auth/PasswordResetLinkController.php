<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Mail\ResetPassAlert;
// use App\Mail\ResetPasswordSuccess;
use App\Models\password_resets;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Auth\Notifications\ResetPassword as NotificationsResetPassword;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;

class PasswordResetLinkController extends Controller
{
    /**
     * Display the password reset link request view.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        
        return view('auth.forgot-password');
    
    }

    /**
     * Handle an incoming password reset link request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email'],
        ],
        ['email.required' => 'Vui lòng nhập email']);

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
        $checkEmail = User::where('email', '=', $request->email)->first();
        if($checkEmail){
            $token = Str::random(10);
            // dd($token);
            $check_token = password_resets::where('email', '=', $request->email);
            if($check_token){
                $check_token->delete();
            }
            password_resets::create([
                'email' => $request->email,
                'token' => $token,
                // 'created_at' => Carbon::now()
            ]);
            Mail::to($request->email)->send(new ResetPassAlert($checkEmail,$token));
            return back()->with(['message' => 'Vui lòng kiểm tra email để đổi mật khẩu']);
        }else{
            return back()->with(['error' => 'Email không tồn tại']);

        }
        // kiem tra mail ton tai hay khong
        // neu co ton tai thi tao ra token cua email do trong password_reset
        // truyen token do vao form emaiil nguoi nhan
        //
        // $token = Str:random(60);



        // Mail::to($request->email)
        //     ->subject('')
        //     ->send(new Resetpassword($user,$token));
    }
}

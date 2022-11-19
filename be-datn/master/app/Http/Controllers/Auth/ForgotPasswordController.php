<?php

namespace App\Http\Controllers;

use App\Mail\Resetpassword;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ForgotPasswordController extends Controller{
    public function store(Request $request)
    {
        $request->validate([
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
        ]);
        $check_mail = User::where('email','=',$request->email)->first();
        if($check_mail){
            Mail::to($request->email)->send(new Resetpassword($check_mail));
            return back()->with(['message' => 'Vui lòng kiểm tra email để đổi mật khẩu']);
        }else{
            return back()->with(['error' => 'Email không tồn tại']);

        }

        // event(new Registered($user));

        // Auth::login($user);

        // return redirect(RouteServiceProvider::HOME);
    }
}

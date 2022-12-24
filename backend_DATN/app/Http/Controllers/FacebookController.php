<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;

class FacebookController extends Controller
{
    public function getLinkUrl(){
        $url = Socialite::driver('facebook')->stateless()->redirect()->getTargetUrl();
        return response()->json([
            'status' => true,
            'url' => $url,
        ]);
    }

    public function FacebookLoginCallback(Request $request){
        $state = $request->input('state');

        parse_str($state, $result);
        $googleUser = Socialite::driver('facebook')->stateless()->user();

        $user = User::where('email', $googleUser->email)->first();
        if ($user) {
            return response()->json([
                'status' => true,
                'data' => $user,
            ]);
        }
        $user = User::create(
            [
                'email' => $googleUser->email,
                'full_name' => $googleUser->name,
                'facebook_id'=> $googleUser->id,
                'role' => 0,
                'password'=> '',
            ]
        );
        return response()->json([
            'status' => true,
            'data' => $googleUser,
        ]);
    }
}

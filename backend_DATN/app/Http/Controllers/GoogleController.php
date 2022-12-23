<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Laravel\Socialite\Facades\Socialite;

class GoogleController extends Controller
{
    public function getGoogleSignInUrl()
    {
        
            $url = Socialite::driver('google')->stateless()->redirect()->getTargetUrl();
            return response()->json([
                'url' => $url,
            ]);
         
    }

    public function loginCallback(Request $request)
    {
        
            $state = $request->input('state');

            parse_str($state, $result);
            $googleUser = Socialite::driver('google')->stateless()->user();

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
                    'google_id'=> $googleUser->id,
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

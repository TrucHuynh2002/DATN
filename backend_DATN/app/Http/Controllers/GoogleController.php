<?php

namespace App\Http\Controllers;

use App\Models\imgUserModel;
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
                'status' => true,
                'url' => $url,
            ]);
         
    }

    public function loginCallback(Request $request)
    {
        

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
                    'status' => 0,
                    'password'=> '',
                ]
            );
            $get_user = User::orderBy('id_user','DESC')->first();
            $imgUser = new imgUserModel();
            imgUserModel::create(
                [
                    'type_img_user' => "Hình đại diện",
                    'name_img' => 'ABC',
                    'link_img_user' => 'https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg',
                    'id_user' => $get_user->id_user,
                    
                ]
                );
            // $imgUser->type_img_user = 'Hình đại diện';
            // $imgUser->name_img = 'Google';
            // $imgUser->link_img_user = 'https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg';
            // $imgUser->id_user = $get_user->id_user
            return response()->json([
                'status' => true,
                'data' => $user,
                'get_user' => $get_user->id
            ]);
        
    }
}

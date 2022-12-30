<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\HeartFeeling as HeartFeeling;
use Illuminate\Support\Facades\Validator;

class HeartFeelingController extends Controller
{

    public function show_id(Request $request, $id)
    {
        $data = HeartFeeling::where('id_post', '=', $id);
        return response()
            ->json([
                'data' => $data,
                'status' => true,
            ]);
    }

    public function created_at(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'heart_feeling' => 'required',
            'id_post' => 'required',
            'id_user' => 'required'
        ], [
            'heart_feeling.required' => 'Không được bỏ trống',
            'id_post.required' => 'Không được bỏ trống',
            'id_user.required' => 'Không được bỏ trống'
        ]);
        if ($validation->fails()) {
            return response()
                ->json([
                    'messages' =>  $validation->messages(),
                    'status' => false
                ]);
        }
        $HeartFeeling = new HeartFeeling();
        $HeartFeeling->heart_feeling = $request->heart_feeling;
        $HeartFeeling->id_post =  $request->id_post;
        $HeartFeeling->id_user = $request->id_user;
        $HeartFeeling->save();
        return response()
            ->json([
                'data' =>  $HeartFeeling,
                'status' => true
            ]);
    }
    
    public function delete(Request $request, $id)
    {
        $HeartFeeling = HeartFeeling::find($id);
        $HeartFeeling->delete();
        return response()
            ->json([
                'data' =>  $HeartFeeling,
                'status' => true
            ]);
    }
}

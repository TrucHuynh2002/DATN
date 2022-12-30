<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;
use App\Models\notyNotyQaModel;
use Illuminate\Support\Facades\Validator;

class notyNotyQaController extends Controller
{

    public function show()
    {
        $data = notyNotyQaModel::all();
        return response()
            ->json([
                'data' => $data,
                'status' => true
            ]);
    }

    public function show_one(Request $request, $id)
    {
        $data = DB::table('noty_notyqa')
            ->join('users', 'noty_notyqa.id_user', '=', 'users.id_user')
            ->where('noty_notyqa.id_user_tow', '=', $id)
            ->take(10)
            ->orderBy('noty_notyqa.id', 'DESC')
            ->get();
        return response()
            ->json([
                'data' => $data,
                'status' => true
            ]);
    }

    public function AddComment(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'interaction' => 'required',
            'id_user' => 'required',
            'id_qa' => 'required',
        ], [
            'interaction.required' => 'Không được bỏ trống',
            'id_user.required' => 'Không được bỏ trống',
            'id_qa.required' => 'Không được bỏ trống',

        ]);
        if ($validation->fails()) {
            return response()
                ->json([
                    'messages' =>  $validation->messages(),
                    'status' => false
                ]);
        }
        $t = new notyNotyQaModel();
        if($request->id_user_tow){

            $t->id_user_tow = $request->id_user_tow;
        }else{
            $t->id_user_tow = NULL;
        }
        $t->status = 1;
        $t->interaction = $request->interaction;
        $t->id_user = $request->id_user;
        $t->id_qa = $request->id_qa;
        $t->save();
        return response()
            ->json([
                'data' => $t,
                'status' => true
            ]);
    }
}

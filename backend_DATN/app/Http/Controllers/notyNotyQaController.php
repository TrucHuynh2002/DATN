<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\notyNotyQaModel;

class notyNotyQaController extends Controller
{
    public function show()
    {
        $data = notyNotyQaModel::all();
        return response()
        ->json([
            'data'=> $data,
            'status'=> true
        ]);
    }
    public function show_one(Request $request, $id)
    {
        $data = notyNotyQaModel::find($id);
        return response()
        ->json([
            'data'=> $data,
            'status'=> true
        ]);
    }
}

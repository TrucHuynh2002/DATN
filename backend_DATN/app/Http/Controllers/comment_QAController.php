<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\QAModel as qa;
use App\Models\comment_QAModel as cmtqa;

class comment_QAController extends Controller
{
    public function show_all()
    {
        $data = cmtqa::all();
        return response()
            ->json([
                'data' => $data,
                'status' => true
            ]);
    }
    public function show_QA()
    {
        $data = DB::table('cmtqa');
        return response()
            ->json([
                'data' => $data,
                'status' => true
            ]);
    }
}

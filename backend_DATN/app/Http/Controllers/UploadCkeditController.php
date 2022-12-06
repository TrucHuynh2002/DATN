<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UploadCkeditController extends Controller
{
    public function count_category(Request $request)
    {
        // $imgpath = Storage::disk('public')->put("images/uploads", $request->file('upload'));
        // return response()->json([
        //     'default' => "http://127.0.0.1:8000/" . $imgpath,
        // ]);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\img_QAModel as imgqa;
use App\Models\QAModel as qa;
use Illuminate\Support\Facades\DB;

class img_QAController extends Controller
{
    public function show()
    {
        $data = DB::table('img_qa')->get();
        return response()
            ->json([
                'data' => $data
            ]);
    }

    public function show_id(Request $request, $id)
    {
        $data = imgqa::find($id);
        return response()
            ->json([
                'data' => $data
            ]);
    }
    
    public function create(Request $request)
    {
        $imgqa = new imgqa();
        $imgqa->id_qa = $request->id_qa;
        $imgqa->link_img_qa = $request->link_img_qa;
        $imgqa->save();
        return response()
            ->json([
                'data' =>  $imgqa,
                'status' => true
            ]);
    }
}

<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Mail\BillAlert;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

class EmailBillController extends Controller{
    public function store(Request $request){
        $checkEmail = User::where('email', '=', $request->email)->first();
        if($checkEmail){
            Mail::to($request->email)->send(new BillAlert($checkEmail));
            return response()->json([
                "status" => true,
                "messages" => "Gửi hóa đơn thành công"
            ]);
        }else{
            return response()->json([
                "status" => false,
                "messages" => "Gửi hóa đơn thất bại"
            ]);
        }
    }
}

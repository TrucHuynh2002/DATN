<?php

namespace App\Http\Controllers;

use App\Models\ContactModel;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function Contact_SelectAll(){
        $Title = "Danh sách các hỗ trợ";
        $Contact_SelectAll = ContactModel::all();
        return response()
                ->json([
                    'data' => $Contact_SelectAll
                ]);
    }

    public function Contact_SelectOne(Request $request,$id_contact){
        $Title = "Chi tiết hỗ trợ";
        $Contact_SelectOne = ContactModel::find($id_contact);
        return response()
                ->json([
                    'data' => $Contact_SelectOne
                ]);
    }

    public function ContactApprove(Request $request,$id_contact){
        //phê duyệt hỗ trợ
        $t= ContactModel::find($id_contact);
        $t->status = $request->status;
        $t->save();
        // return response()
        //         ->json([
        //             'data' => $Contact_SelectAll
        //         ]);
    }

    public function Contact_SelectNotApprove(){
        $Title = "Các hỗ trợ chưa phê duyệt";
        $Contact_SelectNotApprove = ContactModel::where('status','=','0');
        return response()
                ->json([
                    'data' => $Contact_SelectNotApprove
                ]);
    }
    
    public function Contact_SelectApprove(){
        $Title = "Các hỗ trợ đã phê duyệt";
        $Contact_SelectApprove = ContactModel::where('status','=','1');
        return response()
                ->json([
                    'data' => $Contact_SelectApprove
                ]);
    }
}

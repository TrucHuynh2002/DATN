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
                    'data' => $Contact_SelectAll,
                    'status'=> true
                ]);
    }

    public function Contact_SelectOne(Request $request,$id_contact){
        $Title = "Chi tiết hỗ trợ";
        $Contact_SelectOne = ContactModel::find($id_contact);
        return response()
                ->json([
                    'data' => $Contact_SelectOne,
                    'status'=> true
                ]);
    }
    public function ContactAdd(Request $request){
        $t = new ContactModel();
        $t->full_name = $request->full_name;
        $t->subject = $request->subject;
        $t->email = $request->email;
        $t->phone = $request->phone;
        $t->content = $request->content;
        $t->status = $request->status;
        $t->save();
        return response()
                ->json([
                    'data' => $t,
                    'status'=> true
                ]);
    }
    public function ContactEdit(Request $request, $id_contact){
        $t = ContactModel::find($id_contact);
        $t->full_name = $request->full_name;
        $t->subject = $request->subject;
        $t->email = $request->email;
        $t->phone = $request->phone;
        $t->content = $request->content;
        $t->status = $request->status;
        $t->save();
        return response()
                ->json([
                    'data' => $t,
                    'status'=> true
                ]);
    }
    public function ContactDelete(Request $request,$id_contact){
        $t= ContactModel::find($id_contact);
        $t->delete();
        return response()
                ->json([
                    'data' => $t,
                    'status'=> true
                ]);
    }
    public function ContactApprove(Request $request,$id_contact){
        //phê duyệt hỗ trợ
        $t= ContactModel::find($id_contact);
        $t->status = $request->status;
        $t->save();
        return response()
                ->json([
                    'data' => $t,
                    'status'=> true
                ]);
    }

    public function Contact_SelectNotApprove(){
        $Title = "Các hỗ trợ chưa phê duyệt";
        $Contact_SelectNotApprove = ContactModel::where('status','=','0');
        return response()
                ->json([
                    'data' => $Contact_SelectNotApprove,
                    'status'=> true
                ]);
    }
    
    public function Contact_SelectApprove(){
        $Title = "Các hỗ trợ đã phê duyệt";
        $Contact_SelectApprove = ContactModel::where('status','=','1');
        return response()
                ->json([
                    'data' => $Contact_SelectApprove,
                    'status'=> true
                ]);
    }
}

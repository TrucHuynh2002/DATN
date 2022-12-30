<?php

namespace App\Http\Controllers;

use App\Mail\ContactUser;
use App\Mail\ReplyContactUser;
use App\Models\ContactModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    public function Contact_SelectAll(Request $request)
    {
        $Title = "Danh sách các hỗ trợ";
        if($request->keyword && $request->keyword != ''){
            $Contact_SelectAll = ContactModel::where('full_name','like','%'.$request->keyword.'%')
            ->orWhere('subject','like','%'.$request->keyword.'%')
            ->orWhere('email','like','%'.$request->keyword.'%')
            ->orWhere('phone','like','%'.$request->keyword.'%')
            ->orWhere('content','like','%'.$request->keyword.'%')->get();
        }else{
        $Contact_SelectAll = ContactModel::all();
        }
        return response()
            ->json([
                'data' => $Contact_SelectAll,
                'status' => true
            ]);
    }

    public function Contact_SelectOne(Request $request, $id_contact)
    {
        $Title = "Chi tiết hỗ trợ";
        $Contact_SelectOne = ContactModel::find($id_contact);
        return response()
            ->json([
                'data' => $Contact_SelectOne,
                'status' => true
            ]);
    }
    public function ContactAdd(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'full_name' => 'required|string|max:255',
            'subject' => 'required',
            'email' => 'required|email',
            'phone' => 'required|min:10|max:11|regex:/(0)[0-9]{9}/',
            'content' => 'required|max:255',
        ], [
            'full_name.required' => 'Không được bỏ trống',
            'full_name.string' => 'Không đúng định dạng',
            'full_name.max' => 'Độ dài không cho phép',
            'subject.required' => 'Không được bỏ trống',
            'email.required' => 'Không được bỏ trống',
            'email.email' => 'Không đúng định dạng',
            'phone.required' => 'Không được bỏ trống',
            'phone.min' => 'Phải từ 10 số',
            'phone.max' => 'Vượt quá độ dài',
            'phone.regex' => 'không đúng',
            'content.required' => 'Không được bỏ trống',
            'content.max' => 'Không đúng định dạng',
        ]);
        if ($validation->fails()) {
            return response()
                ->json([
                    'messages' =>  $validation->messages(),
                    'status' => false
                ]);
        }
        $t = new ContactModel();
        $t->full_name = $request->full_name;
        $t->subject = $request->subject;
        $t->email = $request->email;
        $t->phone = $request->phone;
        $t->content = $request->content;
        $t->status = 0;
        $t->save();
        Mail::to($request->email)->send(new ContactUser($t));
        return response()
            ->json([
                'data' => $t,
                'status' => true
            ]);
    }
    public function ContactEdit(Request $request, $id_contact)
    {
        $validation = Validator::make($request->all(), [
            'reply' => 'required|max:255',

        ], [
            'reply.required' => 'Không được bỏ trống',
            'reply.max' => 'Độ dài không cho phép',
        ]);
        if ($validation->fails()) {
            return response()
                ->json([
                    'messages' =>  $validation->messages(),
                    'status' => false
                ]);
        }
        $t = ContactModel::find($id_contact);
        // $t->full_name = $request->full_name;
        // $t->subject = $request->subject;
        // $t->email = $request->email;
        // $t->phone = $request->phone;
        // $t->content = $request->content;
        $t->status = 1;
        $t->reply = $request->reply;
        $t->save();
        Mail::to($t->email)->send(new ReplyContactUser($t));
        return response()
            ->json([
                'data' => $t->reply,
                'status' => true
            ]);
    }
    public function ContactDelete(Request $request, $id_contact)
    {
        $t = ContactModel::find($id_contact);
        $t->delete();
        return response()
            ->json([
                'data' => $t,
                'status' => true
            ]);
    }
    public function ContactApprove(Request $request, $id_contact)
    {
        //phê duyệt hỗ trợ
        $t = ContactModel::find($id_contact);

        $t->status = $request->status;
        $t->save();
        // return response()
        //         ->json([
        //             'data' => $t,
        //             'status'=> true
        //         ]);
    }

    public function Contact_SelectNotApprove()
    {
        $Title = "Các hỗ trợ chưa phê duyệt";
        $Contact_SelectNotApprove = ContactModel::where('status', '=', '0');
        return response()
            ->json([
                'data' => $Contact_SelectNotApprove,
                'status' => true
            ]);
    }

    public function Contact_SelectApprove()
    {
        $Title = "Các hỗ trợ đã phê duyệt";
        $Contact_SelectApprove = ContactModel::where('status', '=', '1');
        return response()
            ->json([
                'data' => $Contact_SelectApprove,
                'status' => true
            ]);
    }
}

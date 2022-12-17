<?php

namespace App\Http\Controllers;

use App\Mail\BillAlert;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Bill as Bill;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class BillController extends Controller
{
    public function show()
    {
        $data = Bill::all();
        return response()
            ->json([
                'status' => true,
                'data' => $data,
            ]);
    }
    public function show_id_bill(Request $request, $id)
    {
        $data = DB::table('bill')
            ->join('room_number', 'bill.id_roomNumber', '=', 'room_number.id')
            ->join('users', 'users.id_user', '=', 'room_number.id_user_two')
            ->where('bill.id_roomNumber', '=', $id)
            ->get();
        return response()
            ->json([
                'status' => true,
                'data' => $data,
            ]);
    }
    public function sum_bill(Request $request)
    {
        $data = Bill::groupBy('id_roomNumber')->sum('all_money');
        return response()
            ->json([
                'status' => true,
                'data' => $data,
            ]);
    }
    public function show_id(Request $request, $id)
    {
        $data = DB::table('bill')
            ->join('room_number', 'bill.id_roomNumber', '=', 'room_number.id')
            ->join('post', 'post.id_post', '=', 'room_number.id_post')
            ->where('room_number.id', '=', $id)
            ->get();
        return response()
            ->json([
                'status' => true,
                'data' => $data,
            ]);
    }
    public function created_at(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'water_money' => 'required',
            'electricity_money' => 'required',
            'all_money' => 'required',
            'id_roomNumber' => 'required'
        ], [
            'water_money.required' => 'Không được bỏ trống',
            'electricity_money.required' => 'Không được bỏ trống',
            'all_money.required' => 'Không được bỏ trống',
            'id_roomNumber.required' => 'Không được bỏ trống',
        ]);
        if ($validation->fails()) {
            return response()
                ->json([
                    'messages' =>  $validation->messages(),
                    'status' => false
                ]);
        }
        $Bill = new Bill();
        $Bill->water_money = $request->water_money;
        $Bill->electricity_money = $request->electricity_money;
        $Bill->all_money = $request->all_money;
        $Bill->id_roomNumber = $request->id_roomNumber;
        $Bill->save();

        $data_bill = DB::table('bill')
            ->join('room_number', 'bill.id_roomNumber', '=', 'room_number.room_number')
            ->join('users', 'users.id_user', '=', 'room_number.id_user_two')
            ->join('post', 'post.id_post', '=', 'room_number.id_post')
            ->select('bill.water_money', 'bill.electricity_money', 'bill.all_money', 'bill.id_roomNumber', 'users.full_name', 'post.room_price', 'users.email')
            ->orderBy('bill.id','DESC')
            ->first();
        if ($data_bill) {

            Mail::to($data_bill->email)->send(new BillAlert($data_bill));
        }
        return response()
            ->json([
                'data' =>  $data_bill,
                'status' => true
            ]);
    }
    public function update(Request $request, $id)
    {
        $validation = Validator::make($request->all(), [
            'water_money_edit' => 'required',
            'electricity_money_edit' => 'required',
            'all_money_edit' => 'required',
        ], [
            'water_money_edit.required' => 'Không được bỏ trống',
            'electricity_money_edit.required' => 'Không được bỏ trống',
            'all_money_edit.required' => 'Không được bỏ trống',
        ]);
        if ($validation->fails()) {
            return response()
                ->json([
                    'messages' =>  $validation->messages(),
                    'status' => false
                ]);
        }
        $Bill = Bill::where('id_roomNumber', '=', $request->id)->first();
        $Bill->water_money = $request->water_money_edit;
        $Bill->electricity_money = $request->electricity_money_edit;
        $Bill->all_money = $request->all_money_edit;
        $Bill->save();
        return response()
            ->json([
                'data' =>  $Bill,
                'status' => true,
            ]);
    }
    public function delete(Request $request, $id)
    {
        $Bill = Bill::find($id);
        $Bill->delete();
        return response()
            ->json([
                'data' =>  $Bill,
                'status' => true
            ]);
    }

    public function getDataBillUser(Request $request, $id)
    {

        $Bill = DB::table('bill')
            ->join('room_number', 'bill.id_roomNumber', '=', 'room_number.id')
            ->select('bill.id', 'bill.electricity_money', 'bill.water_money', 'bill.all_money', 'bill.created_at', 'bill.updated_at')
            ->where('room_number.id_user_two', '=', $id);
        if ($request->start_date) {
            $Bill = $Bill->where('bill.created_at', '>=', [Carbon::createFromFormat('Y-m-d', $request->start_date)->startOfDay()->toDateTimeString()]);
        }
        if ($request->end_date) {
            $Bill = $Bill->where('bill.created_at', '<=', [Carbon::createFromFormat('Y-m-d', $request->end_date)->startOfDay()->toDateTimeString()]);
        }
        $Bill = $Bill->get();
        return response()
            ->json([
                'data' =>  $Bill,
                'status' => true,
                'start_date' => $request->start_date
            ]);
    }

    public function getDataBillDetailUser(Request $request, $id)
    {
        $Bill = DB::table('bill')
            ->join('room_number', 'bill.id_roomNumber', '=', 'room_number.id')
            ->join('post', 'post.id_post', '=', 'room_number.id_post')
            ->join('users', 'users.id_user', 'room_number.id_user_two')
            ->where('room_number.id_user_two', '=', $request->id_user)
            // ->where('bill.id', '=', $id)
            ->first();
        return response()
            ->json([
                'data' =>  $Bill,
                'status' => true,
                // 'user' => $request->id_user
            ]);
    }
}

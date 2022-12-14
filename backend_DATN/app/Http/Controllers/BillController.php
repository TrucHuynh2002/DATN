<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Bill as Bill;
use Illuminate\Support\Facades\Validator;

class BillController extends Controller
{
    public function show()
    {
        $data = Bill::all();
        return response()
            ->json([
                'data' => $data,
                'status' => true
            ]);
    }
    public function show_id(Request $request, $id)
    {
        $data = DB::table('bill')
            ->join('room_number', 'bill.id_roomNumber', '=', 'room_number.id')
            ->join('post', 'post.id_post', '=', 'room_number.id_post')
            ->where('bill.id_roomNumber', '=', $id);
        return response()
            ->json([
                'data' => $data,
                'status' => true
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
        return response()
            ->json([
                'data' =>  $Bill,
                'status' => true
            ]);
    }
    public function update(Request $request, $id)
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
        $Bill = Bill::find($id);
        $Bill->water_money = $request->water_money;
        $Bill->electricity_money = $request->electricity_money;
        $Bill->all_money = $request->all_money;
        $Bill->save();
        return response()
            ->json([
                'data' =>  $Bill,
                'status' => true
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
}

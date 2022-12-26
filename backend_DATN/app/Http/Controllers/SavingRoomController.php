<?php

namespace App\Http\Controllers;

use App\Models\SavingRoomModel;
use Illuminate\Http\Request;

class SavingRoomController extends Controller
{
    public function checkOldOwnerRoom(Request $request, $id_user){
        $checkOldOwner = SavingRoomModel::where('id_user','=',$id_user);
        if($request->id_room){

            $checkOldOwner = $checkOldOwner->where('id_room','=',$request->id_room);
        }
        $checkOldOwner = $checkOldOwner->first();
        if($checkOldOwner){
        return response()->json([
            'status' => true,
            'data' => $checkOldOwner,
            'post' => $request->id_room,
            // 'post' => $id_user,
        ]);
    }else{
        return response()->json([
            'status' => false,
            'data' => $checkOldOwner,
            'post' => $request->id_room,
            'post' => $id_user,
        ]);
  
        }
    }
}

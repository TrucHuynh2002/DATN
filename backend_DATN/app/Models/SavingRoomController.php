<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Request;

class SavingRoomController extends Model
{
    use HasFactory;
    public function checkOldOwnerRoom(Request $request, $id_user){
        $checkOldOwner = SavingRoomModel::where('id_user','=',$id_user)->first();
        return response()->json([
            'status' => true,
            'data' => $checkOldOwner
        ]);
    }
}

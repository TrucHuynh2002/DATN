<?php

namespace App\Http\Controllers;

use App\Models\ReactionModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReactionController extends Controller
{
    public function addLoveReaction(Request $request){
        $reactionLove = new ReactionModel();
        $reactionLove->id_user = $request->id_user;
        $reactionLove->id_qa = $request->id_qa;
        $reactionLove->type_reaction = "love";
        $reactionLove->save();
        return response()->json([
            'status' => true,
            'data' => $reactionLove
        ]);
    }
    public function editLoveReaction(Request $request,$id){
        $reactionLove = ReactionModel::where('id_qa','=',$id)->where('id_user','=',$request->id_user)->first();
        if($reactionLove){
            $reactionLove->delete();
        }
        return response()->json([
            'status' => true,
            'data' => $reactionLove
        ]);
    }

    public function getLoveReaction(Request $request){
        // $data = ReactionModel::groupBy('id','id_qa','id_user')->get();
        $data = DB::table('reaction')->select('*',DB::raw("count(*) as reactionQa"))->groupBy('id_qa')->get();
        $dataReactionUser = DB::table('reaction')->get();
        return response()->json([
            'status' => true,
            'data' => $data,
            'userReaction' =>  $dataReactionUser 
        ]);
    }
}

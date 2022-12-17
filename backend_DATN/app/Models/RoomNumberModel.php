<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoomNumberModel extends Model
{
    use HasFactory;
    protected $table = "room_number";
    protected $primaryKey = 'id';
    protected $fillable = [
        'id_post',
        'id_user',
        'id_user_two',
        'status',
        'room_number',
        'check_room'
    ];
    const CREATED_AT = NULL;
    const UPDATED_AT = NULL;
}

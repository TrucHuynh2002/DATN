<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoomNumberModel extends Model
{
    use HasFactory;
    protected $table = "room_number";
    protected $primaryKey = 'id';
    // public $timestamps = true;
    // public $dateFormat = 'dd/mm/yyyy H:i:s';
    protected $fillable = [
        'id_post',
        'id_user',
        'id_user_tow',
        'status',
        'interaction'
    ];
}

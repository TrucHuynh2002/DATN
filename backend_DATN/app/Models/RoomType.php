<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoomType extends Model
{
    protected $table = 'room_type';
    protected $primaryKey = 'id_room_type';
    // public $timestamps = true;
    protected $fillable = [
        'name_room_type'
    ];
}

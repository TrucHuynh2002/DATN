<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $table = 'post';
    protected $primaryKey = 'id_post';
    protected $fillable = [
        'post_name',
        'description_sort',
        'description',
        'area',
        'room_price',
        'electricity_price',
        'water_price',
        'address',
        'id_province',
        'id_district',
        'id_ward',
        'ifarme',
        'verification',
        'status',
        'quantity',
        'view',
        'delete',
        'id_user',
        'id_roomType'
    ];
}

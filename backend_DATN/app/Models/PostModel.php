<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostModel extends Model
{
    use HasFactory;
    protected $table = "post";
    protected $primaryKey = 'id_post';
    // public $timestamps = true;
    protected $fillable = [
        'post_name',
        'description_sort',
        'description',
        'area',
        'room_price',
        'electricity_price',
        'water_price',
        'address',
        'id_furniture',
        'verification',
        'status',
        'quality',
        'delete',
        'id_user',
        'id_roomType',
        'id_provice',
        'id_district',
        'id_ward',
    ];
}

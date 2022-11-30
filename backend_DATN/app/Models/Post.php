<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $table = 'post';
    protected $primaryKey = 'id_post';
    // public $timestamps = true;
    protected $fillable = [
        'post_name',
        'description_sort',
        'description',
        'meta_keywords',
        'area',
        'room_price',
        'electricity_price',
        'water_price',
        'address',
        // 'id_furniture',
        'meta_title',
        'meta_description',
        'verification',
        'status',
        'quantity',
        'delete',
        'id_user',
        'id_roomType'
    ];
}

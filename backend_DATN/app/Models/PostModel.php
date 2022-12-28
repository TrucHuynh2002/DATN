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
    // public $dateFormat = 'dd/mm/yyyy H:i:s';
    protected $fillable = [
        'post_name',
        'description_sort',
        'description',
        // 'meta_keywords',
        'area',
        'room_price',
        'electricity_price',
        'water_price',
        'address',
        'id_furniture',
        // 'meta_title',
        // 'meta_description',
        'verification',
        'status',
        'quality',
        'delete',
        'id_user',
        'id_roomType',
        'id_provice',
        'id_district',
        'id_ward',
        // 'id_street'
    ];
}

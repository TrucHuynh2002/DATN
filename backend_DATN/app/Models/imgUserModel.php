<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class imgUserModel extends Model
{
    use HasFactory;
    protected $table = 'img_user';
    protected $primaryKey = 'id_img_user';
    // public $timestamps = true;
    protected $fillable = [
        'id_user',
        'type_img_user',
        'name_img',
        'link_img_user',

    ];
}

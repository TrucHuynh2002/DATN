<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class imgUserModel extends Model
{
    use HasFactory;
    protected $table = 'img_user';
    protected $primaryKey = 'id_img_user';
    protected $fillable = [
        'type_img_user',
        'name_img',
        'link_img_user',
        'id_user',

    ];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class imgPost extends Model
{
    protected $table = 'img_post';
    protected $primaryKey = 'id_img_post';
    public $timestamps = true;
    protected $fillable = [
        'img_post_name',
        'type_img',
        'link_img_user',
        'id_post'
    ];
}

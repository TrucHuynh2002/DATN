<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    protected $table = 'blog';
    protected $primaryKey = 'id_blog';
    protected $fillable = [
        'name_blog',
        'meta_keywords',
        'description_sort',
        'description',
        'id_user',
        'view'
    ];
}

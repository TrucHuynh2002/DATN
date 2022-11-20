<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    protected $table = 'category';
    protected $primaryKey = 'id_category';
    public $timestamps = false;
    protected $fillable = [
        'name_blog',
        'meta_keywords	',
        'description_sort',
        'description'

    ];
}

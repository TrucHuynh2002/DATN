<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    protected $table = 'favorite';
    protected $primaryKey = 'id_favorite';
    public $timestamps = false;
    protected $fillable = [
        'id_post',
        'id_user',
        'status'
    ];
}

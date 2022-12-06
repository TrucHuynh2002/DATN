<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HeartFeeling extends Model
{
    protected $table = 'heart_feeling';
    protected $primaryKey = 'id_heart_feeling';
    // public $timestamps = true;
    protected $fillable = [
        'heart_feeling',
        'id_post',
        'id_user'
    ];
}

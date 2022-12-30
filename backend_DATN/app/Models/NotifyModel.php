<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NotifyModel extends Model
{
    use HasFactory;
    protected $table = "notify";
    protected $primaryKey = 'id_notify';
    // public $timestamps = true;
    protected $fillable = [
        'id_post',
        'id_user',
        'interaction',
        'id_user_tow',
        'status'
    ];
}

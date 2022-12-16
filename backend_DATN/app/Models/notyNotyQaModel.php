<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class notyNotyQaModel extends Model
{
    use HasFactory;
    protected $table = 'noty_notyqa';
    protected $primaryKey = 'id';
    // public $timestamps = false;
    protected $fillable = [
        'id_qa',
        'id_user',
        'id_user_two',
        'status',
        'interaction'
    ];
}

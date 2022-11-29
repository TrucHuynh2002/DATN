<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class furniture_post extends Model
{
    use HasFactory;
    protected $table = "furniture_post";
    protected $primaryKey = 'id_furniture_post';
    // public $timestamps = true;
    // public $dateFormat = 'dd/mm/yyyy H:i:s';
    protected $fillable = [
        'id_post',
        'id_furniture'
    ];
    CONST UPDATED_AT = NULL;
    CONST CREATED_AT = NULL;
}

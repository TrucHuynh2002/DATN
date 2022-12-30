<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProvinceModel extends Model
{
    use HasFactory;
    protected $table = 'province';
    protected $primaryKey = 'id_favorite';
    // public $timestamps = true;
    protected $fillable = [
        '_name',
        '_code',
    ];
}

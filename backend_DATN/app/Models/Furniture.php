<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Furniture extends Model
{
    protected $table = 'furniture';
    protected $primaryKey = 'id_furniture';
    public $timestamps = true;
    protected $fillable = [
        'name',
        'icon'
    ];
}

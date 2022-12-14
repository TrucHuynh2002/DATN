<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bill extends Model
{
    use HasFactory;
    protected $table = "bill";
    protected $primaryKey = 'id';
    protected $fillable = [
        'water_money',
        'electricity_money',
        'all_money',
        'id_roomNumber'
    ];
}

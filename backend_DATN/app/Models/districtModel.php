<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class districtModel extends Model
{
    protected $table = 'district';
    protected $primaryKey = 'id';
    protected $fillable = [
        '_name',
        '_prefix',
        '_province_id'
    ];
}

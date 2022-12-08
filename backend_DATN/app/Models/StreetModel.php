<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StreetModel extends Model
{
    protected $table = 'street';
    protected $primaryKey = 'id';
    protected $fillable = [
        '_name',
        '_prefix',
        '_province_id ',
        '_district_id '
    ];
}

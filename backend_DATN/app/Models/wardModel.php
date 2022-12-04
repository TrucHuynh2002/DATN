<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class wardModel extends Model
{
    protected $table = 'ward';
    protected $primaryKey = 'id';
    protected $fillable = [
        '_name',
        '_prefix',
        '_province_id ',
        '_district_id '
    ];
}

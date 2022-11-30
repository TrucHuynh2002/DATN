<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class View extends Model
{
    protected $table = 'view';
    protected $primaryKey = 'id_view';
    protected $fillable = [
        'view_index',
    ];
}

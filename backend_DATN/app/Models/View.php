<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class View extends Model
{
    protected $table = 'view_index';
    protected $primaryKey = 'id_view_index';
    protected $timestamp = true;
    protected $fillable = [
        'view_index',
    ];
}

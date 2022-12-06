<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class search_trendsModel extends Model
{
    protected $table = 'search_trends';
    protected $primaryKey = 'id_search';
    public $timestamps = false;
    protected $fillable = [
        'key_word',
        'view'
    ];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ConfigModel extends Model
{
    use HasFactory;
    protected $table = "config";
    protected $primaryKey = 'id_config';
    public $timestamps = false;
    protected $fillable = [
        'logo',
        'sdt',
        'email',
        'address',
        'title',
        'introduce'
    ];
}

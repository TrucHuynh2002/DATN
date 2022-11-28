<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ConfigModel extends Model
{
    use HasFactory;
    protected $table = "config";
    protected $primaryKey = 'id_config';
    public $timestamps = true;
    // public $dateFormat = 'dd/mm/yyyy H:i:s';
    protected $fillable = [
        'logo',
        'sdt',
        'email',
        'address',
        'title'
    ];
}

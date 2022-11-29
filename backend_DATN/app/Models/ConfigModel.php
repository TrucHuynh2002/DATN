<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ConfigModel extends Model
{
    use HasFactory;
    protected $table = "config";
    protected $primaryKey = 'id_config';
<<<<<<< HEAD
    public $timestamps = false;
=======
    // public $timestamps = true;
>>>>>>> 7e1d310e9686993304c6ab14f331e6313e59b79f
    // public $dateFormat = 'dd/mm/yyyy H:i:s';
    protected $fillable = [
        'logo',
        'sdt',
        'email',
        'address',
        'title',
        'introduce'
    ];
}

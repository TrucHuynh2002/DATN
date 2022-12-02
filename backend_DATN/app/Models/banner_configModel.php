<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class banner_configModel extends Model
{
    use HasFactory;
    protected $table = "banner_config";
    protected $primaryKey = 'id_banner_config';
    // public $timestamps = false;
    // public $dateFormat = 'dd/mm/yyyy H:i:s';
    protected $fillable = [
        'id_config',
        'link_img_banner',
        'name_banner'
    ];
}

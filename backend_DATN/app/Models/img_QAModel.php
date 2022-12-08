<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class img_QAModel extends Model
{
    protected $table = 'img_qa';
    protected $primaryKey = 'id_img_qa';
    public $timestamps = false;
    protected $fillable = [
        'id_qa',
        'link_img_qa',
    ];
}

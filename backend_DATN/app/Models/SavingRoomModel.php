<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SavingRoomModel extends Model
{
    use HasFactory;
    protected $table = 'saving_room';
    protected $primaryKey = 'id_saving';
    public $timestamps = true;
    protected $fillable = [
        'id_user',
        'id_room',
        // 'id_img_qa',
    ];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class comment_QAModel extends Model
{
    protected $table = 'comment_qa';
    protected $primaryKey = 'id_comment_qa';
    public $timestamps = false;
    // public $dateFormat = 'dd/mm/yyyy H:i:s';
    protected $fillable = [
        'content',
        'id_user',
        'id_qa',
        'parent_id'
    ];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QAModel extends Model
{
    protected $table = 'qa';
    protected $primaryKey = 'id_qa';
    public $timestamps = false;
    protected $fillable = [
        'id_user',
        'id_comment_qa',
        'content',
        'parent_id'
    ];
}

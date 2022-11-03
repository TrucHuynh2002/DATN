<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CommentModel extends Model
{
    protected $table = 'comment';
    protected $primaryKey = 'id_comment';
    public $timestamps = false;
    // public $dateFormat = 'dd/mm/yyyy H:i:s';
    protected $fillable = [
    'content',
    'date',
    'status',
    'id_user',
    'updated_at',
    'created_at'
    ];
}

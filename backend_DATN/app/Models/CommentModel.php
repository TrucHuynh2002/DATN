<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class CommentModel extends Model
{
    use Notifiable;
    protected $table = 'comment';
    protected $primaryKey = 'id_comment';
    // public $timestamps = true;
    protected $fillable = [
        'content',
        'status',
        'id_user',
        'id_post'
    ];
}

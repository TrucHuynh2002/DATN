<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NotificationModel extends Model
{
    use HasFactory;
    protected $table = 'notifications';
    protected $fillable = [
        'read_at',
        'type',
        'notifiable_type',
        'data'
    ];
}

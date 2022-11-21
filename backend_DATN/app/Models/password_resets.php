<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class password_resets extends Model
{
    use HasFactory;
    protected $fillable = [
        'email',
        'token'
    ];
    CONST UPDATED_AT = NULL;
}

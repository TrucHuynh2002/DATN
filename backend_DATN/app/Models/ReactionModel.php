<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReactionModel extends Model
{
    use HasFactory;
    protected $table = 'reaction';
    protected $fillable = [
        'id_user',
        'id_qa',
        'type_reaction',
    ];
}

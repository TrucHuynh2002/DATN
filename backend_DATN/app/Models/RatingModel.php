<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RatingModel extends Model
{
    use HasFactory;
    protected $table = "post_rate";
    protected $primaryKey = 'id_post_rate';
    public $timestamps = false;
    // public $dateFormat = 'dd/mm/yyyy H:i:s';
    protected $fillable = [
    'rate',
    'id_post',
    'id_comment'
    ];
}
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactModel extends Model
{
    protected $table = 'contact';
    protected $primaryKey = 'id_contact';
    public $timestamps = true;
    // public $dateFormat = 'dd/mm/yyyy H:i:s';
    protected $fillable = [
        'full_name',
        'subject',
        'email',
        'phone',
        'content',
        'status',
        'updated_at',
        'created_at'
    ];
}

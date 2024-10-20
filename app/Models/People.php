<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class People extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'surname',
        'id_number',
        'mobile',
        'email',
        'birth_date',
        'language',
        'interests',
    ];

    protected $casts = [
        'interests' => 'array', // Automatically handles JSON encoding/decoding
    ];
}

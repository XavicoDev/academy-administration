<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Administrator extends Model
{
    use HasFactory;
    protected $fillable = [
        'first_name',
        'last_name',
        'mail',
        'password',
    ];

    public static $rules = [
        'first_name' => 'required|string|max:100',
        'last_name' => 'required|string|max:100',
        'mail' => 'required|email|unique:administradores,email',
        'password' => 'required|string|min:8|confirmed|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/',
    ];
}

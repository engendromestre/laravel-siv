<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Patient extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $dates = ['birthDate', 'deleted_at'];
    protected $fillable = ['register', 'name', 'birthDate', 'motherName', 'gender', 'status', 'photo'];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Patient extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $dates = ['birth_date', 'deleted_at'];
    protected $fillable = ['register', 'name', 'birth_date', 'mother_name', 'gender', 'status', 'photo'];

    public function admissions()
    {
        return $this->hasMany(PatientAdmission::class);
    }
}

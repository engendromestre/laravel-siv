<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class PatientAdmission extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'patient_id',
        'admission_date',
        'discharge_date',
        'reason_for_admission'
    ];

    protected $dates = [
        'admission_date' => 'date',
        'discharge_date' => 'date',
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class); // Define a chave estrangeira 'patient_id'
    }
}

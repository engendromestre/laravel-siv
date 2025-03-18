<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Admission extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'patient_id',
        'admission_datetime',
        'discharge_datetime',
        'reason_for_admission',
        'user_id',
    ];

    protected $dates = [
        'admission_datetime',  // Corrigido para 'admission_datetime' como datetime
        'discharge_datetime',
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class); // Define a chave estrangeira 'patient_id'
    }
}

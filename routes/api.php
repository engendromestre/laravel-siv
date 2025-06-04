<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\PatientController;

Route::get('/patients/admitted', [PatientController::class, 'getAdmittedPatients'])
    ->name('patients.admitted');

Route::get('/ping', function () {
    return response()->json(['message' => 'pong']);
});
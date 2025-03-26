<?php

use App\Http\Controllers\Auth\SocialiteProviderController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Auth\PasswordController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\Admin\{PatientController};
use App\Http\Controllers\Admin\{AdmissionController};

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::prefix('auth')->group(function () {
    Route::get('/{provider}/redirect', [SocialiteProviderController::class, 'redirect'])
        ->name('social.redirect');

    Route::get('/{provider}/callback', [SocialiteProviderController::class, 'callback'])
        ->name('social.callback');
});

Route::get('/password-rules', [PasswordController::class, 'getPasswordRules'])->name('password.rules');

Route::get('/guest/pending', function () {
    return Inertia::render('Auth/PendingRole');
})->name('guest.page');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified', 'has.role'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/patient', [PatientController::class, 'index'])->name('patient.index');
    Route::get('/patients', [PatientController::class, 'search'])->name('patients.search');
    Route::get('/patients/non-admitted', [PatientController::class, 'searchByStatusInactive'])->name('patients.non-admitted');
    Route::get('/patient/create', [PatientController::class, 'create'])->name('patient.create');
    Route::get('/patient/edit/{id}', [PatientController::class, 'edit'])->name('patient.edit');
    Route::get('/patients/{id}', [PatientController::class, 'show'])->name('patient.show');

    Route::post('/patient/uploadPhoto', [PatientController::class, 'uploadPhoto'])->name('patient.uploadPhoto');
    Route::post('/patient', [PatientController::class, 'store'])->name('patient.store');
    Route::put('/patient/{id}', [PatientController::class, 'update'])->name('patient.update');
    Route::delete('/patient/{id}', [PatientController::class, 'destroy'])->name('patient.destroy');

    Route::get('/admission', [AdmissionController::class, 'index'])->name('admission.index');
    Route::get('/admissions', [AdmissionController::class, 'list'])->name('admissions.list');
    Route::get('/admission/create', [AdmissionController::class, 'create'])->name('admission.create');
    Route::get('/admission/patient/create', [AdmissionController::class, 'createPatient'])->name('admission.patient.create');
    Route::get('/admission/edit/{id}', [AdmissionController::class, 'edit'])->name('admission.edit');
    Route::get('/admissions/{id}', [AdmissionController::class, 'show'])->name('admission.show');

    // Criação do paciente durante o processo de admissão
    Route::post('/admission/patient/store', [AdmissionController::class, 'storePatient'])->name('admission.patient.store');
    Route::post('/admission', [AdmissionController::class, 'store'])->name('admission.store');
    Route::patch('/admission', [AdmissionController::class, 'update'])->name('admission.update');
    Route::delete('/admission/{id}', [AdmissionController::class, 'destroy'])->name('admission.destroy');
});

Route::post('/keep-alive', function () {
    Session::put('last_activity', now()); // Atualiza a sessão
    // // Retorna uma resposta Inertia para evitar o erro
    // return Inertia::location(route('dashboard')); // Redireciona para a mesma página
})->middleware('auth')->name('keep-alive');

require __DIR__ . '/auth.php';

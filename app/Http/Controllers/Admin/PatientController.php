<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Patient;
use Inertia\Inertia;

class PatientController extends Controller
{
    public function index(Patient $patient)
    {
        return Inertia::render('Admin/Patients/Index');
    }

    public function create()
    {
        return Inertia::render('Admin/Patients/Create');
    }
}

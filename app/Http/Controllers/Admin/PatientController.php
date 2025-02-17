<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Patient;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PatientController extends Controller
{
    public function index(Request $request)
    {
        $query = Patient::query();
        $data = $query->paginate($request->get('perPage', 10))->appends($request->query());
        return Inertia::render(
            'Admin/Patients/Index',
            [
                'patientList' => $data,
                'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
                'status' => session('status'),
            ]
        );
    }

    public function create()
    {
        return Inertia::render('Admin/Patients/Create');
    }
}

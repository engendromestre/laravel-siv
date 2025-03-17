<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\PatientService;
use App\Services\Admin\AdmissionService;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class AdmissionController extends Controller
{
    protected $patientService;
    protected $admissionService;

    /**
     * Constructor to inject dependencies.
     *
     * @param PatientService $patientService The service for handling patient-related operations.
     * @param AdmissionService $admissionService The service for handling admission-related operations.
     */
    public function __construct(PatientService $patientService, AdmissionService $admissionService)
    {
        $this->patientService = $patientService;
        $this->admissionService = $admissionService;
    }

    public function index(): Response
    {
        return Inertia::render('Admin/Admission/Index');
    }

    public function list(Request $request): Response
    {
        $admissions = $this->admissionService->getAdmissions($request->all());
        return Inertia::render('Admin/Admission/List', [
            'data' => $admissions,
        ]);
    }

    public function createPatient(): Response
    {
        return Inertia::render('Admin/Admission/Partials/CreatePatient');
    }

    /**
     * Cria um novo paciente.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function storePatient(Request $request): Response
    {
        $this->patientService->createPatient($request);
        return Inertia::render('Admin/Admission/Partials/CreatePatient');
    }

    /**
     * Performs patient admission
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request): RedirectResponse
    {
        $this->admissionService->createAdmission($request);
        return Redirect::route('admission.index');
    }

    /**
     * Performs patient admission
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request): RedirectResponse
    {
        $this->admissionService->updateAdmission($request);
        return Redirect::route('admissions.list');
    }
}

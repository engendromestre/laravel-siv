<?php

namespace App\Http\Controllers\Admin;

use App\Models\Admission;
use App\Http\Controllers\Controller;
use App\Services\Admin\PatientService;
use App\Services\Admin\AdmissionService;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Redis;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Inertia\Inertia;
use Inertia\Response;
use App\Events\AdmissionCreated;

class AdmissionController extends Controller
{
    use AuthorizesRequests;

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
        $this->authorize('admin admissions:read', Admission::class);
        return Inertia::render('Admin/Admission/Index');
    }

    public function list(Request $request): Response
    {
        $this->authorize('admin admissions:read', Admission::class);
        $admissions = $this->admissionService->getAdmissions($request->all());
        return Inertia::render('Admin/Admission/List', [
            'data' => $admissions,
        ]);
    }

    public function createPatient(): Response
    {
        $this->authorize('admin admissions:create', Admission::class);
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
        $this->authorize('admin admissions:create', Admission::class);
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
        $this->authorize('admin admissions:create', Admission::class);
        $this->admissionService->createAdmission($request);
        // Simulando dados do paciente/admissão
        $payload = [
            'id' => 123,
            'name' => 'João da Silva',
            'admitted_at' => now()->toISOString(),
        ];

        // Envia para o canal Redis
        Redis::publish('admission:new', json_encode($payload));
        return Redirect::route('admission.index');
    }

    public function storeEvent(Request $request): RedirectResponse
    {
        $patient = [
            'id' => 1,
            'name' => 'João da Silva',
            'gender' => 'male',
            'admitted_at' => now(),
        ];

        event(new AdmissionCreated($patient));

        return response()->json(['message' => 'Admissão registrada!']);
    }

    /**
     * Performs patient admission
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request): RedirectResponse
    {
        $this->authorize('admin admissions:write', Admission::class);
        $this->admissionService->updateAdmission($request);
        Redis::publish('admission:discharged', json_encode(['id' => 123]));
        return Redirect::route('admissions.list');
    }
}

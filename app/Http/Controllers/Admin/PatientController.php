<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\PatientService;
use App\Repositories\PatientRepository;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class PatientController extends Controller
{
    protected $patientService;
    protected $patientRepository;

    public function __construct(PatientService $patientService, PatientRepository $patientRepository)
    {
        $this->patientService = $patientService;
        $this->patientRepository = $patientRepository;
    }

    public function index(Request $request)
    {
        $patients = $this->patientService->getPatients($request->all());
        return Inertia::render('Admin/Patient/Index', [
            'data' => $patients,
        ]);
    }

    public function show(Request $request): JsonResponse
    {
        $patient = $this->patientRepository->findPatientById($request->route('id'));
        return response()->json($patient);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Patient/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'register'      => 'required|string|max:9|unique:patients',
            'name'          => 'required|string|max:255',
            'birth_date'    => 'required|date',
            'mother_name'   => 'required|string|max:255',
            'gender'        => 'required|in:m,f',
            'photo'         => 'required|image|mimes:jpeg,png,jpg|max:3072',

        ]);
        $validated['status'] = 'i'; // Define status as 'i' (inactive) by default

        $this->patientService->createPatient($validated, $request->file('photo'));

        return Redirect::route('patient.create');
    }

    public function edit(Request $request): Response
    {
        $patient = $this->patientRepository->findPatientById($request->route('id'));
        return Inertia::render('Admin/Patient/Edit', [
            'patient' => $patient,
        ]);
    }

    public function update(Request $request, $id): RedirectResponse
    {
        $validated = $request->validate([
            'register'   => [
                'required',
                'string',
                'max:9',
                Rule::unique('patients', 'register')->ignore($id),
            ],
            'name'          => 'required|string|max:255',
            'birth_date'    => 'required|date',
            'mother_name'   => 'required|string|max:255',
            'gender'        => 'required|in:m,f',
            'status'        => 'required|in:a,i',
            'photo'         => 'nullable|image|mimes:jpeg,png,jpg|max:3072',
        ]);

        $this->patientService->updatePatient($validated, $id);
        return Redirect::route('patient.edit', ['id' => $id]);
    }

    public function destroy($id): RedirectResponse
    {
        $this->patientService->deletePatient($id);
        return Redirect::route('patient.index');
    }

    public function uploadPhoto(Request $request)
    {
        $response = $this->patientService->uploadPhoto($request);
        return response()->json($response);
    }


    // Método para buscar pacientes com filtros
    public function search(Request $request): JsonResponse
    {
        // Obtém os filtros da requisição, incluindo 'search' (query de pesquisa), 'sortField', 'sortOrder', 'perPage'
        $filters = $request->only(['search', 'sortField', 'sortOrder', 'perPage']);

        // Chama o método getPatients do PatientService
        $patients = $this->patientService->getPatients($filters);

        // Retorna os pacientes encontrados em formato JSON
        return response()->json($patients);
    }

    public function searchByStatusInactive(Request $request): JsonResponse
    {
        $filters = $request->only(['search', 'sortField', 'sortOrder', 'perPage']);
        $patientsInactives = $this->patientService->getPatientsByStatusInactive($filters);
        return response()->json($patientsInactives);
    }

    /**
     * Retorna os pacientes admitidos.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAdmittedPatients(Request $request)
    {
        $gender = $request->query('gender');
        return response()->json($this->patientService->getAdmittedPatients($gender));
    }

}
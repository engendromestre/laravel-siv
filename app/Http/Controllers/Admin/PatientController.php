<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\PatientService;
use App\Repositories\PatientRepository;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
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

    public function create()
    {
        return Inertia::render('Admin/Patient/Create');
    }

    public function edit(Request $request): Response
    {
        $patient = $this->patientRepository->findPatientById($request->route('id'));
        return Inertia::render('Admin/Patient/Edit', [
            'patient' => $patient,
        ]);
    }

    public function show(Request $request): JsonResponse
    {
        $patient = $this->patientRepository->findPatientById($request->route('id'));
        return response()->json($patient);
    }


    public function store(Request $request)
    {
        $this->patientService->createPatient($request);
        return Redirect::route('patient.create');
    }

    public function update(Request $request, $id): RedirectResponse
    {
        $this->patientService->updatePatient($request, $id);
        return Redirect::route('patient.edit', ['id' => $id]);
    }

    public function destroy($id): RedirectResponse
    {
        $this->patientService->deletePatient($id);
        return Redirect::route('patient.index');
    }

    public function uploadPhoto(Request $request): JsonResponse
    {
        try {
            $photoPath = $this->patientService->uploadPhoto($request);
            return response()->json([
                'photoPath' => asset("storage/" . $photoPath),
                'photoRelativePath' => "storage/" . $photoPath,
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erro ao salvar a imagem'], 500);
        }
    }
}

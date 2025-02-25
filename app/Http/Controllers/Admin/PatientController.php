<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Patient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class PatientController extends Controller
{
    public function index(Request $request)
    {
        $query = Patient::query();
        // Ordenação
        if ($request->has('sortField') && $request->has('sortOrder')) {
            $query->orderBy($request->sortField, $request->sortOrder);
        }
        // Filtragem
        if ($request->has('search') && !empty($request->search)) {
            $search = $request->search;
            $query->where(function (Builder $q) use ($search) {
                $q->where('register', 'like', "%$search%")
                    ->orWhere('name', 'like', "%$search%")
                    ->orWhere('motherName', 'like', "%$search%")
                    ->orWhere('status', 'like', "%$search%");
            });
        }

        // Paginação
        $patients = $query->paginate($request->input('perPage', 5))->appends($request->query());

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
        $patientId = $request->route('id');
        $patient = Patient::findOrFail($patientId);
        return Inertia::render('Admin/Patient/Edit', [
            'patient' => [
                'id' => $patient->id,
                'register' => $patient->register,
                'name' => $patient->name,
                'gender' => $patient->gender,
                'birthDate' => $patient->birthDate,
                'motherName' => $patient->motherName,
                'status' => $patient->status,
                'photo' => $patient->photo
            ],
        ]);
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'register'   => 'required|string|max:9|unique:patients,register',
            'name'       => 'required|string|max:255',
            'birthDate'  => 'required|date',
            'motherName' => 'required|string|max:255',
            'gender'     => 'required|in:m,f',
            'status'     => 'required|in:a,i',
            'photo'      => 'nullable|string',
        ]);

        try {
            DB::beginTransaction();

            $patient = Patient::create($validated);

            DB::commit(); // 🔥 Confirma a transação
        } catch (\Exception $e) {
            DB::rollBack(); // ❌ Reverte se falhar
            Storage::disk('public')->delete($request->photoPath);
        }

        return Redirect::route('patient.create');
    }


    public function uploadPhoto(Request $request): JsonResponse
    {
        $request->validate([
            'photo' => 'required|image|mimes:jpeg,png,jpg|max:3072',
            'id' => 'nullable|exists:patients,id', // O ID é opcional, mas se enviado, deve existir
        ]);

        try {
            $photoPath = null;
            $patient = null;


            if ($request->has('id')) {
                $patient = Patient::findOrFail($request->id);

                // Se o paciente já tiver uma foto, apagar do storage
                if ($patient->photo) {
                    // Deleta a foto do storage
                    $photoPath = str_replace('storage/', '', $patient->photo);
                    Storage::disk('public')->delete($photoPath);
                }
            }

            if ($request->hasFile('photo')) {
                $photoPath = $request->file('photo')->store('patients', 'public');
            }
            return response()->json([
                'photoPath' => asset("storage/" . $photoPath),
                'photoRelativePath' => "storage/" . $photoPath // 🔹 Caminho relativo para salvar no banco
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erro ao salvar a imagem'], 500);
        }
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
            'name'       => 'required|string|max:255',
            'birthDate'  => 'required|date',
            'motherName' => 'required|string|max:255',
            'gender'     => 'required|in:m,f',
            'status'     => 'required|in:a,i',
            'photo'      => 'required|string',
        ]);

        try {
            DB::beginTransaction();

            $patient = Patient::findOrFail($id);

            // Se foi enviada uma nova foto, removemos a antiga
            if ($request->photo && $request->photo !== $patient->photo) {
                if ($patient->photo) {
                    Storage::disk('public')->delete($patient->photo);
                }
            }

            $patient->update($validated);

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            Storage::disk('public')->delete($request->photo);
        }

        return Redirect::route('patient.edit', ['id' => $id]);
    }

    public function destroy($id): RedirectResponse
    {
        try {
            $patient = Patient::findOrFail($id);

            // 🔹 Verifica se o paciente tem uma foto antes de tentar deletá-la
            if ($patient->photo && Storage::disk('public')->exists($patient->photo)) {
                Storage::disk('public')->delete($patient->photo);
            }

            $patient->delete();

            return Redirect::route('patient.index')->with('success', 'Paciente deletado com sucesso!');
        } catch (\Exception $e) {
            return Redirect::route('patient.index')->with('error', 'Erro ao deletar paciente!');
        }
    }
}

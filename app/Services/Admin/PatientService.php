<?php

/**
 * @package App\Services\Admin
 * @author Paulo Oliveira <https://github.com/engendromestre>
 */

namespace App\Services\Admin;

use App\Models\Patient;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

/**
 * Class PatientService
 * @package App\Services\Admin
 */
class PatientService
{
    /**
     * @param array $filters
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     * @throws \Exception
     */
    public function getPatients(array $filters)
    {
        $query = Patient::query();

        // Ordenação
        if (isset($filters['sortField']) && isset($filters['sortOrder'])) {
            $query->orderBy($filters['sortField'], $filters['sortOrder']);
        }

        // Filtragem
        if (isset($filters['search']) && !empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('register', 'like', "%$search%")
                    ->orWhere('name', 'like', "%$search%")
                    ->orWhere('mother_name', 'like', "%$search%")
                    ->orWhere('status', 'like', "%$search%");
            });
        }

        return $query->paginate($filters['perPage'] ?? 5);
    }

    /**
     * @return Patient
     * @throws \Exception
     */
    public function createPatient(Request $request)
    {
        $validated = $request->validate([
            'register'   => 'required|string|max:9|unique:patients,register',
            'name'       => 'required|string|max:255',
            'birth_date'  => 'required|date',
            'mother_name' => 'required|string|max:255',
            'gender'     => 'required|in:m,f',
            'status'     => 'required|in:a,i',
            'photo'      => 'nullable|string',
        ]);

        DB::beginTransaction();
        try {
            Patient::create($validated);
            DB::commit();
            return;
        } catch (\Exception $e) {
            DB::rollBack();
            PatientService::deletePhoto($request->photoPath);
            throw new \Exception('Erro ao criar paciente');
        }
    }

    /**
     * @param int $id
     * @param array $data
     * @return Patient
     * @throws \Exception
     */
    public function updatePatient(Request $request, $id)
    {
        $validated = $request->validate([
            'register'   => [
                'required',
                'string',
                'max:9',
                Rule::unique('patients', 'register')->ignore($id),
            ],
            'name'       => 'required|string|max:255',
            'birth_date'  => 'required|date',
            'mother_name' => 'required|string|max:255',
            'gender'     => 'required|in:m,f',
            'status'     => 'required|in:a,i',
            'photo'      => 'required|string',
        ]);

        DB::beginTransaction();
        try {
            $patient = Patient::findOrFail($id);

            // Se foi enviada uma nova foto, removemos a antiga
            if ($request->photo !== $patient->photo) {
                if ($patient->photo) {
                    Storage::disk('public')->delete($patient->photo);
                }
            }

            $patient->update($validated);
            DB::commit();
            return $patient;
        } catch (\Exception $e) {
            DB::rollBack();
            throw new \Exception('Erro ao atualizar paciente');
        }
    }

    /**
     * @param int $id
     * @throws \Exception
     */
    public function deletePatient(int $id): void
    {
        try {
            $patient = Patient::findOrFail($id);

            if ($patient->photo && Storage::disk('public')->exists($patient->photo)) {
                PatientService::deletePhoto($patient->photo);
            }

            // Deleta o paciente usando o soft delete (vai marcar a data no campo deleted_at)
            $patient->delete();
        } catch (\Exception $e) {
            throw new \Exception('Erro ao deletar paciente');
        }
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @return string|null
     * @throws \Exception
     */
    public function uploadPhoto(Request $request): string
    {
        $request->validate([
            'photo' => 'required|image|mimes:jpeg,png,jpg|max:3072',
            'id' => 'nullable|exists:patients,id', // O ID é opcional, mas se enviado, deve existir
        ]);

        $photoPath = null;
        try {
            if ($request->has('id')) {
                $patient = Patient::findOrFail($request->id);

                if ($patient->photo) {
                    PatientService::deletePhoto($patient->photo);
                }
            }

            if ($request->hasFile('photo')) {
                $photoPath = $request->file('photo')->store('patients', 'public');
            }

            return $photoPath;
        } catch (\Exception $e) {
            throw new \Exception('Erro ao salvar a imagem');
        }
    }

    /**
     * @param string $path
     */
    public function deletePhoto(string $path): void
    {
        $photoPath = str_replace('storage/', '', $path);
        Storage::disk('public')->delete($photoPath);
    }
}

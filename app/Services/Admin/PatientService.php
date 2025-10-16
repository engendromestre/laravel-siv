<?php

/**
 * @package App\Services\Admin
 * @author Paulo Oliveira <https://github.com/engendromestre>
 */

namespace App\Services\Admin;

use App\Models\Patient;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

/**
 * Class PatientService
 * @package App\Services\Admin
 */
class PatientService
{
    public function getAdmittedPatients($gender = null)
    {
        $query = Patient::where('status', 'a');

        // 🔹 Se um gênero for passado, aplica o filtro
        if ($gender) {
            $query->where('gender', $gender);
        }

        return $query->with(['admissions' => function ($query) {
            $query->latest('admission_datetime')->limit(1); // Obtém a última admissão
        }])
        ->orderBy('name', 'asc')
        ->get()
        ->map(function ($patient) {
            $patient->lastAdmission = $patient->admissions->first(); // Define a última admissão
            return $patient;
        });
    }

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

        $paginator = $query->paginate($filters['perPage'] ?? 5);
        // Mapeia cada item da página para adicionar a URL da imagem
        $paginator->getCollection()->transform(function ($patient) {
            $patient->photo_url = $patient->photo
                ? Storage::disk('s3')->url($patient->photo)
                : null;
            return $patient;
        });

        return $paginator;
    }

    public function getPatientsByStatusInactive(array $filters)
    {
        $query = Patient::where('status', 'i');

        // Ordenação
        if (isset($filters['sortField']) && isset($filters['sortOrder'])) {
            $query->orderBy($filters['sortField'], $filters['sortOrder']);
        }

        // Filtragem por nome ou registro
        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%$search%")
                    ->orWhere('register', 'like', "%$search%");
            });
        }

        return $query->paginate($filters['perPage'] ?? 10);
    }

    /**
     * @return Patient
     * @throws \Exception
     */
    public function createPatient(array $data, UploadedFile $photoFile): Patient
    {
        DB::beginTransaction();
        $photoPath = $photoFile->store('patients', 's3');
        $data['photo'] = $photoPath;
        $data['status'] = 'i'; // default inativo
        try {
            $patient = Patient::create($data);
            DB::commit();
            return $patient;
        } catch (\Exception $e) {
            DB::rollBack();
             // remove o arquivo caso a criação falhe
            Storage::disk('s3')->delete($photoPath);
            throw new \Exception('Erro ao criar paciente: ' . $e->getMessage());
        }
    }

    /**
     * @param int $id
     * @param array $validated
     * @return Patient
     * @throws \Exception
     */
   public function updatePatient(array $validated, $id)
    {
        DB::beginTransaction();

        try {
            $patient = Patient::findOrFail($id);

            // Se uma nova foto foi enviada
            if (isset($validated['photo']) && $validated['photo'] instanceof \Illuminate\Http\UploadedFile) {
                // Remove foto antiga se existir
                if ($patient->photo) {
                    Storage::disk('s3')->delete($patient->photo);
                }
                
                // Faz upload da nova foto
                $validated['photo'] = $validated['photo']->store('patients', 's3');
            } else {
                // Se não foi enviada nova foto, mantém a atual
                unset($validated['photo']);
            }

            $patient->update($validated);
            DB::commit();

            return $patient;
        } catch (\Exception $e) {
            DB::rollBack();
            throw new \Exception('Erro ao atualizar paciente: ' . $e->getMessage());
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

            // Remove a foto se existir
            if ($patient->photo) {
                Storage::disk('s3')->delete($patient->photo);
            }

            $patient->delete();
        } catch (\Exception $e) {
            throw new \Exception('Erro ao deletar paciente: ' . $e->getMessage());
        }
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @return string|null
     * @throws \Exception
     */
    public function uploadPhoto(Request $request): array
    {
        $request->validate([
            'photo' => 'required|image|mimes:jpeg,jpg,png|max:3072',
        ]);

        try {
            $photoPath = $request->file('photo')->store('patients', 's3');

            return [
                'photoRelativePath' => $photoPath,
                'photoPath' => Storage::disk('s3')->url($photoPath),
            ];
        } catch (\Exception $e) {
            throw new \Exception('Erro ao fazer upload da foto.');
        }
    }

    /**
     * @param string $path
     */
    public function deletePhoto(string $path): void
    {
        Storage::disk('s3')->delete($path);
    }
}
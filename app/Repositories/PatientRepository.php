<?php

namespace App\Repositories;

use App\Models\Patient;

class PatientRepository
{
    public function getAllPatients($filters)
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

    public function findPatientById($id)
    {
        return Patient::with('admissions')->findOrFail($id);
    }

    public function create($data)
    {
        return Patient::create($data);
    }

    public function update($patient, $data)
    {
        $patient->update($data);
        return $patient;
    }

    public function delete($patient)
    {
        $patient->delete();
    }
}
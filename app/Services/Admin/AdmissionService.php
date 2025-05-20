<?php

namespace App\Services\Admin;

use App\Models\Admission;
use App\Models\Patient;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Carbon\Carbon;

class AdmissionService
{
    public function getAdmissions(array $filters)
    {
        $query = Patient::query();

        // Filtrar apenas pacientes admistidos
        $query->where('status', 'a');

        // Ordenação
        if (isset($filters['sortField']) && isset($filters['sortOrder'])) {
            $query->orderBy($filters['sortField'], $filters['sortOrder']);
        }

        // Filtragem        
        if (isset($filters['search']) && !empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%$search%")
                    ->orWhere('register', 'like', "%$search%");
            });
        }

        // Filtrando pacientes com ao menos uma admissão onde discharge_date seja nulo
        $query->whereHas('admissions', function ($query) use ($filters) {
            $query->whereNull('discharge_datetime'); // Admissões com discharge_date nulo
            if (isset($filters['admissionDateTime'])) {
                $query->whereDate('admission_datetime', $filters['admissionDateTime']);
            }
        });

        // Carregar as admissões associadas a cada paciente
        $patients = $query->with(['admissions' => function ($query) use ($filters) {
            // Aqui você pode adicionar mais filtros para as admissões se necessário
            if (isset($filters['admissionDateTime'])) {
                $query->whereDate('admission_datetime', $filters['admissionDateTime']);
            }
            // Ordena por admission_datetime de forma decrescente
            $query->orderBy('admission_datetime', 'desc');
        }])->paginate($filters['perPage'] ?? 5);

        return $patients;
    }

    /**
     * @return Patient
     * @throws \Exception
     */
    public function createAdmission(Request $request)
    {
        // dd($request->all());
        $validated = $request->validate([
            'admission_datetime' => 'required|date_format:Y-m-d H:i:s', // Confirma que a data está correta
            'reason_for_admission' => 'nullable|string|max:255', // Permite que o campo seja nulo ou tenha no máximo 255 caracteres
            'user_id' => 'required|integer|exists:users,id',
            'patient_id' => 'required|integer|exists:patients,id',
        ]);

        DB::beginTransaction();
        try {
            // Criar a admissão associada ao paciente
            Patient::findOrFail($validated['patient_id']) // Buscar o paciente
                ->admissions() // Relacionamento admissions
                ->create([
                    'admission_datetime' => Carbon::parse($validated['admission_datetime'])->format('Y-m-d H:i:s'),
                    'reason_for_admission' => $validated['reason_for_admission'], // Definindo o motivo
                    'user_id' => $validated['user_id'], // Definindo o usuário responsável pela admissão
                ]);

            // Atualizar o status do paciente para 'a'
            Patient::where('id', $validated['patient_id'])
                ->update(['status' => 'a']);

            DB::commit();
            return;
        } catch (\Exception $e) {
            DB::rollBack();
            throw new \Exception($e->getMessage());
        }
    }

    public function updateAdmission(Request $request)
    {
        // dd($request->all());
        $validated = $request->validate([
            'discharge_datetime' => 'required|date_format:Y-m-d H:i', // Confirma que a datahora está correta
            'notes' => 'nullable|string|max:255', // Permite que o campo seja nulo ou tenha no máximo 255 caracteres
            'admission_id' => 'required|integer|exists:admissions,id',
            'patient_id' => 'required|integer|exists:patients,id',
        ]);
        // 📌 Buscar a última admissão do paciente, garantindo que ainda não tenha alta
        $admission = Admission::where('patient_id', $validated['patient_id'])
            ->whereNull('discharge_datetime') // Apenas admissões ativas
            ->latest('admission_datetime') // Ordena por data decrescente e pega a mais recente
            ->first();

        if (!$admission) {
            return 'Nenhuma admissão ativa encontrada para este paciente.';
        }

        try {
            DB::beginTransaction(); // 🔒 Inicia a transação

            // 🔄 Atualizar os dados da admissão
            $admission->update([
                'discharge_datetime' => $validated['discharge_datetime'],
                'notes' => $validated['notes'] ?? $admission->notes, // Mantém o valor original se não enviado
            ]);

            // 🔄 Atualizar o status do paciente para "i" (inativo)
            Patient::where('id', $validated['patient_id'])->update(['status' => 'i']);

            DB::commit();
            return;
        } catch (\Exception $e) {
            DB::rollBack();
            throw new \Exception($e->getMessage());
        }
    }
}

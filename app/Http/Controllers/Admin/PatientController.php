<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Patient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

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
        $patients = $query->paginate($request->input('perPage', 10))->appends($request->query());

        return Inertia::render('Admin/Patients/Index', [
            'data' => $patients,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Patients/Create');
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
            'photo'      => 'required|image|mimes:jpeg,png,jpg|max:3072', // 3MB
        ]);

        try {
            DB::beginTransaction(); // 🔥 Inicia a transação

            // Salvar a imagem no storage
            $photoPath = null;
            if ($request->hasFile('photo')) {
                $photoPath = $request->file('photo')->store('patients', 'public'); // Salva em storage/app/public/patients
            }

            // Criar paciente no banco
            $patient = Patient::create([
                'register' => $request->register,
                'name' => $request->name,
                'gender' => $request->gender,
                'birthDate' => $request->birthDate,
                'motherName' => $request->motherName,
                'status' => $request->status,
                'photo' => $photoPath ? "storage/$photoPath" : null, // Salva o caminho no banco
            ]);
            $message = 'Cadastro realizado com sucesso!';
            DB::commit(); // 🔥 Confirma a transação
        } catch (\Exception $e) {
            DB::rollBack(); // ❌ Reverte se falhar
        }

        return Redirect::route('patient.create');
    }
}

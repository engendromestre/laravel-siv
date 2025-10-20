<?php

namespace App\Events;

use App\Models\Patient;
use App\Models\Admission;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class PatientAdmitted implements ShouldBroadcast, ShouldQueue
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $patient;
    public $admission;

    /**
     * Create a new event instance.
     */
    public function __construct(Patient $patient, Admission $admission)
    {
        $this->patient = $patient;
        $this->admission = $admission;

        // opcional: atualizar última admissão
        $this->patient->lastAdmission = $this->admission;
    }

    /**
     * The channel the event should broadcast on.
     */
    public function broadcastOn()
    {
        return new Channel('admissions');
    }

    /**
     * The event name for broadcasting.
     */
    public function broadcastAs()
    {
        return 'PatientAdmitted';
    }

    /**
     * The data to broadcast.
     */
    public function broadcastWith()
    {
        $photoUrl = null;

        try {
            if (!empty($this->patient->photo)) {
                $filename = basename($this->patient->photo);

                if (Storage::disk('s3')->exists("patients/{$filename}")) {
                    // Usa URL absoluta para o proxy HTTPS
                    $photoUrl = "https://192.16.1.107/secure-image/{$filename}";
                }
            }
        } catch (\Exception $e) {
            Log::error("Erro ao gerar photo_url no PatientAdmitted: ".$e->getMessage());
            $photoUrl = null;
        }

        return [
            'id' => $this->patient->id,
            'name' => $this->patient->name,
            'mother_name' => $this->patient->mother_name,
            'gender' => $this->patient->gender,
            'photo' => $this->patient->photo,
            'photo_url' => $photoUrl,
            'lastAdmission' => [
                'admission_datetime' => $this->admission->admission_datetime,
            ],
        ];
    }
}

<?php

namespace App\Events;

use App\Models\Patient;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class PatientDischarged implements ShouldBroadcast, ShouldQueue
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $patient;

    /**
     * Create a new event instance.
     */
    public function __construct(Patient $patient)
    {
        $this->patient = $patient;
    }

    public function broadcastOn()
    {
        return new Channel('admissions');
    }

    public function broadcastAs()
    {
         return 'PatientDischarged';
    }

    public function broadcastWith()
    {
        return [
            'id' => $this->patient->id,
            'name' => $this->patient->name,
            'mother_name' => $this->patient->mother_name,
            'gender' => $this->patient->gender,
            'photo' => $this->patient->photo,
            'photo_url' => $this->patient->photo_url, 
            // Não precisamos das admissões porque o paciente está sendo liberado
        ];
    }
}

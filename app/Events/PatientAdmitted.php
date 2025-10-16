<?php

namespace App\Events;

use App\Models\Admission;
use App\Models\Patient;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;


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

        $this->patient->lastAdmission = $this->admission;

    }

    public function broadcastOn()
    {
        return new Channel('admissions');
    }

    public function broadcastAs()
    {
        return 'PatientAdmitted';
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
            'lastAdmission' => [
                'admission_datetime' => $this->admission->admission_datetime,
            ],
        ];
    }

}

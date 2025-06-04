<?php

namespace App\Events;

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
    public function __construct()
    {
        $this->patient = $patient;
    }

    public function broadcastOn()
    {
        return ['patients-channel'];
    }

    public function broadcastAs()
    {
        return 'PatientAdmitted';
    }
}

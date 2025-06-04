<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Queue\SerializesModels;

class TestEvent implements ShouldBroadcast, ShouldQueue
{
    use InteractsWithSockets, SerializesModels;

    public $message;

    /**
     * Cria uma nova instância de evento.
     *
     * @param string $message
     */
    public function __construct($message = 'Hello from TestEvent with Queue!')
    {
        $this->message = $message;
    }

    /**
     * Define o canal de broadcast.
     *
     * @return \Illuminate\Broadcasting\Channel
     */
    public function broadcastOn()
    {
        return new Channel('test-channel');
    }

    /**
     * Define o nome do evento de broadcast.
     *
     * @return string
     */
    public function broadcastAs()
    {
        return 'TestEvent';
    }
}

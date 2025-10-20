import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'pusher', // permanece 'pusher', mas vai para Reverb
    key: import.meta.env.VITE_REVERB_APP_KEY, // qualquer chave local
    wsHost: import.meta.env.VITE_REVERB_HOST || window.location.hostname,
    wsPort: import.meta.env.VITE_REVERB_PORT || 8080,
    forceTLS: import.meta.env.VITE_REVERB_SCHEME === 'https',
    enabledTransports: ['ws'], // apenas WebSocket
    disableStats: true,
    cluster: '', // vazio, não usado pelo Reverb
});

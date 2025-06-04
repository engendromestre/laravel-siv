import Echo from 'laravel-echo';

import Pusher from 'pusher-js';
window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: window.location.hostname, // Usa o host atual do navegador
    wsPort: import.meta.env.VITE_REVERB_PORT || 8080,
    forceTLS: false, // Desativado para desenvolvimento local
    enabledTransports: ['ws'], // Força usar apenas WS (não WSS)
    disableStats: true,
    cluster: '', // Remove o cluster (não usado no Reverb)
});

import axios from 'axios';
import './echo';

window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

window.Echo.channel('test-channel').listen('.TestEvent', (e: unknown) => {
    console.log('Evento recebido:', e);
});

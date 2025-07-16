const Ziggy = {
    url: 'http:\/\/localhost',
    port: null,
    defaults: {},
    routes: {
        'sanctum.csrf-cookie': {
            uri: 'sanctum\/csrf-cookie',
            methods: ['GET', 'HEAD'],
        },
        'patients.admitted': {
            uri: 'api\/patients\/admitted',
            methods: ['GET', 'HEAD'],
        },
        'tv.gender': {
            uri: 'tv\/{gender}',
            methods: ['GET', 'HEAD'],
            parameters: ['gender'],
        },
        'social.redirect': {
            uri: 'auth\/{provider}\/redirect',
            methods: ['GET', 'HEAD'],
            parameters: ['provider'],
        },
        'social.callback': {
            uri: 'auth\/{provider}\/callback',
            methods: ['GET', 'HEAD'],
            parameters: ['provider'],
        },
        'password.rules': { uri: 'password-rules', methods: ['GET', 'HEAD'] },
        'guest.page': { uri: 'guest\/pending', methods: ['GET', 'HEAD'] },
        dashboard: { uri: 'dashboard', methods: ['GET', 'HEAD'] },
        'profile.edit': { uri: 'profile', methods: ['GET', 'HEAD'] },
        'profile.update': { uri: 'profile', methods: ['PATCH'] },
        'profile.destroy': { uri: 'profile', methods: ['DELETE'] },
        'patient.index': { uri: 'patient', methods: ['GET', 'HEAD'] },
        'patients.search': { uri: 'patients', methods: ['GET', 'HEAD'] },
        'patients.non-admitted': {
            uri: 'patients\/non-admitted',
            methods: ['GET', 'HEAD'],
        },
        'patient.create': { uri: 'patient\/create', methods: ['GET', 'HEAD'] },
        'patient.edit': {
            uri: 'patient\/edit\/{id}',
            methods: ['GET', 'HEAD'],
            parameters: ['id'],
        },
        'patient.show': {
            uri: 'patients\/{id}',
            methods: ['GET', 'HEAD'],
            parameters: ['id'],
        },
        'patient.uploadPhoto': {
            uri: 'patient\/uploadPhoto',
            methods: ['POST'],
        },
        'patient.store': { uri: 'patient', methods: ['POST'] },
        'patient.update': {
            uri: 'patient\/{id}',
            methods: ['PUT'],
            parameters: ['id'],
        },
        'patient.destroy': {
            uri: 'patient\/{id}',
            methods: ['DELETE'],
            parameters: ['id'],
        },
        'admission.index': { uri: 'admission', methods: ['GET', 'HEAD'] },
        'admissions.list': { uri: 'admissions', methods: ['GET', 'HEAD'] },
        'admission.create': {
            uri: 'admission\/create',
            methods: ['GET', 'HEAD'],
        },
        'admission.patient.create': {
            uri: 'admission\/patient\/create',
            methods: ['GET', 'HEAD'],
        },
        'admission.edit': {
            uri: 'admission\/edit\/{id}',
            methods: ['GET', 'HEAD'],
            parameters: ['id'],
        },
        'admission.show': {
            uri: 'admissions\/{id}',
            methods: ['GET', 'HEAD'],
            parameters: ['id'],
        },
        'admission.patient.store': {
            uri: 'admission\/patient\/store',
            methods: ['POST'],
        },
        'admission.store': { uri: 'admission', methods: ['POST'] },
        'admission.update': { uri: 'admission', methods: ['PATCH'] },
        'admission.destroy': {
            uri: 'admission\/{id}',
            methods: ['DELETE'],
            parameters: ['id'],
        },
        'role.index': { uri: 'role', methods: ['GET', 'HEAD'] },
        'role.store': { uri: 'role', methods: ['POST'] },
        'role.update': { uri: 'role', methods: ['PUT'] },
        'role.destroy': { uri: 'role', methods: ['DELETE'] },
        'keep-alive': { uri: 'keep-alive', methods: ['POST'] },
        'register.complete': {
            uri: 'register\/{user}',
            methods: ['GET', 'HEAD'],
            parameters: ['user'],
            bindings: { user: 'id' },
        },
        'register.complete.update': {
            uri: 'register\/{user}',
            methods: ['PUT'],
            parameters: ['user'],
            bindings: { user: 'id' },
        },
        login: { uri: 'login', methods: ['GET', 'HEAD'] },
        'password.request': {
            uri: 'forgot-password',
            methods: ['GET', 'HEAD'],
        },
        'password.email': { uri: 'forgot-password', methods: ['POST'] },
        'password.reset': {
            uri: 'reset-password\/{token}',
            methods: ['GET', 'HEAD'],
            parameters: ['token'],
        },
        'password.store': { uri: 'reset-password', methods: ['POST'] },
        register: { uri: 'register', methods: ['GET', 'HEAD'] },
        'verification.notice': {
            uri: 'verify-email',
            methods: ['GET', 'HEAD'],
        },
        'verification.verify': {
            uri: 'verify-email\/{id}\/{hash}',
            methods: ['GET', 'HEAD'],
            parameters: ['id', 'hash'],
        },
        'verification.send': {
            uri: 'email\/verification-notification',
            methods: ['POST'],
        },
        'password.confirm': {
            uri: 'confirm-password',
            methods: ['GET', 'HEAD'],
        },
        'password.update': { uri: 'password', methods: ['PUT'] },
        logout: { uri: 'logout', methods: ['POST'] },
        'user.show': {
            uri: 'user\/{id}',
            methods: ['GET', 'HEAD'],
            parameters: ['id'],
        },
        'user.permissions.update': {
            uri: 'users\/{user}\/permissions',
            methods: ['PUT'],
            parameters: ['user'],
            bindings: { user: 'id' },
        },
        'storage.local': {
            uri: 'storage\/{path}',
            methods: ['GET', 'HEAD'],
            wheres: { path: '.*' },
            parameters: ['path'],
        },
    },
};
if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
    Object.assign(Ziggy.routes, window.Ziggy.routes);
}
export { Ziggy };

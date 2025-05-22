@component('mail::message')
# Olá {{ $user->name }}

Parabéns! Sua **função** ou **permissões** foram definidas e agora você pode acessar o sistema normalmente.

@component('mail::button', ['url' => 'http://localhost/login'])
    Entrar no Sistema
@endcomponent

Se tiver dúvidas, entre em contato com nossa equipe:

📧 **cantidio-informatica@saude.sp.gov.br**

_Enviado em {{ now()->format('d/m/Y H:i') }}_

Atenciosamente,  
**Núcleo de Suporte à Informática**
@endcomponent
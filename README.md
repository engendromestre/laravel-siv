php artisan make:controller PatientController

cqrs

eloquentORM - data-mapper, active-record

php artisan make:model Patient -m

-m -> migrate
-c -> controller
-f -> factory
-s -> seed
-R -> resource

# Shortcut to generate a model, migration, factory, seeder, policy, controller, and form requests...

php artisan make:model Flight --all
php artisan make:model Flight -a

# Console

php artisan app:truncate-patients-table
php artisan migrate:fresh --seed

ToDo
Se um paciente tiver muitas admissões, podemos:

Adicionar Paginação (retornar o paciente com as primeiras 10 amissões e depois ir paginando)
Limitar a Altura da Lista com Scroll
Implementar Busca/Filtro

Implementar Authorization

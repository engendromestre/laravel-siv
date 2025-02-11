<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
         Schema::table('users', function (Blueprint $table) {
            $table->string('provider_id')->nullable()->after('email'); // Armazena o ID do provedor (Google, Facebook, etc.)
            $table->string('provider')->nullable()->after('provider_id'); // Armazena o nome do provedor (google, facebook, etc.)
            $table->text('provider_token')->nullable()->after('provider'); // Token de acesso do provedor
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
       Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['provider_id', 'provider','provider_token']);
        });
    }
};

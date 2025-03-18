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
        Schema::create('admissions', function (Blueprint $table) {
            $table->id('id');
            $table->foreignId('patient_id')->constrained('patients', 'id')->onDelete('restrict');
            $table->datetime('admission_datetime');
            $table->datetime('discharge_datetime')->nullable();
            $table->string('reason_for_admission')->nullable();
            $table->foreignId('user_id')->constrained('users', 'id')->onDelete('restrict');
            $table->text('notes')->nullable(); //observações gerais sobre o paciente ou o processo da admissão
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admissions');
    }
};

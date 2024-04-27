<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        DB::table('administrators')->insert([
            [
                'first_name' => 'Admin',
                'last_name' => 'Admin',
                'mail' => 'admin@example.com',
                'password' => bcrypt('password123'), // Recuerda encriptar la contraseña
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Agrega más registros si es necesario
        ]);
    }

    public function down()
    {
        // Puedes revertir los cambios si es necesario
        DB::table('administrators')->where('mail', 'admin@example.com')->delete();
    }
};

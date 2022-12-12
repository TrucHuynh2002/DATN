<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('noty_notyqa', function (Blueprint $table) {
            $table->id();
            $table->integer("id_post");
            $table->integer("id_user");
            $table->integer("id_user_tow");

            $table->string("status");
            $table->string("interaction");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('noty_notyqa');
    }
};

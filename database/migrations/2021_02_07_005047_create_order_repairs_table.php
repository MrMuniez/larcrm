<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrderRepairsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_repairs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id');
            $table->string('name');
            $table->decimal('netto',10,2);
            $table->unsignedInteger('vat')->default(23);
            $table->decimal('brutto',10,2);
            $table->unsignedInteger('amount')->default(1);
            $table->boolean('done')->default(0);
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
        Schema::dropIfExists('order_repairs');
    }
}

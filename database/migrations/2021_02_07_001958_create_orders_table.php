<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('serial_number')->nullable();
            
            $table->unsignedBigInteger('item_type_id');
            $table->unsignedBigInteger('repair_state_id');
            $table->unsignedBigInteger('client_id');

            $table->text('problem_description');
            $table->text('item_description')->nullable();
            $table->text('diagnose')->nullable();
            $table->text('client_diagnose')->nullable();
            $table->decimal('loan',10,2)->nullable();
            $table->decimal('planned_cost',10,2)->nullable();
            $table->boolean('warranty')->default(0);

            $table->enum('delivery_type',['personal','send','customer_recive'])->default('personal');
            $table->enum('release_type',['personal','send','customer_recive'])->default('personal');

            $table->string('secret_key')->default(substr(str_shuffle(str_repeat($x='123456789abcdefghijklmnpqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ', ceil(5/strlen($x)) )),1,5));
            $table->string('rma_number')->nullable();

            $table->string('return_optional_address')->nullable();
            $table->string('delivery_optional_info')->nullable();

            $table->date('planned_end');


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
        Schema::dropIfExists('orders');
    }
}

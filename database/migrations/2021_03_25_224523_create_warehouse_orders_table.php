<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWarehouseOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('warehouse_orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('warehouse_item_id');
            $table->decimal('netto',10,2);
            $table->unsignedSmallInteger('vat')->default(23);
            $table->decimal('brutto',10,2);
            $table->unsignedInteger("amount")->default(1);
            $table->boolean('delivered')->default(0);
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
        Schema::dropIfExists('warehouse_orders');
    }
}

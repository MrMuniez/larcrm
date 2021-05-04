<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\OrderController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ItemTypeController;
use App\Http\Controllers\OrderRepairController;
use App\Http\Controllers\RepairStateController;
use App\Http\Controllers\WarehouseItemController;
use App\Models\WarehouseItems;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResources([
    'orders' => OrderController::class,
    'clients' => ClientController::class,
    'repairs' => OrderRepairController::class,
    'itemtypes' => ItemTypeController::class,
    'repairstates' => RepairStateController::class,
    'witems' => WarehouseItemController::class,
    'worders' => WarehouseItemController::class,
]);

Route::post('/witems/find','WarehouseItemController@find');



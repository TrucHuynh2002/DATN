<?php

use App\Http\Controllers\ConfigController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('config',[ConfigController::class,'get_Config'])->name('getConfig');
Route::post('config/',[ConfigController::class,'create_Config'])->name('createConfig');
Route::put('config/update',[ConfigController::class,'update_Config'])->name('getConfig');

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

Route::get('config', [ConfigController::class, 'get_Config'])->name('getConfig');
Route::post('config/', [ConfigController::class, 'create_Config'])->name('createConfig');
Route::put('config/update', [ConfigController::class, 'update_Config'])->name('getConfig');
// category
Route::get('category/show', [CategoryController::class, 'show']);
Route::get('category/show/{id}', [CategoryController::class, 'show_id']);
Route::post('category/create', [CategoryController::class, 'created_at']);
Route::put('category/update/{id}', [CategoryController::class, 'update']);
Route::post('category/delete/{id}', [CategoryController::class, 'delete']);

// post
Route::get('post/show', [PostController::class, 'show']);
Route::get('post/show/{id}', [PostController::class, 'show_id']);
Route::post('post/create', [PostController::class, 'created_at']);
Route::put('post/update/{id}', [PostController::class, 'update']);
Route::post('post/delete/{id}', [PostController::class, 'delete']);
Route::get('post/delete', [PostController::class, 'show_delete']);
Route::get('post/status', [PostController::class, 'show_status']);

// imgPost
Route::get('imgPost/show', [imgPostController::class, 'show']);
Route::get('imgPost/show/{id}', [imgPostController::class, 'show_id']);
Route::post('imgPost/create', [imgPostController::class, 'created_at']);
Route::put('imgPost/update/{id}', [imgPostController::class, 'update']);
Route::post('imgPost/delete/{id}', [imgPostController::class, 'delete']);

// Furniture
Route::get('furniture/show', [FurnitureController::class, 'show']);
Route::get('furniture/show/{id}', [FurnitureController::class, 'show_id']);
Route::post('furniture/create', [FurnitureController::class, 'created_at']);
Route::put('furniture/update/{id}', [FurnitureController::class, 'update']);
Route::post('furniture/delete/{id}', [FurnitureController::class, 'delete']);

// RoomType
Route::get('roomType/show', [roomTypeController::class, 'show']);
Route::get('roomType/id/{id}', [roomTypeController::class, 'show_id']);
Route::post('roomType/create', [roomTypeController::class, 'created_at']);
Route::put('roomType/update/{id}', [roomTypeController::class, 'update']);
Route::post('roomType/delete/{id}', [roomTypeController::class, 'delete']);

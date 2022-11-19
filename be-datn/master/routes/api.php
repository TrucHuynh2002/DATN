<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ConfigController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\FurnitureController;
use App\Http\Controllers\imgPostController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\RoomTypeController;
use Illuminate\Http\Request;

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\UserController;

use App\Http\Controllers\SearchController;
use App\Http\Controllers\NotifyController;
use App\Http\Controllers\FavoriteController;
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
Route::get('/', [CategoryController::class, 'index']);
Route::get('category/show', [CategoryController::class, 'show']);
Route::get('category/show/{id}', [CategoryController::class, 'show_id']);
Route::post('category/create', [CategoryController::class, 'created_at']);
Route::put('category/update/{id}', [CategoryController::class, 'update']);
Route::delete('category/delete/{id}', [CategoryController::class, 'delete']);

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

// Favorite
Route::get('favorite/show', [FavoriteController::class, 'show']);
Route::get('favorite/show/{id}', [FavoriteController::class, 'show_id']);
Route::post('favorite/create', [FavoriteController::class, 'created_at']);

// RoomType
Route::get('roomType/show', [RoomTypeController::class, 'show']);
Route::get('roomType/id/{id}', [roomTypeController::class, 'show_id']);
Route::post('roomType/create', [roomTypeController::class, 'created_at']);
Route::put('roomType/update/{id}', [roomTypeController::class, 'update']);
Route::post('roomType/delete/{id}', [roomTypeController::class, 'delete']);

// Comment
Route::get('comment/show', [CommentController::class, 'Comment_SelectAll']);
Route::get('comment/show/{id}', [CommentController::class, 'Comment_SelectOne']);
Route::post('comment/create', [CommentController::class, 'CommentAdd']);
Route::put('comment/update/{id}', [CommentController::class, 'CommentEdit']);
Route::delete('comment/delete/{id}', [CommentController::class, 'CommentDelete']);

// User
Route::get('user/show', [UserController::class, 'User_SelectAll']);
Route::get('user/show/{id}', [UserController::class, 'User_SelectOne']);
Route::post('user/create', [UserController::class, 'UserAdd']);
Route::put('user/update/{id}', [UserController::class, 'UserEdit']);
Route::delete('user/delete/{id}', [UserController::class, 'UserDelete']);

Route::post('user/login', [UserController::class, 'UserLogin']);
Route::post('user/forgot', [UserController::class, 'UserForgotPassword']);

// Contact
Route::get('contact/show', [ContactController::class, 'Contact_SelectAll']);
Route::get('contact/show/{id}', [ContactController::class, 'Contact_SelectOne']);
Route::post('contact/create', [ContactController::class, 'ContactAdd']);
Route::put('contact/update/{id}', [ContactController::class, 'ContactEdit']);
Route::delete('contact/delete/{id}', [ContactController::class, 'ContactDelete']);

// Rating
Route::get('rating/show', [RatingController::class, 'Rating_Selectall']);
Route::get('rating/show/{id}', [RatingController::class, 'Rating_SelectUser']);
Route::post('rating/create', [RatingController::class, 'RatingAdd']);
Route::put('rating/update/{id}', [RatingController::class, 'RatingEdit']);
// Route::delete('rating/delete/{id}', [RatingController::class, 'RatingDelete']);

Route::middleware('guest')->group(function () {
    
    Route::post('register', [RegisteredUserController::class, 'store']);

    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
                ->name('password.email');

    Route::post('reset-password', [NewPasswordController::class, 'store'])
                ->name('password.update');
});

Route::middleware('auth')->group(function () {
    Route::get('verify-email', [EmailVerificationPromptController::class, '__invoke'])
                ->name('verification.notice');

    Route::get('verify-email/{id}/{hash}', [VerifyEmailController::class, '__invoke'])
                ->middleware(['signed', 'throttle:6,1'])
                ->name('verification.verify');

    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
                ->middleware('throttle:6,1')
                ->name('verification.send');

    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
                ->name('password.confirm');

    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

    Route::get('logout', [AuthenticatedSessionController::class, 'destroy'])
                ->name('logout');
            });
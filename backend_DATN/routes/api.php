<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ConfigController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\FurnitureController;
use App\Http\Controllers\imgPostController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\RoomTypeController;
use Illuminate\Http\Request;
use App\Http\Controllers\HeartFeelingController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\BannerController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\NotifyController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\ProvinceController;
use App\Http\Controllers\search_trendsController;
use App\Http\Controllers\ViewController;
use App\Http\Controllers\StatisticalSController;
use App\Http\Controllers\UploadCkeditController;

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
// Route::get('config', [ConfigController::class, 'get_Config']);
// Route::post('config/', [ConfigController::class, 'create_Config']);
// TEST CK
Route::post('uploads/',[UploadCkeditController::class,'upload_CK']);

Route::put('config/update/logo/{id}', [ConfigController::class, 'Logo']);
Route::get('config', [ConfigController::class, 'get_Config']);
Route::put('config/update', [ConfigController::class, 'update_Config']);
Route::get('config/{id}', [ConfigController::class, 'get_Config'])->name('getConfig');
Route::post('config/', [ConfigController::class, 'create_Config'])->name('createConfig');
Route::put('config/update/{id}', [ConfigController::class, 'update_Config'])->name('getConfig');
Route::get('banner/show', [BannerController::class, 'get_Banner']);
Route::get('banner/show/{id}', [BannerController::class, 'get_Banner_id']);
Route::put('banner/update/{id}', [BannerController::class, 'update_Banner']);
Route::get('about/show', [ConfigController::class, 'get_About']);

// category
Route::get('/', [CategoryController::class, 'index']);
Route::get('category/show', [CategoryController::class, 'show']);
Route::get('category/show/{id}', [CategoryController::class, 'show_id']);
Route::post('category/create', [CategoryController::class, 'created_at']);
Route::put('category/update/{id}', [CategoryController::class, 'update']);
Route::delete('category/delete/{id}', [CategoryController::class, 'delete']);

// Blog
Route::get('blog/show', [BlogController::class, 'show']);
Route::get('blog/show/{id}', [BlogController::class, 'show_id']);
Route::get('blog/showUser/{id}', [BlogController::class, 'show_user']);
Route::post('blog/create', [BlogController::class, 'created_at']);
Route::put('blog/update/{id}', [BlogController::class, 'update']);
Route::put('blog/updateView/{id}', [BlogController::class, 'updateView']);
Route::delete('blog/delete/{id}', [BlogController::class, 'delete']);

//HeartFeeling 
Route::post('heartFeeling/create', [HeartFeelingController::class, 'created_at']);
Route::get('heartFeeling/show/{id}', [HeartFeelingController::class, 'show_id']);
Route::delete('heartFeeling/delete/{id}', [HeartFeelingController::class, 'delete']);

// post
Route::get('post/show', [PostController::class, 'show']);
Route::get('post/show_tv', [PostController::class, 'show_tv']);
Route::get('post/showHeart', [PostController::class, 'showHeart']);
Route::get('post/show/{id}', [PostController::class, 'show_id']);
Route::get('post/showUser/{id}', [PostController::class, 'showUser']);
Route::get('post/showPost/{id}', [PostController::class, 'showPost']);
Route::post('post/create', [PostController::class, 'created_at']);
Route::post('post/create_tv', [PostController::class, 'created_at_tv']);
Route::put('post/update/{id}', [PostController::class, 'update']);
Route::delete('post/delete/{id}', [PostController::class, 'delete']);
Route::get('post/delete', [PostController::class, 'show_delete']);
Route::get('post/status', [PostController::class, 'show_status']);
Route::put('post/updateView/{id}', [PostController::class, 'updateView']);
Route::get('post/user/{id}', [PostController::class, 'show_user']);

//address
Route::get('post/show_province', [PostController::class, 'show_province']);
Route::get('post/show_district/{id}', [PostController::class, 'show_district']);
Route::get('post/show_ward/{id}', [PostController::class, 'show_ward']);

// imgPost
Route::get('imgPost/show', [imgPostController::class, 'show']);
Route::get('imgPost/show/{id}', [imgPostController::class, 'show_id']);
Route::get('imgPost/show_detail/{id}', [imgPostController::class, 'show_img_detail']);
Route::post('imgPost/create', [imgPostController::class, 'created_at']);
Route::put('imgPost/update/{id}', [imgPostController::class, 'update']);
Route::delete('imgPost/delete/{id}', [imgPostController::class, 'delete']);


// Furniture
Route::get('furniture/show', [FurnitureController::class, 'show']);
Route::get('furniture/show/{id}', [FurnitureController::class, 'show_id']);
Route::post('furniture/create', [FurnitureController::class, 'created_at']);
Route::put('furniture/update/{id}', [FurnitureController::class, 'update']);
Route::delete('furniture/delete/{id}', [FurnitureController::class, 'delete']);

// Favorite
Route::get('favorite/show', [FavoriteController::class, 'show']);
Route::get('favorite/show/{id}', [FavoriteController::class, 'show_id']);
Route::post('favorite/create', [FavoriteController::class, 'created_at']);

// RoomType
Route::get('roomType/show', [RoomTypeController::class, 'show']);
Route::get('roomType/show/{id}', [RoomTypeController::class, 'show_id']);
Route::post('roomType/create', [RoomTypeController::class, 'created_at']);
Route::put('roomType/update/{id}', [RoomTypeController::class, 'update']);
Route::delete('roomType/delete/{id}', [RoomTypeController::class, 'delete']);

// Comment
Route::get('comment/show', [CommentController::class, 'Comment_SelectAll']);
Route::get('comment/post/show/{id_post}', [CommentController::class, 'Comment_SelectPost']);
Route::get('comment/show/{id}', [CommentController::class, 'Comment_SelectOne']);
Route::get('comment/showUserDes', [CommentController::class, 'CommentDes']);
Route::post('comment/create', [CommentController::class, 'CommentAdd']);
Route::put('comment/update/{id}', [CommentController::class, 'CommentEdit']);
Route::delete('comment/delete/{id}', [CommentController::class, 'CommentDelete']);

// User
Route::get('user/show', [UserController::class, 'User_SelectAll']);
Route::get('user/show/{id}', [UserController::class, 'User_SelectOne']);
Route::get('user/showAcount/{id}', [UserController::class, 'UserAcount']);
// Route::get('user/showimg/{id}', [UserController::class, 'ImgUser']);
Route::post('user/create', [UserController::class, 'UserAdd']);
Route::put('user/update/{id}', [UserController::class, 'UserEdit']);
Route::put('user/avatar/{id_user}', [UserController::class, 'userUpdateImg']);
Route::put('user/updatepassword/{id}', [UserController::class, 'PasswordEdit']);
Route::delete('user/delete/{id}', [UserController::class, 'UserDelete']);

Route::post('user/login', [UserController::class, 'UserLogin']);
Route::post('user/forgot', [UserController::class, 'UserForgotPassword']);

// Contact
Route::get('contact/show', [ContactController::class, 'Contact_SelectAll']);
Route::get('contact/show/{id}', [ContactController::class, 'Contact_SelectOne']);
Route::post('contact/create', [ContactController::class, 'ContactAdd']);
Route::put('contact/update/{id}', [ContactController::class, 'ContactEdit']);
// Route::delete('contact/delete/{id}', [ContactController::class, 'ContactDelete']);

// noify
Route::get('notify/show/{id}', [NotifyController::class, 'getNotify_Favorite']);
Route::get('notify_interactive/show/{id}', [NotifyController::class, 'getNotyfi_interactive']);
Route::post('notifyComment/create', [NotifyController::class, 'NotifyAddComment']);



// Rating
Route::get('rating/show', [RatingController::class, 'Rating_Selectall']);
Route::get('rating/show/{id}', [RatingController::class, 'Rating_SelectUser']);
Route::post('rating/create', [RatingController::class, 'RatingAdd']);
Route::put('rating/update/{id}', [RatingController::class, 'RatingEdit']);
// Route::delete('rating/delete/{id}', [RatingController::class, 'RatingDelete']);


/// Search
Route::post('search', [search_trendsController::class, 'search_key_word']);
Route::get('search', [SearchController::class, 'keyword_searching']);

// Province
Route::get('province/show', [ProvinceController::class, 'get_ProvinceAll']);


Route::middleware('guest')->group(function () {
    Route::post('register', [RegisteredUserController::class, 'store']);
    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
        ->name('password.email');

    Route::put('reset-password/{token}', [NewPasswordController::class, 'store'])->name('password.update');
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

//StatisticalS
Route::get('StatisticalSController/category', [StatisticalSController::class, 'count_category']);
Route::get('StatisticalSController/roomType', [StatisticalSController::class, 'count_roomType']);
Route::get('StatisticalSController/post', [StatisticalSController::class, 'count_post']);
Route::get('StatisticalSController/blog', [StatisticalSController::class, 'count_blog']);
Route::get('StatisticalSController/furniture', [StatisticalSController::class, 'count_furniture']);
Route::get('StatisticalSController/comment', [StatisticalSController::class, 'count_comment']);
Route::get('StatisticalSController/user', [StatisticalSController::class, 'count_user']);
Route::get('StatisticalSController/contact', [StatisticalSController::class, 'count_contact']);
Route::get('StatisticalSController/view', [StatisticalSController::class, 'count_view']);

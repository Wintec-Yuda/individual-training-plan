<?php

use App\Http\Controllers\ApprovalController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FulfillmentController;
use App\Http\Controllers\MyteamController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::group(['middleware' => 'api'],function(){
    Route::get('course/getCourseById/{id}',[CourseController::class,'getCourseById']);
    Route::get('employee/getEmployeeById/{id}',[MyteamController::class,'getEmployeeById']);
    Route::get('percentage/getPercentage',[FulfillmentController::class,'getPercentage']);
    Route::get('percentage/getPercentageDept/{data}',[FulfillmentController::class,'getPercentageDept']);
    Route::get('percentage/getPercentageCourses/{data}',[FulfillmentController::class,'getPercentageCourses']);
    Route::get('approve/getApproveDetail/{id}',[ApprovalController::class,'getApproveDetail']);
    Route::get('course/deactive/{id}', [CourseController::class, 'deactiveInHouse']);
    Route::get('course/active/{id}', [CourseController::class, 'activeInHouse']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

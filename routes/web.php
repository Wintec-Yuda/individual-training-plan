<?php

use App\Http\Controllers\ActivityHistoryController;
use App\Http\Controllers\ApprovalController;
use App\Http\Controllers\AuditTrailController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ExportController;
use App\Http\Controllers\FulfillmentController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LandingPageController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\MyteamController;
use App\Http\Controllers\SelfPlanningController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
// Home
Route::get('/', [HomeController::class, 'index']);
// Validate
Route::get('validate', [HomeController::class, 'validateApprove']);

// Login-Logout
Route::post('login', [LoginController::class, 'login']);
Route::get('logout/{id}', [LoginController::class, 'logout']);

Route::prefix('user')->group(function () {
    // Dashboard
    Route::get('dashboard', [DashboardController::class, 'index']);
    Route::post('dashboard/delegate', [DashboardController::class, 'delegate']);
    Route::get('dashboard/undelegate', [DashboardController::class, 'deleteDelegate']);
    // Course
    Route::get('course', [CourseController::class, 'index']);
    Route::post('course/public/add', [CourseController::class, 'addPublic']);
    Route::get('employee/detail/add/{employee_id}/{course_id}', [CourseController::class, 'addCourse']);
    Route::post('employee/detail/delete', [CourseController::class, 'deleteCourse']);
    Route::post('employee/detail/submit', [CourseController::class, 'submitCourse']);
    Route::post('employee/detail/reset', [CourseController::class, 'resetCourse']);
    // Myteam
    Route::get('employee/detail/{id}', [MyteamController::class, 'myTeamDetail']);
    Route::post('employee/detail/uploadImg', [MyteamController::class, 'addImg']);
    // Approval
    Route::get('approval', [ApprovalController::class, 'index']);
    Route::get('approval/detail/{id}/{id_approve}', [ApprovalController::class, 'approval_detail']);
    Route::post('approval/detail/reject', [ApprovalController::class, 'approval_reject']);
    Route::post('approval/detail/approve', [ApprovalController::class, 'approval_approve']);
});

Route::prefix('admin')->group(function () {
    // Dashboard
    Route::get('dashboard', [DashboardController::class, 'admin']);
    // LandingPage
    Route::get('landingPage', [LandingPageController::class, 'index']);
    Route::post('landingPage/addImg', [LandingPageController::class, 'addImg']);
    Route::post('landingPage/addVideo', [LandingPageController::class, 'addVideo']);
    Route::get('landingPage/deleteImg/{id}', [LandingPageController::class, 'deleteImg']);
    Route::get('landingPage/deleteVideo/{id}', [LandingPageController::class, 'deleteVideo']);
    Route::post('landingPage/addBestEmployee', [LandingPageController::class, 'addBestEmployee']);
    Route::get('landingPage/deleteBestEmployee/{id}', [LandingPageController::class, 'deleteBestEmployee']);
    // Course
    Route::get('training', [CourseController::class, 'admin']);
    Route::post('course/add', [CourseController::class, 'addOrUpdateInHouse']);
    // Fulfillment
    Route::get('realization', [FulfillmentController::class, 'index']);
    Route::post('realization/action', [FulfillmentController::class, 'action']);
    Route::get('percentage', [FulfillmentController::class, 'percentage']);
    // Export
    Route::post('export', [ExportController::class, 'exportAdmin']);
    // Audit
    Route::get('audit',[AuditTrailController::class,'index']);
    Route::post('audit',[AuditTrailController::class,'index']);
});

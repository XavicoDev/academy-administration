<?php

use App\Http\Controllers\Auth\AdminLoginController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\StudentCourseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/login', 'Auth\LoginController@showLoginForm')->name('login');
Route::get('admin/login', [AdminLoginController::class, 'showLoginForm'])->name('admin.login');
Route::post('admin/login', [AdminLoginController::class, 'login']);
Route::post('admin/logout', [AdminLoginController::class, 'logout'])->name('admin.logout');

Route::get('/students', [StudentController::class, 'index']);
Route::get('/students/{id}', [StudentController::class, 'show']);
Route::post('/students', [StudentController::class, 'store']);
Route::put('/students/{id}', [StudentController::class, 'update']);
Route::patch('/students/{id}', [StudentController::class, 'updatePartial']);
Route::delete('/students/{id}', [StudentController::class, 'destroy']);

Route::get('/courses', [CourseController::class, 'index']);
Route::get('/courses/{id}', [CourseController::class, 'show']);
Route::post('/courses', [CourseController::class, 'store']);
Route::put('/courses/{id}', [CourseController::class, 'update']);
Route::patch('/courses/{id}', [CourseController::class, 'updatePartial']);
Route::delete('/courses/{id}', [CourseController::class, 'destroy']);

Route::get('students/{studentId}/courses', [StudentCourseController::class, 'getCoursesForStudent']);
Route::post('students/{studentId}/courses/{courseId}', [StudentCourseController::class, 'enrollStudentInCourse']);
Route::delete('students/{studentId}/courses/{courseId}', [StudentCourseController::class, 'removeStudentFromCourse']);
//statistics
Route::get('statistics/top-courses', [StudentCourseController::class, 'topCoursesWithMostStudents']);
Route::get('statistics/top-students', [StudentCourseController::class, 'topStudentsWithMostCourses']);
Route::get('statistics/total-courses', [StudentCourseController::class, 'totalCourses']);
Route::get('statistics/total-students', [StudentCourseController::class, 'totalStudents']);


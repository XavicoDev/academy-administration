<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\StudentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/login', 'Auth\LoginController@showLoginForm')->name('login');
Route::post('/login', [LoginController::class, 'authenticate']);

Route::get('/students', [StudentController::class, 'index']);

Route::get('/students/{id}', [StudentController::class, 'show']);

Route::post('/students', [StudentController::class, 'store']);

Route::put('/students/{id}', [StudentController::class, 'update']);

Route::patch('/students/{id}', [StudentController::class, 'updatePartial']);

Route::delete('/students/{id}', [StudentController::class, 'destroy']);

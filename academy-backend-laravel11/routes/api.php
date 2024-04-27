<?php

use App\Http\Controllers\studentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/students', [studentController::class, 'index']);

Route::get('/students/{id}', [studentController::class, 'show']);

Route::post('/students', [studentController::class, 'store']);

Route::put('/students/{id}', [studentController::class, 'update']);

Route::patch('/students/{id}', [studentController::class, 'updatePartial']);

Route::delete('/students/{id}', [studentController::class, 'destroy']);

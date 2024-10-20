<?php

use App\Http\Controllers\People\PeopleController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

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

Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->middleware('auth:sanctum');
Route::post('/register', [RegisteredUserController::class, 'register']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/get-people-records',[PeopleController::class,'getPeopleRecord']);
Route::post('/store-people',[PeopleController::class,'storePeopleRecord']);
Route::get('/delete-people-record/{id}',[PeopleController::class,'deletePeopleRecord']);
Route::post('/update-people-record',[PeopleController::class,'updatePeopleRecord']);

// axios.post('/api/update-people-record')
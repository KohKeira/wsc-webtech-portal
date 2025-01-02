<?php

use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TrainingController;
use App\Http\Controllers\TrainingSessionController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\VerifyAdminRole;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::resource('trainings', TrainingController::class);

    Route::middleware(VerifyAdminRole::class)->group(function () {
        Route::resource('users', UserController::class, ['except' => 'index']);

        Route::prefix('attendances')->group(function () {
            Route::get('/edit/{training}', [AttendanceController::class, 'edit'])->name('attendances.edit');
            Route::get('/create/{training}', [AttendanceController::class, 'create'])->name('attendances.create');
            Route::post('/{training}', [AttendanceController::class, 'store'])->name('attendances.store');
            Route::put('/{training}', [AttendanceController::class, 'update'])->name('attendances.update');

        });

    });
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
});


require __DIR__ . '/auth.php';

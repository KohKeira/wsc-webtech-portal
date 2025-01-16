<?php

use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProgressController;
use App\Http\Controllers\TrainingController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\VerifyAdminRole;
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

        Route::resource('trainings.attendances', AttendanceController::class)->shallow()->only(['create', 'store']);
        Route::put('/trainings/{training}/attendances', [AttendanceController::class, 'update'])->name('trainings.attendances.update');
        Route::get('/trainings/{training}/attendances/edit', [AttendanceController::class, 'edit'])->name('trainings.attendances.edit');
    });
    Route::get('/attendances', [AttendanceController::class, 'index'])->name('attendances.index');
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::resource('users.progresses', ProgressController::class)->shallow()->except('index');
    Route::get('/progresses', [ProgressController::class, 'index'])->name('progresses.index');


});


require __DIR__ . '/auth.php';

<?php

use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProgressController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\TrainingController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\VerifyAdminRole;
use App\Models\Attendance;
use App\Models\Progress;
use App\Models\Training;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
    ]);
});

Route::get('/dashboard', function () {
    $user = auth()->user();
    if ($user->role === 'student') {
        $progress = $user->progresses();
        $totalProgress = $progress->count();

        $completeProgress = $progress->where('status', '=', 'Completed')->count();
        $percentageProgress = ($completeProgress / ($totalProgress === 0 ? 1 : $totalProgress)) * 100;

        $attendance = $user->attendances();
        $totalAttendance = $attendance->count();

        $completeAttendance = $attendance->where('present', '=', 1)->count();
        $percentageAttendance = ($completeAttendance / ($totalAttendance === 0 ? 1 : $totalAttendance)) * 100;

        $initiatedTraining = $user->trainings()->count();

        $data = ['progress' => $percentageProgress, 'attendance' => $percentageAttendance, 'initiatedTraining' => $initiatedTraining, 'trainingCompleted' => $completeAttendance];
    } else {
        $progress = Progress::query();
        $totalProgress = $progress->count();

        $completeProgress = $progress->where('status', '=', 'Completed')->count();
        $percentageProgress = ($completeProgress / ($totalProgress === 0 ? 1 : $totalProgress)) * 100;

        $students = User::where('role', '=', 'student')->count();

        $attendance = Attendance::query();
        $totalAttendance = $attendance->count();

        $completeAttendance = $attendance->where('present', '=', 1)->count();
        $percentageAttendance = ($completeAttendance / ($totalAttendance === 0 ? 1 : $totalAttendance)) * 100;

        $initiatedTraining = $user->trainings()->whereDate('date', '<', today())->count();

        $data = ['progress' => $percentageProgress, 'students' => $students, 'attendance' => $percentageAttendance, 'trainingCompleted' => $initiatedTraining];
    }
    $trainings = Training::with('user')->get();
    $tasks = $user->tasks;
    return Inertia::render('Dashboard/Index', compact(['data', 'trainings', 'tasks']));

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
    Route::resource('tasks', TaskController::class)->only(['store', 'destroy']);


});


require __DIR__ . '/auth.php';

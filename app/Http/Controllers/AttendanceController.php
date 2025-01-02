<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Training;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $training = Training::find(request('training'));
        if ($training->attendances()->exists()) {
            return redirect()->route('trainings.index');
        }
        $students = User::where('role', '=', 'student')->get();
        return Inertia::render('Attendance/Add', compact(['students', 'training']));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $attendanceList = $request->attendance;
        foreach ($attendanceList as $a) {
            // dd($a);
            Attendance::create(['present' => $a['present'], 'training_id' => $request->training, 'user_id' => $a['user']['id']]);
        }
        return redirect()->route('trainings.index')->with('message', 'Attendance created successfully.');

    }

    /**
     * Display the specified resource.
     */
    public function show(Attendance $attendance)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Attendance $attendance)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Attendance $attendance)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Attendance $attendance)
    {
        //
    }
}

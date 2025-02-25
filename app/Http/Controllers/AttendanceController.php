<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Training;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (auth()->user()->role === 'student') {
            $attendances = auth()->user()->attendances()->with('training.user')->get();
            return Inertia::render('Attendance/Index', compact('attendances'));

        } else {
            $attendances = Attendance::with(['training.user', 'user'])->get();
            $students = User::where('role', '=', 'student')->get(['id', 'name']);
            return Inertia::render('Attendance/Index', compact(['attendances', 'students']));

        }

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Training $training)
    {
        if ($training->attendances()->exists() || Carbon::parse($training->date) != today()) {
            return redirect()->route('trainings.index');
        }
        $students = User::where('role', '=', 'student')->get();
        return Inertia::render('Attendance/Add', compact(['students', 'training']));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Training $training)
    {
        $attendanceList = $request->attendance;
        foreach ($attendanceList as $a) {
            // dd($a);
            Attendance::create(['present' => $a['present'], 'training_id' => $training->id, 'user_id' => $a['user']['id']]);
        }
        return redirect()->route('trainings.index')->with('message', 'Attendance created successfully.');

    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Training $training)
    {
        if (!$training->attendances()->exists() || Carbon::parse($training->date) != today()) {
            return redirect()->route('trainings.index');
        }
        $attendances = $training->attendances()->with('user')->get();
        return Inertia::render('Attendance/Edit', compact(['attendances', 'training']));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Training $training)
    {
        $attendanceList = $request->attendance;
        foreach ($attendanceList as $a) {
            Attendance::where('id', '=', $a['id'])->update(['present' => $a['present']]);
        }
        return redirect()->route('trainings.index')->with('message', 'Attendance updated successfully.');

    }
    public function download()
    {
        $training = request('training_date');
        $attendances = Attendance::with('user');
        if ($training) {
            $attendances->whereRelation('training', 'date', '=', $training);
        }
        $attendances = $attendances->get(['user_id', 'training_id', 'present']);

        // Write data to CSV
        $csvFileName = 'attendance.csv';
        $csvFile = fopen($csvFileName, 'w');
        $headers = ['student', 'training_id', 'present'];

        fputcsv($csvFile, $headers);

        foreach ($attendances as $row) {
            $data['student'] = $row->user->name;
            $data['training_id'] = $row->training_id;
            $data['present'] = $row->present;

            fputcsv($csvFile, $data);
        }

        fclose($csvFile);

        // Download the CSV file
        return response()->download($csvFileName)->deleteFileAfterSend(true);
    }

}

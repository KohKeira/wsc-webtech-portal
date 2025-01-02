<?php

namespace App\Http\Controllers;

use App\Models\Training;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TrainingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $lecturerTrainings = Training::with('user')->whereRelation('user', 'role', '=', 'lecturer')->whereDate('date', '>=', today())->get();
        $studentTrainings = Training::with('user')->whereRelation('user', 'role', '=', 'student')->whereDate('date', '>=', today())->get();
        return Inertia::render('Trainings/Index', compact(['lecturerTrainings', 'studentTrainings']));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Trainings/Add');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:2000',
            'mode' => 'required|string|in:virtual,physical',
            'module' => 'required|string|in:A,B,C,D,E,F',
            'venue' => 'required|string',
            'date' => 'required|date|after_or_equal:today',
            'start_time' => 'required|date_format:H:i|after_or_equal:09:00|before:end_time',
            'end_time' => 'required|date_format:H:i|after:start_time|before_or_equal:18:00',
        ]);

        auth()->user()->trainings()->create([
            ...$request->all(),
            'date' => Carbon::createFromFormat('Y-m-d', explode('T', $request->date)[0])
        ]);

        return redirect()->route('trainings.index')->with('message', 'Training created successfully.');
    }
    public function edit(Training $training)
    {
        if (auth()->user()->id !== $training->id) {
            return redirect()->route('trainings.index');
        }
        return Inertia::render('Trainings/Edit', compact('training'));
    }
    public function update(Request $request, Training $training)
    {
        if (auth()->user()->id !== $training->id) {
            return redirect()->route('trainings.index');
        }
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:2000',
            'mode' => 'required|string|in:virtual,physical',
            'module' => 'required|string|in:A,B,C,D,E,F',
            'venue' => 'required|string',
            'date' => 'required|date|after_or_equal:today',
            'start_time' => 'required|date_format:H:i|after_or_equal:09:00|before:end_time',
            'end_time' => 'required|date_format:H:i|after:start_time|before_or_equal:18:00',
        ]);

        $training->update([
            ...$request->all(),
            'date' => Carbon::createFromFormat('Y-m-d', explode('T', $request->date)[0])
        ]);

        return redirect()->route('trainings.index')->with('message', 'Training updated successfully.');
    }
    public function destroy(Training $training)
    {
        if (auth()->user()->id !== $training->id) {
            return redirect()->route('trainings.index');
        }
        $training->delete();
        return back()->with('message', 'Training deleted successfully.');
    }

}

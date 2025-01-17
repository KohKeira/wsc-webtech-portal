<?php

namespace App\Http\Controllers;

use App\Models\Progress;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class ProgressController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $progress = auth()->user()->progresses;
        return Inertia::render('Progress/Index', compact('progress'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(User $user)
    {
        if (auth()->user()->id !== $user->id || $user->role === 'lecturer') {
            return redirect()->route('progresses.index');

        }
        return Inertia::render('Progress/Add');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'country' => 'required|string',
            'module' => 'required|string|in:A,B,C,D,E,F',
            'year' => 'required|before_or_equal:' . Carbon::now()->year,
            'status' => 'required|string|in:Completed,In Progress,Not Done',
            'repository' => 'nullable|url',
            'review' => 'required|boolean'
        ]);
        auth()->user()->progresses()->create([
            ...$request->all()
        ]);
        return redirect()->route('progresses.index')->with('message', 'Progress created successfully.');

    }

    /**
     * Display the specified resource.
     */
    public function show(Progress $progress)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Progress $progress)
    {
        if (auth()->user()->id !== $progress->user_id) {
            return redirect()->route('progresses.index');

        }
        return Inertia::render('Progress/Edit',compact('progress'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Progress $progress)
    {
        $request->validate([
            'country' => 'required|string',
            'module' => 'required|string|in:A,B,C,D,E,F',
            'year' => 'required|before_or_equal:' . Carbon::now()->year,
            'status' => 'required|string|in:Completed,In Progress,Not Done',
            'repository' => 'nullable|url',
            'review' => 'required|boolean'
        ]);
        $progress->update([
            ...$request->all()
        ]);
        return redirect()->route('progresses.index')->with('message', 'Progress updated successfully.');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Progress $progress)
    {
        if (auth()->user()->id !== $progress->user_id) {
            return redirect()->route('progresses.index');
        }
        $progress->delete();
        return back()->with('message', 'Progress deleted successfully.');
    }
}

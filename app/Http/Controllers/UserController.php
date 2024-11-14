<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Users/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Users/Add');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if ($request->has('name')) {
            $request->merge(['name' => Str::title($request->name)]);
        }
        $request->validate([
            'name' => 'required|string|unique:users',
            'email' => 'required|email|unique:users',
            'gender' => 'required|in:female,male',
            'role' => 'required|in:student,lecturer',
            'phone_number' => ['required', 'regex:/^[6,8-9]\d{7}$/', 'unique:users'],
            'avatar_file' => 'file|mimes:png,jpg,jpeg'
        ]);

        $emailDomain = Str::after($request->email, '@');
        if (($request->role === 'lecturer' && $emailDomain !== 'tp.edu.sg') || ($request->role === 'student' && $emailDomain !== 'student.tp.edu.sg')) {
            return back()->withErrors(['email' => 'Invalid email domain.'])->withInput();
        }
        if ($request->role === 'student') {
            $adminNumber = Str::before($request->email, '@');
            if (!preg_match('/^2\d{6}[a-zA-Z]$/', $adminNumber)) {
                return back()->withErrors(['email' => 'Student email format is invalid'])->withInput();
            }
        }

        $user = User::create($request->all());
        $image = $request->file('avatar_file');

        if ($image) {
            $avatar = $image->storePublicly('avatar','public');
            $user->update(compact('avatar'));
        }

        return redirect()->route('users.index')->with('message', 'User created successfully');


    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}

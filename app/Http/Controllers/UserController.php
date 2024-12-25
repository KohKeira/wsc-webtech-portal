<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Storage;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roles = ['lecturer', 'student'];
        $users = User::where('id', '<>', auth()->user()->id)->get()->groupBy('role');
        $users = collect($roles)->mapWithKeys(function ($role) use ($users) {
            return [$role => $users->get($role, collect([]))];
        });
        return Inertia::render('Users/Index', compact('users'));
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
            $avatar = $image->storePublicly('avatar', 'public');
            $user->update(compact('avatar'));
        }

        return redirect()->route('users.index')->with('message', 'User created successfully');


    }

    // @codeCoverageStartEnd    
    public function show(User $user)
    {
        //
    }
    // @codeCoverageIgnoreEnd

    // @codeCoverageStartEnd    
    public function edit(User $user)
    {
        return Inertia::render('Users/Edit', compact('user'));
    }
    // @codeCoverageIgnoreEnd

    // @codeCoverageStartEnd    
    public function update(Request $request, User $user)
    {
        if ($request->has('name')) {
            $request->merge(['name' => Str::title($request->name)]);
        }
        // dd($request);
        $request->validate([
            'name' => 'required|string|unique:users,name,' . $user->id,
            'email' => 'required|email|unique:users,email,' . $user->id,
            'gender' => 'required|in:female,male',
            'phone_number' => ['required', 'regex:/^[6,8-9]\d{7}$/', 'unique:users,phone_number,' . $user->id],
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
        $originalAvatar = $user->avatar;
        $user->update($request->except(['avatar']));
        $image = $request->file('avatar_file');

        if ($image) {
            $avatar = $image->storePublicly('avatar', 'public');
            $user->update(compact('avatar'));
            // delete avatar from storage
            if ($originalAvatar) {
                Storage::disk('public')->delete($originalAvatar);
            }
        }

        return redirect()->route('users.index')->with('message', 'User updated successfully');
    }
    // @codeCoverageIgnoreEnd

    // @codeCoverageStartEnd    
    public function destroy(User $user)
    {
        $avatar = $user->avatar;
        if ($avatar) {
            Storage::disk('public')->delete($avatar);
        }
        $user->delete();
        return back()->with('message', 'User deleted successfully');
    }
    // @codeCoverageIgnoreEnd

}

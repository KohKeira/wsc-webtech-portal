<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Services\PrometheusService;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use Log;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request, PrometheusService $prometheusService): RedirectResponse
    {
        $request->authenticate($prometheusService);

        $user = $request->user();

        // change password for newly created user
        if (is_null($user->last_login)) {
            Auth::guard('web')->logout();
            return redirect(route('password.request'))->with('message', 'Newly created account requires user to change password.');
        }

        // Update last login timestamp
        $user->update(['last_login' => Carbon::now()]);
        $request->session()->regenerate();
        $prometheusService->incrementLogin(auth()->user()->role);
        $prometheusService->setActiveUserCount(auth()->user()->role);
        Log::info("User: $user->name has logged in.");

        return redirect()->intended(route('dashboard', absolute: false));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request, PrometheusService $prometheusService): RedirectResponse
    {
        $prometheusService->setActiveUserCount(auth()->user()->role,1, 'dec');

        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}

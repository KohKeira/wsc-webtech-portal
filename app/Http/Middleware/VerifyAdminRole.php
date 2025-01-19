<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Log;
use Symfony\Component\HttpFoundation\Response;

class VerifyAdminRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {   
        $user = auth()->user();
        if ($user->role !== 'lecturer') {
            $url = $request->url();
            Log::warning("Unauthorised access to $url by User: $user->name");
            return redirect()->route('dashboard');
        }

        return $next($request);
    }
}

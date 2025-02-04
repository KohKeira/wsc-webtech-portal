<?php

namespace App\Providers;

use App\Models\User;
use App\Services\PrometheusService;
use Gate;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Prometheus\CollectorRegistry;
use Prometheus\Storage\APCng;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(CollectorRegistry::class, function () {

            return new CollectorRegistry(new APCng());

        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        Gate::define('viewPulse', function (User $user) {
            return $user->role === 'lecturer';
        });
        $this->app->singleton( PrometheusService::class, PrometheusService::class );

    }
}

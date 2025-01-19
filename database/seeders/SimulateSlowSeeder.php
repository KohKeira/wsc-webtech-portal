<?php

namespace Database\Seeders;

use App\Jobs\SlowJob;
use Cache;
use DB;
use Http;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Log;

class SimulateSlowSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->simulateSlowHttpRequest();
        $this->simulateSlowQuery();
        $this->dispatchSlowJobs();
        $this->simulateException();
        $this->simulateCache();
    }
    private function simulateSlowHttpRequest()
    {
        Log::info('Simulating slow HTTP request...');
        try {
            $response = Http::timeout(10)->get('https://httpbin.org/delay/5');
            Log::info('Slow HTTP response received:', ['body' => $response->body()]);
        } catch (\Exception $e) {
            Log::error('Error during slow HTTP request simulation: ' . $e->getMessage());
        }
    }

    private function simulateSlowQuery()
    {
        Log::info('Executing a slow query...');
        DB::statement('SELECT SLEEP(5)');
        Log::info('Slow query completed.');
    }

    private function dispatchSlowJobs()
    {
        Log::info('Dispatching slow jobs...');
        for ($i = 1; $i <= 5; $i++) {
            SlowJob::dispatch("Task {$i}")->delay(now()->addSeconds($i));
            Log::info("Dispatched SlowJob {$i}.");
        }
    }

    public function simulateException()
    {
        throw new \Exception("Something went wrong. Please try again.");
    }

    public function simulateCache()
    {
        // Simulating cache store
        $key = 'data';
        $value = ['name' => 'John Doe'];

        // Store the value in the cache for 60 seconds (1 minute)
        Cache::put($key, $value, 60);

        Log::info('Data has been cached: ' . json_encode($value));

        // Simulating cache retrieval
        $cachedValue = Cache::get($key);

        if ($cachedValue) {
            Log::info('Cache hit: ' . json_encode($cachedValue));
        } else {
            Log::warning('Cache miss: Data not found.');
        }

        // Simulate cache deletion
        Cache::forget($key);
        Log::info('Cache has been deleted.');

        return response()->json([
            'cached_data' => $cachedValue,
        ]);
    }

}

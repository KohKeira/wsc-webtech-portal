<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Log;

class SlowJob implements ShouldQueue
{
    use Queueable;

    public $task;
    /**
     * Create a new job instance.
     */
    public function __construct($task)
    {
        $this->task = $task;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Log::info("Processing {$this->task}...");
        sleep(5); // Simulate slow job processing
        Log::info("Completed {$this->task}.");
    }
}

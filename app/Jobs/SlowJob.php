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
    public function handle()
    {
        Log::info("Processing {$this->task}. Please wait for 2 seconds.");
        sleep(2);

        if (random_int(1, 2) === 1) {
            throw new \Exception("Error for {$this->task}.");
        }
        Log::info("Completed {$this->task}.");

    }

}

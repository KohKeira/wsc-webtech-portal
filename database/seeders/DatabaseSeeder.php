<?php

namespace Database\Seeders;

use App\Models\TrainingSession;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::create([
            'name' => 'James Lee',
            'email' => '2301234A@student.tp.edu.sg',
            'gender' => 'male',
            'phone_number' => 91234567,
            'role' => 'student',
            'password' => 'test',
        ])->trainings()
            ->create([
                'title' => "React",
                'description' => "State Management and Hooks",
                'mode' => 'physical',
                'venue' => 'IRC',
                'module' => 'D',
                'date' => new Carbon('2025-01-20'),
                'start_time' => new Carbon('09:00:00'),
                'end_time' => new Carbon('13:00:00'),
            ]);

        User::create([
            'name' => 'Ana Yap',
            'email' => 'ana_yap@tp.edu.sg',
            'gender' => 'female',
            'phone_number' => 81234567,
            'role' => 'lecturer',
            'password' => 'test',
            'last_login' => Carbon::now()
        ])->trainings()
            ->create([
                'title' => "HTML",
                'description' => "Basic Web Structure",
                'mode' => 'virtual',
                'venue' => 'MsTeams',
                'module' => 'A',
                'date' => new Carbon('2025-01-13'),
                'start_time' => new Carbon('09:00:00'),
                'end_time' => new Carbon('13:00:00'),
            ]);
    }
}

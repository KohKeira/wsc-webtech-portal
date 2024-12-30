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
        ]);
        User::create([
            'name' => 'Ana Yap',
            'email' => 'ana_yap@tp.edu.sg',
            'gender' => 'female',
            'phone_number' => 81234567,
            'role' => 'lecturer',
            'password' => 'test',
            'last_login' => Carbon::now()

        ]);
    }
}

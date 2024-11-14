<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

uses(RefreshDatabase::class);

test('user can be created with lecturer role', function () {
    $this->seed();
    $lecturer = User::where('role', '=', 'lecturer')->first();
    $newUser = [
        'name' => 'James Tan',
        'email' => '2301234B@student.tp.edu.sg',
        'gender' => 'male',
        'phone_number' => 91234565,
        'role' => 'student',
    ];
    $response = $this->actingAs($lecturer)->post('/users', $newUser);
    $response->assertSessionHasNoErrors();
    $response->assertStatus(302);
    $response->assertRedirect('/users');
    $this->assertDatabaseHas('users', $newUser);
    $this->followRedirects($response)->assertSee('User created successfully');

});

test('user cannot be created with student role', function () {
    $this->seed();
    $student = User::where('role', '=', 'student')->first();
    $newUser = [
        'name' => 'James Tan',
        'email' => '2301234B@student.tp.edu.sg',
        'gender' => 'male',
        'phone_number' => 91234565,
        'role' => 'student',
        'password' => 'test'
    ];
    $response = $this->actingAs($student)->post('/users', $newUser);
    $response->assertStatus(302);
    $response->assertRedirect('/dashboard');

});

test('user cannot be created with no login', function () {
    $newUser = [
        'name' => 'James Tan',
        'email' => '2301234B@student.tp.edu.sg',
        'gender' => 'male',
        'phone_number' => 91234565,
        'role' => 'student',
        'password' => 'test'
    ];
    $response = $this->post('/users', $newUser);
    $response->assertStatus(302);
    $response->assertRedirect('/login');

});

test('user cannot be created with validation error', function ($newUser, $invalidFields) {
    $this->seed();
    $lecturer = User::where('role', '=', 'lecturer')->first();
    $response = $this->actingAs($lecturer)->post('/users', $newUser);
    $response->assertSessionHasErrors($invalidFields);
    $response->assertStatus(302);
    $this->assertDatabaseMissing('users', ['email' => $newUser['email']]);

})->with([
            [
                // test for missing required fields
                [
                    'name' => '',
                    'email' => '',
                    'gender' => '',
                    'phone_number' => '',
                    'role' => '',
                    'password' => ''
                ],
                [
                    'name',
                    'email',
                    'gender',
                    'role',
                    'phone_number',
                ]
            ],
            [
                // test format of email and phone number
                [
                    'name' => 'James Tan',
                    'email' => '2301234Astudent.tp.edu.sg',
                    'gender' => 'male',
                    'phone_number' => 31234567,
                    'role' => 'student',
                ],
                [
                    'email',
                    'phone_number',
                ]
            ],
            [
                // test invalid role and gender
                [
                    'name' => 'James Tan',
                    'email' => '2301234B@student.tp.edu.sg',
                    'gender' => 'other',
                    'phone_number' => 81234567,
                    'role' => 'teacher',
                ],
                [
                    'gender',
                    'role',
                ]
            ],
            [
                // test email domain for student
                [
                    'name' => 'James Tan',
                    'email' => '2301234B@tp.edu.sg',
                    'gender' => 'male',
                    'phone_number' => 61234567,
                    'role' => 'student',
                ],
                [
                    'email' => 'Invalid email domain.'
                ]
            ],
            [
                // test email username for student
                [
                    'name' => 'James Tan',
                    'email' => 'james@student.tp.edu.sg',
                    'gender' => 'male',
                    'phone_number' => 61234567,
                    'role' => 'student',
                ],
                [
                    'email' => 'Student email format is invalid'
                ]
            ],
            [
                // test email domain for lecturer
                [
                    'name' => 'James Tan',
                    'email' => 'james@sutdent.tp.edu.sg',
                    'gender' => 'male',
                    'phone_number' => 61234567,
                    'role' => 'lecturer',
                ],
                [
                    'email' => 'Invalid email domain.'
                ]
            ]
        ]);

test('duplicated user cannot be created', function () {
    $this->seed();
    $lecturer = User::where('role', '=', 'lecturer')->first();
    $newUser = User::where('role', '=', 'student')->first()->toArray();
    $response = $this->actingAs($lecturer)->post('/users', $newUser);
    $response->assertSessionHasErrors(['name', 'email', 'phone_number']);
    $response->assertStatus(302);

});

test('upload avatar when user created successfully', function () {
    $this->seed();
    $lecturer = User::where('role', '=', 'lecturer')->first();
    $newUser = [
        'name' => 'James Tan',
        'email' => '2301234B@student.tp.edu.sg',
        'gender' => 'male',
        'phone_number' => 91234565,
        'role' => 'student',
    ];
    Storage::fake('public');
    $file = UploadedFile::fake()->image('avatar.jpg');
    $response = $this->actingAs($lecturer)->post('/users', [...$newUser, 'avatar_file' => $file]);
    $response->assertSessionHasNoErrors();
    $response->assertStatus(302);
    $this->assertDatabaseHas('users', $newUser);
    Storage::disk('public')->assertExists('avatar/' . $file->hashName());
    $this->followRedirects($response)->assertSee('User created successfully');

});
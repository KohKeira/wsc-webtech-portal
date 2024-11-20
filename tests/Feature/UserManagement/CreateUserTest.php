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
    $this->assertDatabaseMissing('users', $newUser);

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
    $this->assertDatabaseMissing('users', $newUser);

    $response->assertRedirect('/login');

});

test('user cannot be created with validation error', function ($newUser, $invalidFields) {
    $this->seed();
    $lecturer = User::where('role', '=', 'lecturer')->first();
    $response = $this->actingAs($lecturer)->post('/users', $newUser);
    $response->assertSessionHasErrors($invalidFields);
    $response->assertStatus(302);
    $this->assertDatabaseMissing('users', $newUser);

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
                    'name' => 'The name field is required.',
                    'email' => 'The email field is required.',
                    'gender' => 'The gender field is required.',
                    'role' => 'The role field is required.',
                    'phone_number' => 'The phone number field is required.',
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
                    'email' => 'The email field must be a valid email address.',
                    'phone_number' => 'The phone number field format is invalid.',
                ]
            ],
            [
                // test format of  phone number
                [
                    'name' => 'James Tan',
                    'email' => '2301234B@student.tp.edu.sg',
                    'gender' => 'male',
                    'phone_number' => '3@234567',
                    'role' => 'student',
                ],
                [
                    'phone_number' => 'The phone number field format is invalid.',
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
                    'gender' => 'The selected gender is invalid.',
                    'role' => 'The selected role is invalid.',
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
    $response->assertSessionHasErrors([
        'name' => 'The name has already been taken.',
        'email' => 'The email has already been taken.',
        'phone_number' => 'The phone number has already been taken.'
    ]);
    $this->assertDatabaseMissing('users', $newUser);

    $response->assertStatus(302);

});


// avatar file validation
test('user created successfully with avatar', function () {
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
    Storage::disk('public')->assertMissing('avatar/' . $file->hashName());
    $response = $this->actingAs($lecturer)->post('/users', [...$newUser, 'avatar_file' => $file]);
    $response->assertSessionHasNoErrors();
    $response->assertStatus(302);
    $this->assertDatabaseHas('users', [...$newUser, 'avatar' => 'avatar/' . $file->hashName()]);
    Storage::disk('public')->assertExists('avatar/' . $file->hashName());
    $this->followRedirects($response)->assertSee('User created successfully');

});

test('user cannot be created with wrong avatar file type', function () {
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
    $file = UploadedFile::fake()->create(
        'document.pdf',
        500,
        'application/pdf'
    );
    Storage::disk('public')->assertMissing('avatar/' . $file->hashName());
    $response = $this->actingAs($lecturer)->post('/users', [...$newUser, 'avatar_file' => $file]);
    $response->assertSessionHasErrors(['avatar_file' => 'The avatar file field must be a file of type: png, jpg, jpeg.']);
    $response->assertStatus(302);
    $this->assertDatabaseMissing('users', [...$newUser, 'avatar' => 'avatar/' . $file->hashName()]);
    Storage::disk('public')->assertMissing('avatar/' . $file->hashName());

});
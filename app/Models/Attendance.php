<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    protected $fillable = [
        'training_id',
        'user_id',
        'present'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function training()
    {
        return $this->belongsTo(Training::class);
    }
}

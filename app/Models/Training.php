<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Training extends Model
{
    /** @use HasFactory<\Database\Factories\TrainingSessionFactory> */
    use HasFactory;
    protected $appends = ['attendance_exist'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'description',
        'mode',
        'module',
        'venue',
        'date',
        'start_time',
        'end_time',
        'user_id'
    ];

    /**
     * Get the user that owns the training session.
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }

    public function getAttendanceExistAttribute()
    {
        return $this->attendances()->exists();
    }
}

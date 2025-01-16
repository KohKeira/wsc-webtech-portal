<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Progress extends Model
{
    protected $fillable = [
        'country',
        'module',
        'year',
        'status',
        'repository',
        'review',
        'user_id',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

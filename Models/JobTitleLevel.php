<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobTitleLevel extends Model
{
    use HasFactory;
    protected $casts = ['code'=>'string'];
    protected $primaryKey = 'code';
    protected $fillable = [
        'code',
        'name'
    ];
}

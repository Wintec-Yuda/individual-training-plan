<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;
    public $timestamps = false; 
    protected $fillable = [
        'id',
        'title',
        'target',
        'type',
        'duration',
        'id_course_type',
        'path',
        'refresh'
    ];

    public function CourseType()
    {
        return $this->belongsTo(CourseType::class,'id_course_type');
    }
}

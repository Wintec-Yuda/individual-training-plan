<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TrainingActivity extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'id',
        'id_employee',
        'id_course',
        'date',
        'note',
        'status',
        'date_approved',
    ];

    public function Employee()
    {
        return $this->belongsTo(Employee::class,'id_employee');
    }
    public function Course()
    {
        return $this->belongsTo(Course::class,'id_course');
    }
}

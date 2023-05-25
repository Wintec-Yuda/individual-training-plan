<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AuditTrail extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'id_employee',
        'activity',
        'id_target',
        'id_course',
        'time',
        'date',
        'ip',
    ];

    public function Employee()
    {
        return $this->belongsTo(Employee::class,'id_employee');
    }
    public function Target()
    {
        return $this->belongsTo(Employee::class,'id_target');
    }
    public function Course()
    {
        return $this->belongsTo(Course::class,'id_course');
    }
}

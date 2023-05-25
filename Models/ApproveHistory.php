<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApproveHistory extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'id',
        'id_employee',
        'approve1',
        'approve2',
        'approve3',
        'approve4',
        'date1',
        'date2',
        'date3',
        'date4',
    ];

    public function Employee()
    {
        return $this->belongsTo(Employee::class, 'id_employee');
    }
    public function Approve1()
    {
        return $this->belongsTo(Employee::class, 'approve1');
    }
    public function Approve2()
    {
        return $this->belongsTo(Employee::class, 'approve2');
    }
    public function Approve3()
    {
        return $this->belongsTo(Employee::class, 'approve3');
    }
    public function Approve4()
    {
        return $this->belongsTo(Employee::class, 'approve4');
    }
}

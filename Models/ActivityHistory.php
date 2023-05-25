<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActivityHistory extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'id_employee',
        'activity',
        'date',
        'note'
    ];
    
    public function Employee()
    {
        return $this->belongsTo(Employee::class, 'id_employee');
    }
}

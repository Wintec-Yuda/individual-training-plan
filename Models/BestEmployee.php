<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BestEmployee extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'id',
        'id_employee',
        'quote'
    ];

    public function Employee()
    {
        return $this->belongsTo(Employee::class,'id_employee');
    }
}

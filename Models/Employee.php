<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $casts = ['id'=>'string'];
    protected $fillable = [
        'id',
        'name',
        'email',
        'code_job_title',
        'code_organization',
        'code_job_title_level',
        'id_report',
        'id_employment',
        'approve',
        'id_approve',
        'path',
        'id_delegate',
        'delegate',
    ];

    public function JobTitle()
    {
        return $this->belongsTo(JobTitle::class,'code_job_title');
    }
    public function Organization()
    {
        return $this->belongsTo(Organization::class,'code_organization');
    }
    public function JobTitleLevel()
    {
        return $this->belongsTo(JobTitleLevel::class,'code_job_title_level');
    }
    public function Report()
    {
        return $this->belongsTo(Report::class,'id_report');
    }
    public function Employment()
    {
        return $this->belongsTo(Employment::class,'id_employment');
    }
    public function Status()
    {
        return $this->belongsTo(Status::class,'id_status');
    }
    public function Approve()
    {
        return $this->belongsTo(Approve::class,['id_employee','approve1','approve2','approve3','approve4'],'id');
    }
    public function ApproveEmployee()
    {
        return $this->belongsTo(Employee::class, 'id_approve');
    }
}

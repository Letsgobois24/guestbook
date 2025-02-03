<?php

namespace App\Models;

use CodeIgniter\Model;

class EmployeesModel extends Model
{
    protected $table            = 'employees';
    protected $primaryKey       = 'Id';
    protected $allowedFields = ['Name', 'Password', 'Email', 'IsAdmin', 'Photo'];

    public function getMeetingWith () {
        return $this->db->table('employees')
                        ->select('employees.Id, Name, Position')
                        ->join('guestbooks', 'employees.Id=guestbooks.EmployeeId')
                        ->get()
                        ->getResultArray();
    }
}
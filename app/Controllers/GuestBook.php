<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\HTTP\ResponseInterface;

class GuestBook extends BaseController
{
    protected $employeeModel;
    protected $guestBookModel;
    
    public function __construct()
    {
        $this->employeeModel = new \App\Models\EmployeesModel;
        $this->guestBookModel = new \App\Models\GuestBooksModel;
    }

    public function index()
    {
        if ($this->request->getMethod() == 'POST'){
            
            $rules = [
                'institutionName' => 'required',
                'PICName' => 'required',
                'phoneNumber' => 'required',
                'meetingWith' => 'required',
                'agendaDetails' => 'required',
                'identityPhoto' => 'required'
            ];

            $data = [
                'institutionName' => $this->request->getVar('institutionName'),
                'PICName' => $this->request->getVar('PICName'),
                'phoneNumber' => $this->request->getVar('phoneNumber'),
                'meetingWith' => $this->request->getVar('meetingWith'),
                'agendaDetails' => $this->request->getVar('agendaDetails'),
                'identityPhoto' => $this->request->getVar('identityPhoto')
            ];

            if (! $this->validateData($data, $rules)) {
                return redirect()->back()->withInput()->with('errors', $this->validator->getErrors());
            }
        }
        
        $data['employees'] = $this->employeeModel->getMeetingWith();

        return view('guestbook/index', $data);
    }
}

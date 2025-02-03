<?php

namespace App\Controllers;

use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;

use App\Models\GuestBooksModel;

class Guest extends ResourceController
{
    protected $guestBookModel;

    public function __construct()
    {
        $this->guestBookModel = new \App\Models\GuestBooksModel;
    }
    
    /**
     * Return an array of resource objects, themselves in array format.
     *
     * @return ResponseInterface
     */
    public function index()
    {
        
    }

    /**
     * Return the properties of a resource object.
     *
     * @param int|string|null $id
     *
     * @return ResponseInterface
     */
    public function show($id = null)
    {
        //
    }

    /**
     * Create a new resource object, from "posted" parameters.
     *
     * @return ResponseInterface
     */
    public function create()
    {
        $rules = [
            'institutionName' => 'required',
            'PICName' => 'required',
            'phoneNumber' => 'required',
            'meetingWith' => 'required',
            'agendaDetails' => 'required',
            'identityPhoto' => 'required'
        ];
        
        if (! $this->validate($rules)) {
            return $this->fail($this->validator->getErrors());
        }
        
        // $image = $this->request->getFile('image');
        // $imageName = $image->getRandomName();
        // $image->move('img/visitor', $imageName);
        
        $data = [
            'InstitutionName' => $this->request->getVar('institutionName'),
            'PICName' => $this->request->getVar('PICName'),
            'PhoneNumber' => $this->request->getVar('phoneNumber'),
            'EmployeeId' => $this->request->getVar('meetingWith'),
            'Purpose' => $this->request->getVar('agendaDetails'),
            'LiveCamPhoto' => $this->request->getVar('identityPhoto')
        ];
        
        $this->guestBookModel->save($data);

        return $this->respondCreated('Data telah tersimpan');
    }

    /**
     * Add or update a model resource, from "posted" properties.
     *
     * @param int|string|null $id
     *
     * @return ResponseInterface
     */
    public function update($id = null)
    {
        //
    }

    /**
     * Delete the designated resource object from the model.
     *
     * @param int|string|null $id
     *
     * @return ResponseInterface
     */
    public function delete($id = null)
    {
        //
    }
}

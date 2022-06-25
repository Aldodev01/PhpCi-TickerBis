<?php 

defined('BASEPATH') OR exit('No direct script access allowed');

class c_data_user extends CI_Controller{
    
    public function __construct()
    {
        parent::__construct();
        $this->load->model('M_data_user');
        $this->load->helper('url'); 
    }

    public function index(){
        $data['title'] = 'Data Member';
        $data['data_user'] = $this->M_data_user->getAll();
        $this->load->view('navbar');
        $this->load->view('data_member', $data);
    }


}
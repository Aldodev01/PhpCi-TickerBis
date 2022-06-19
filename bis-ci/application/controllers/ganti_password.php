<?php 
defined('BASEPATH') or exit('No direct script access allowed');

class ganti_password extends CI_Controller {

    public function index(){
        $this->load->view('navbar');
        $this->load->view('ganti_password');
    }
}
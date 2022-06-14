<?php 
defined('BASEPATH') or exit('No direct script access allowed');

class data_jadwal extends CI_Controller {

    public function index(){
         $this->load->view('navbar');
        $this->load->view('data_jadwal');
    }
}
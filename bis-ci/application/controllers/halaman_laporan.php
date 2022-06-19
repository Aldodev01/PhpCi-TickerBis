<?php 
defined('BASEPATH') or exit('No direct script access allowed');

class halaman_laporan extends CI_Controller {

    public function index(){
        $this->load->view('navbar');
        $this->load->view('halaman_laporan');
    }
}
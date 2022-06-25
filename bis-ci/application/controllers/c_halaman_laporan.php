<?php 
defined('BASEPATH') or exit('No direct script access allowed');

class c_halaman_laporan extends CI_Controller {

    // public function __construct()
    // {
    //     parent::__construct();
    //     $this->load->model('M_laporan');
    //     $this->load->helper('url'); 
    // }

    public function index(){
        $this->load->view('navbar');
        $this->load->view('halaman_laporan');
    }

    // public function tambah_laporan(){
    //     $kota_asal = $this->input->post('kota_asal');
    //     $kota_tujuan = $this->input->post('kota_tujuan');
    //     $tanggal_berangkat = $this->input->post('tanggal_berangkat');
    //     $jam_berangkat = $this->input->post('jam_berangkat');
    //     $harga_tiket = $this->input->post('harga_tiket');
    //     $maximum_seat = $this->input->post('maximum_seat');

    //     $data = array(
    //         'kota_asal' => $kota_asal,
    //         'kota_tujuan' => $kota_tujuan,
    //         'tanggal_berangkat' => $tanggal_berangkat,
    //         'jam_berangkat' => $jam_berangkat,
    //         'harga_tiket' => $harga_tiket,
    //         'maximum_seat' => $maximum_seat,
            
    //     );
    //     $this->M_Tiket_pemesanan->tambah_data_tiket($data);
    //     redirect(base_url(''));
    // }

    
}
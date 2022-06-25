<?php 

defined('BASEPATH') OR exit('No direct script access allowed');

class c_data_tiket extends CI_Controller{
    
    public function __construct()
    {
        parent::__construct();
        $this->load->model('M_Tiket_pemesanan');
        $this->load->helper('url'); 
    }

    public function index(){
        $data['title'] = 'Data Pemesanan';
        $data['data_tiket'] = $this->M_Tiket_pemesanan->getAll();
        $this->load->view('navbar');
        $this->load->view('data_pemesanan', $data);
    }

    public function kota_asal(){
        $data['title'] = 'Kota Asal';
        $data['data_tiket'] = $this->M_Tiket_pemesanan->getAll();
        $this->load->view('navbar');
        $this->load->view('kota_asal', $data);
   }

   public function kota_tujuan(){
    $data['title'] = 'Kota Tujuan';
    $data['data_tiket'] = $this->M_Tiket_pemesanan->getAll();
    $this->load->view('navbar');
    $this->load->view('kota_tujuan', $data);
}
public function jadwal(){
    $data['title'] = 'Data Jadwal';
    $data['data_tiket'] = $this->M_Tiket_pemesanan->getAll();
    $this->load->view('navbar');
    $this->load->view('data_jadwal', $data);
}

    public function halaman_tambah(){
        $this->load->view('navbar');
        $this->load->view('halaman_tambah_tiket');
    }

    public function tambah_tiket(){
        $kota_asal = $this->input->post('kota_asal');
        $kota_tujuan = $this->input->post('kota_tujuan');
        $tanggal_berangkat = $this->input->post('tanggal_berangkat');
        $jam_berangkat = $this->input->post('jam_berangkat');
        $harga_tiket = $this->input->post('harga_tiket');
        $maximum_seat = $this->input->post('maximum_seat');

        $data = array(
            'kota_asal' => $kota_asal,
            'kota_tujuan' => $kota_tujuan,
            'tanggal_berangkat' => $tanggal_berangkat,
            'jam_berangkat' => $jam_berangkat,
            'harga_tiket' => $harga_tiket,
            'maximum_seat' => $maximum_seat,
            
        );
        $this->M_Tiket_pemesanan->tambah_data_tiket($data);
        redirect(base_url(''));
    }

    public function edit_tiket($id){
        $data['title'] = 'Halaman Edit';
        $data['edit_tiket'] = $this->M_Tiket_pemesanan->getByID($id);
        $this->load->view('navbar');
        $this->load->view('halaman_edit_tiket',$data);
    }

    public function update_tiket(){
        $data = $this->M_Tiket_pemesanan;
        
            $data->updatedata();
            redirect(base_url(''));
        
    
}

public function hapusdata_tiket($id = null){

    if ($this->M_Tiket_pemesanan->hapus($id)){
        redirect(base_url(''));
    }
}

}
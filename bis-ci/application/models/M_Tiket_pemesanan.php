<?php 
defined('BASEPATH') or exit('No direct script access allowed');

class M_Tiket_pemesanan extends CI_Model{
    private $table = 'pemesanan_tiket';


    public function getById($id){
        return $this->db->get_where($this->table,['id_pemesanan'=>$id])->row();
    }

    public function getAll(){
        $this->db->from($this->table);
        $this->db->order_by('id_pemesanan','desc');
        $query = $this->db->get();
        return $query->result();
    }

    public function tambah_data_tiket($data){
        $this->db->insert('pemesanan_tiket', $data);
    }

    public function updatedata(){
        $post = $this->input->post();
        $this->id_pemesanan = $post['id_pemesanan'];
        $this->kota_asal = $post['kota_asal'];
        $this->kota_tujuan = $post['kota_tujuan'];
        $this->tanggal_berangkat = $post['tanggal_berangkat'];
        $this->jam_berangkat = $post['jam_berangkat'];
        $this->harga_tiket = $post['harga_tiket'];
        $this->maximum_seat = $post['maximum_seat'];

        $this->db->update($this->table, $this, array('id_pemesanan' => $post['id_pemesanan']));
    }

    public function hapus($id){
        return $this->db->delete($this->table, array('id_pemesanan' => $id));
    }
}


?>
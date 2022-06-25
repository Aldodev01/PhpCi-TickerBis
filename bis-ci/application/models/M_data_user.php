<?php 
defined('BASEPATH') or exit('No direct script access allowed');

class M_data_user extends CI_Model{
    private $table = 'data_user';


    // public function getById($id){
    //     return $this->db->get_where($this->table,['id_datauser'=>$id])->row();
    // }

    public function getAll(){
        $this->db->from($this->table);
        $this->db->order_by('id_datauser','desc');
        $query = $this->db->get();
        return $query->result();
    } 
}
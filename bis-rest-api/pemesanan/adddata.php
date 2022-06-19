<?php 

include 'koneksi.php';
// error_reporting(0);
    $id_pemesanan = $_POST["id_pemesanan"];
    $id_pendapatan = $_POST["id_pendapatan"];
    $kota_asal = $_POST["kota_asal"];
    $kota_tujuan = $_POST["kota_tujuan"];
    $tanggal_berangkat = $_POST["tanggal_berangkat"];
    $jam_berangkat = $_POST["jam_berangkat"];
    $harga_tiket = $_POST["harga_tiket"];
    $maximum_seat = $_POST["maximum_seat"];
    
    $connect->query("INSERT INTO pemesanan_tiket (id_pemesanan,id_pendapatan,kota_asal,kota_tujuan,tanggal_berangkat,jam_berangkat,harga_tiket,maximum_seat) VALUE ('$id_pemesanan','$id_pendapatan','$kota_asal','$kota_tujuan','$tanggal_berangkat','$jam_berangkat','$harga_tiket','$maximum_seat') ");
    



?>
<?php
include 'koneksi.php';
error_reporting(0);
    $id_pemesanan = $_POST["id_pemesanan"];
    $id_pendapatan = $_POST["id_pendapatan"];
    $kota_asal = $_POST["kota_asal"];
    $kota_tujuan = $_POST["kota_tujuan"];
    $tanggal_berangkat = $_POST["tanggal_berangkat"];
    $jam_berangkat = $_POST["jam_berangkat"];
    $harga_tiket = $_POST["harga_tiket"];
    $maximum_seat = $_POST["maximum_seat"];
    
    $connect->query("UPDATE pemesanan SET id_pendapatan='".$id_pendapatan."',kota_asal='".$kota_asal."',kota_tujuan='".$kota_tujuan."',tanggal_berangkat='".$tanggal_berangkat."',jam_berangkat='".$jam_berangkat."',harga_tiket='".$harga_tiket."',maximum_seat='".$maximum_seat."' WHERE id_pemesanan=".$id_pemesanan );


?>
<?php
include 'koneksi.php';
error_reporting(0);
    $id_data_laporan = $_POST["id_data_laporan"];
    $qty = $_POST["qty"];
    $total = $_POST["total"];
   
    
    $connect->query("UPDATE data_laporan SET qty='".$qty."',total='".$total."' WHERE id_pemesanan=".$id_data_laporan );


?>
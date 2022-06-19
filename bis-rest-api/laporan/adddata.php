<?php 

include 'koneksi.php';
// error_reporting(0);
    $qty = $_POST["qty"];
    $total = $_POST["total"];
 
    
    $connect->query("INSERT INTO data_laporan (qty,total) VALUE ('$qty','$total') ");
    



?>
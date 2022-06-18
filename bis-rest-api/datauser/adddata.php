<?php 

include 'koneksi.php';
error_reporting(0);
    $username = $_POST["username"];
    $tanggal_lahir = $_POST["tanggal_lahir"];
    $jenis_kelamin = $_POST["jenis_kelamin"];
    $alamat = $_POST["alamat"];
    $no_telp = $_POST["no_telp"];
    $password = $_POST["password"];
    $status = $_POST["status"];
    
    $connect->query("INSERT INTO data_user (username,tanggal_lahir,jenis_kelamin,alamat,no_telp,password,status) VALUE ('$username','$tanggal_lahir','$jenis_kelamin','$alamat','$no_telp','$password','$status') ");
    



?>
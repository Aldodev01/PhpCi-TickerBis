<?php
include 'koneksi.php';
error_reporting(0);
    $id = $_POST["id_datauser"];
    $username = $_POST["username"];
    $tanggal_lahir = $_POST["tanggal_lahir"];
    $jenis_kelamin = $_POST["jenis_kelamin"];
    $alamat = $_POST["alamat"];
    $no_telp = $_POST["no_telp"];
    $password = $_POST["password"];
    $status = $_POST["status"];
    
    $connect->query("UPDATE data_user SET username='".$username."',tanggal_lahir='".$tanggal_lahir."',jenis_kelamin='".$jenis_kelamin."',alamat='".$alamat."',no_telp='".$no_telp."',password='".$password."',status='".$status."' WHERE id_datauser=".$id );


?>
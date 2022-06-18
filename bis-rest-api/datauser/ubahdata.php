<?php
require_once('koneksi.php');

if (isset($_POST['id_datauser'])) {
    $id = $_POST["id_datauser"];
    $username = $_POST["username"];
    $tanggal_lahir = $_POST["tanggal_lahir"];
    $jenis_kelamin = $_POST["jenis_kelamin"];
    $alamat = $_POST["alamat"];
    $no_telp = $_POST["no_telp"];
    $password = $_POST["password"];
    $status = $_POST["status"];
    $sql = $connect->prepare("UPDATE data_user SET username=?, tanggal_lahir=?, jenis_kelamin=?, alamat=?,no_telp=?,'password'=?,'status'=? WHERE id_datauser=?");
    $sql->bind_param('ssddd', $username, $tanggal_lahir, $jenis_kelamin, $alamat, $no_telp,$password,$status);
    $sql->execute();
    if ($sql) {
        //echo json_encode(array('RESPONSE' => 'SUCCESS'));
        header("location:../readapi/tampil.php");
    } else {
        echo json_encode(array('RESPONSE' => 'FAILED'));
    }
} else {
    echo "GAGAL";
}


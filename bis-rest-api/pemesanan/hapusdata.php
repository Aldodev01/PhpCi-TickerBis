<?php
require_once('koneksi.php');

if (isset($_GET['id_pemesanan'])) {
    $id  = $_GET['id_pemesanan'];
    $sql = $connect->prepare("DELETE FROM pemesanan WHERE id_pemesanan=?");
    $sql->bind_param('i', $id);
    $sql->execute();
    if ($sql) {
        echo json_encode(array('RESPONSE' => 'SUCCESS'));
        //header("location:../readapi/tampil.php");
    } else {
        echo json_encode(array('RESPONSE' => 'FAILED'));
    }
} else {
    echo "GAGAL";
}
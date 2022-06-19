<?php
require_once('koneksi.php');

if (isset($_GET['id_datauser'])) {
    $id  = $_GET['id_datauser'];
    $sql = $connect->prepare("DELETE FROM data_user WHERE id_datauser=?");
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
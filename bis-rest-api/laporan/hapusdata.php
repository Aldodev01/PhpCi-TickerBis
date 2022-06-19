<?php
require_once('koneksi.php');

if (isset($_GET['id_data_laporan'])) {
    $id  = $_GET['id_data_laporan'];
    $sql = $connect->prepare("DELETE FROM data_laporan WHERE id_data_laporan=?");
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
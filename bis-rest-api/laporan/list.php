<?php 

include 'koneksi.php';

$queryResult=$connect->query("SELECT * FROM data_laporan");
$result=array();

while($fetchData=$queryResult->fetch_assoc()){
    $result[]=$fetchData;
}



echo json_encode($result);
?>
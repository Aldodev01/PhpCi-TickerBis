<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css">
</head>
<body>
    <div class="container">
        <h1 class="my-4"> <?= $title ?></h1>
        <a  href="<?= base_url('index.php/c_data_tiket/halaman_tambah'); ?>" class="btn btn-primary"><i class="fa-solid fa-plus"></i> Tambah </a>
       
    <table class="table">
  <thead>
    <tr>
      <th scope="col">No</th>
      <th scope="col">Kota Asal</th>
      <th scope="col">Kota Tujuan</th>
      <th scope="col">Tanggal Berangkat</th>
      <th scope="col">Jam Berangkat</th>
      <th scope="col">Harga Tiket</th>
      <th scope="col">Maximum seat</th>
      <th scope="col">Aksi</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <?php foreach($data_tiket as $i => $data ) : ?>
      <th scope="row"><?= ++$i ?></th>
      <td><?= $data->kota_asal ?></td>
      <td>
      <?= $data->kota_tujuan ?>
      </td>
      <td> 
      <?= $data->tanggal_berangkat ?>
      </td>
      <td>
      <?= $data->jam_berangkat ?>

      </td>
      <td>
      <?= $data->harga_tiket ?>

      </td>
      <td>
      <?= $data->maximum_seat ?>

      </td>
    <td>
        <a href="<?php echo base_url();?>index.php/c_data_tiket/edit_tiket/<?= $data->id_pemesanan;?>" class="btn btn-success"><i class="fa-solid fa-pen-to-square"></i></a> 
        <a href="<?php echo base_url();?>index.php/c_data_tiket/hapusdata_tiket/<?= $data->id_pemesanan;?>" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i></a>
    </td>
</tr> 
    <?php endforeach ?>
     
       
  </tbody>
</table>
</div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>
</html>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Halaman Tambah Tiket</title>
    <link rel="stylesheet" href="<?= base_url('assets/css/login.css'); ?>">
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <script src="https://unpkg.com/gijgo@1.9.13/js/gijgo.min.js" type="text/javascript"></script>
    <link href="https://unpkg.com/gijgo@1.9.13/css/gijgo.min.css" rel="stylesheet" type="text/css" />
</head>
<body >
<div class="container">
    <br>
          <h1><?php $title ?></h1>
          <br>
          <form method="POST" action="<?= base_url('index.php/c_data_tiket/update_tiket')?>">
          <input type="hidden" name="id_pemesanan" value="<?php echo $edit_tiket->id_pemesanan;?>">

  <div class="form-group">
    <label for="kota_asal">Kota Asal</label>
    <input type="text" class="form-control" name="kota_asal" id="kota_asal"  placeholder="Masukan Kota Asal" value="<?= $edit_tiket->kota_asal ?>" ;?>
  </div>
  <br>
  <div class="form-group">
    <label for="kota_tujuan">Kota Tujuan</label>
    <input type="text" class="form-control" name="kota_tujuan" id="kota_asal" placeholder="Masukan Kota Tujuan" value="<?= $edit_tiket->kota_tujuan ?>">
  </div>
  <br>
  <div class="form-group">
    <label for="tanggal_berangkat">Tanggal Berangkat</label>
    <input id="datepicker" type="text" name="tanggal_berangkat" placeholder="Masukan Tanggal Berangkat" value="<?= $edit_tiket->tanggal_berangkat ?>" />
    <script>
        $('#datepicker').datepicker({
            uiLibrary: 'bootstrap4'
        });
    </script>  </div>
  <br>
  <div class="form-group">
    <label for="jam_berangkat">Jam Berangkat</label>
    <input id="timepicker" type="text" name="jam_berangkat" placeholder="Masukan Jam Berangkat" value="<?= $edit_tiket->jam_berangkat ?>" />

    <script>
        $('#timepicker').timepicker({
            uiLibrary: 'bootstrap4'
        });
    </script>  </div>
  <br>
  <div class="form-group">
    <label for="harga_tiket">Harga Tiket</label>
    <input type="text" class="form-control" name="harga_tiket" id="harga_tiket" placeholder="Masukan Harga Tiket" value="<?= $edit_tiket->harga_tiket ?>">
  </div>
  <br>
  <div class="form-group">
    <label for="maximum_seat">Maximum Seat</label>
    <input type="text" class="form-control" name="maximum_seat" id="maximum_seat" placeholder="Masukan Maximum Seat" value="<?= $edit_tiket->maximum_seat ?>">
  </div>
 <br>
 
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
            
        </div>   

</body>
</html>
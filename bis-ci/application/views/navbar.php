<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">

</head>
<body>
  <nav class="navbar navbar-expand-md navbar-dark bg-danger">
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample08" aria-controls="navbarsExample08" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <a href="#" class="navbar-brand">Pemesanan</a>
    <div class="collapse navbar-collapse justify-content-md-center" id="navbarsExample08">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="<?= base_url('index.php/dashboard'); ?>"><i class="fa-solid fa-house"></i> Home</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="dropdown01" data-bs-toggle="dropdown" aria-expanded="false"> <i class="fa-solid fa-border-all"></i> Master</a>
          <ul class="dropdown-menu" aria-labelledby="dropdown01">
            <li><a class="dropdown-item" href="<?= base_url('index.php/kota_asal'); ?>"><i class="fa-solid fa-road"></i> Kota Asal</a></li>
            <li><a class="dropdown-item" href="<?= base_url('index.php/kota_tujuan'); ?>"><i class="fa-solid fa-road"></i> Kota Tujuan</a></li>
            <li><a class="dropdown-item" href="<?= base_url('index.php/data_member'); ?>"><i class="fa-solid fa-user"></i> Member</a></li>
          </ul>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="dropdown02" data-bs-toggle="dropdown" aria-expanded="false"> <i class="fa-solid fa-signal"></i> Transaksi</a>
          <ul class="dropdown-menu" aria-labelledby="dropdown02">
            <li><a class="dropdown-item" href="<?= base_url('index.php/data_jadwal'); ?>"><i class="fa-solid fa-briefcase"></i> Penjadwalan</a></li>
            <li><a class="dropdown-item" href="<?= base_url('index.php/data_pemesanan'); ?>"><i class="fa-solid fa-bars-progress"></i> Pemesanan</a></li>
          </ul>
        </li>
         <li class="nav-item">
          <a class="nav-link" href="#"><i class="fa-solid fa-calendar-days"></i> Laporan</a>
        </li>
         <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="dropdown02" data-bs-toggle="dropdown" aria-expanded="false"> <i class="fa-solid fa-gear"></i> Utility</a>
          <ul class="dropdown-menu" aria-labelledby="dropdown02">
            <li><a class="dropdown-item" href="#"><i class="fa-solid fa-pen-to-square"></i> Ganti Password</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
 
    
</body>
</html>
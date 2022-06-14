<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="<?= base_url('assets/css/login.css'); ?>">
</head>
<body >
<div class="container">
          <h1>Silahkan Masuk</h1>
            <form>
                <label>Username</label><br>
                <input type="text" name="nama" id=""><br>
                <label>Password</label><br>
                <input type="password" name="password" id=""><br>
                <a class="button" style="display:block; text-decoration:none; width: 100%;
                padding: 10px 0;
                border: none;
                background-color: #2979ff;
                font-size: 20px;
                color: #ffffff;
                text-align:center;" href="<?= base_url('index.php/dashboard'); ?>">Log in</a>
                
            </form>
            
        </div>   

</body>
</html>
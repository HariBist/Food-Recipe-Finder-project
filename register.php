<?php
session_start();
if(isset($_SESSION['user']))
{
  header("location: welcome.php");
  exit();
}
?>
 <?php
    include("config.php");
    if(isset($_POST['submit'])){
        $fusername = mysqli_real_escape_string($conn, $_POST['username']);
        $email = mysqli_real_escape_string($conn, $_POST['email']);
        $fpassword = mysqli_real_escape_string($conn, $_POST['pass']);
        $cpassword = mysqli_real_escape_string($conn, $_POST['cpass']);
        $sql="select * from users where Username='$fusername'";
        $result = mysqli_query($conn, $sql);
        $count_user = mysqli_num_rows($result);

        $sql="select * from users where Email='$email'";
        $result = mysqli_query($conn, $sql);
        $count_email = mysqli_num_rows($result);

        if($count_user == 0 & $count_email==0){        
            if($fpassword==$cpassword){
                // $hash = password_hash($password, PASSWORD_DEFAULT);
                $sql = "INSERT INTO users(Username, Email, Password) VALUES('$fusername', '$email', '$fpassword')";
                $result = mysqli_query($conn, $sql);
                if($result){
                  echo '<script>
                  alert("you are registered successfully");</script>';
                    header("Location: login.php");
                }
            }
            else{
                echo '<script>
                    alert("Passwords do not match");
                    window.location.href = "register.php";
                </script>';
            }
        }
        else{
            if($count_user>0){
                echo '<script>
                    window.location.href="register.php";
                    alert("Username already exists!!");
                </script>';
            }
            if($count_email>0){
                echo '<script>
                    window.location.href="register.php";
                    alert("Email already exists!!");
                </script>';
            }
        }
        
    }
  ?>
<!DOCTYPE html>
<html>
<head>
<title> SignUp | AAHARA®</title>
    <link rel="shortcut icon" href="https://www.rejouice.com/assets/favicon/favicon-32x32.png" type="image/x-icon">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossorigin="anonymous"/>
    <link rel="stylesheet" href="signup.css">
    <style>
     footer {
    text-align: center;
    padding: 5px;
    bottom:0;
    left: 0;
    position:fixed;
    width: 100%;
    background-color: #F95D37;
    color: white;
  }
  </style>
</head>
<body>
<nav>
    <h3>AAHARA RECIPE</h3>
    <div id="nav-right">
       <a href="default.php"><h4>Home</h4></a>
      <a href="#about_us"><h4>About Us</h4></a> 
      <a href="#contact_us"><h4>Contact Us</h4></a>      
    <a href="register.php" type="button" id="Signup">SignUp</a>   
    <a href="login.php" type="button" id="login">LogIn</a>
</div>
</nav>
<div class="wrapper">
  <form action="register.php" id="mysignup" method="post">
    <h2>Signup</h2>
    <div class="input-field">
      <input type="text" id="username" name="username" autocomplete="off" required>
      <label for="username">Username</label>
    </div>
    <div class="input-field">
      <input type="email" id="email" name="email" autocomplete="off" required>
      <label for="email">Email</label>
    </div>
    <div class="input-field">
      <input type="password" id="password" name="pass" required>
      <label for="pass">Password</label>
    </div>
    <div class="input-field">
      <input type="password" id="cpass" name="cpass" required>
      <label for="cpass">Confirm Password</label>
    </div>
    <button type="submit" name="submit">Sign Up</button>
  </form>
</div>
<footer>
    <small>
        Copyright © 2024 Food Recipe Archives. All Rights Reserved.
    </small>
</footer>
</body>
</html>

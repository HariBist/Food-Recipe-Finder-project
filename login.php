<?php
session_start();
if(isset($_SESSION["user"])){
  header("Location: welcome.php");
}

?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title> LogIn | AAHARA®</title>
    <link rel="shortcut icon" href="https://www.rejouice.com/assets/favicon/favicon-32x32.png" type="image/x-icon">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossorigin="anonymous"/>
  <link rel="stylesheet" href="login.css">
  <!-- <script href="style.js"></script> -->
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
    <?php
      include("config.php");
      if(isset($_POST["login"]))
      {
    // Retrieve the submitted username and password
    $fusername = mysqli_real_escape_string($conn, $_POST["username"]);
    $fpassword = mysqli_real_escape_string($conn, $_POST["password"]);

    // TODO: Validate the username and password against your database
    $query  = "SELECT * FROM users WHERE Username = '$fusername' AND Password = '$fpassword'";
    $result = mysqli_query($conn, $query);

    if ($result)
    {
        // Check if the query returned any rows
        if (mysqli_num_rows($result) > 0)
        {
            // Authentication successful
            session_start();
            $_SESSION["user"] = $fusername;
            header("Location: welcome.php"); // Redirect to the dashboard page
            exit();
        } else
        {
            // Authentication failed
            echo "<script>alert('Invalid username or password. Please try again.');</script>";
        }
    }
    else
    {
        // Query execution failed
        echo "Error: " . mysqli_error($conn);
      }
    }

      // if(isset($_POST["login"])){
      //   $fusername = mysqli_real_escape_string($conn, $_POST["username"]);
      //   $fpassword = mysqli_real_escape_string($conn, $_POST["password"]);
      //     // echo $fpassword;
      //     $sql = "select * from users where Username = '$fusername'";  
      //     $result = mysqli_query($conn, $sql);  
      //     $row = mysqli_fetch_array($result, MYSQLI_ASSOC);  
      //     $count = mysqli_num_rows($result);  
          
      //     if($result){  
      //         // echo $count;
  
      //         if(password_verify($fpassword, $row["Password"])){
      //             // $login=true;
      //             // session_start();  
      //             // $sql = "select Username from users where Username = '$fusername'or Email = '$username'";     
      //             // $r = mysqli_fetch_array(mysqli_query($conn, $sql), MYSQLI_ASSOC);  
  
      //             // $_SESSION['user']= $r['Username'];
      //             // $_SESSION['loggedin'] = true;
      //             header('Location: welcome.php');
      //             // echo '<script>
      //             // alert("login successful");
      //             // window.location.href = "welcome.php"; 
      //             // </script>';
      //         }
      //     }  
      //     else{  
      //         echo  '<script>
                          
      //                     alert("Login failed. Invalid username or password!!");
      //                     window.location.href = "login.php";
      //                 </script>';
      //     }     
      // }
      ?>
    <form action="login.php" name="mylogin"method="post">
      <h2>Login</h2>
        <div class="input-field">
        <input type="text" id="username" name="username" autocomplete="off" required>
        <label for="username">Username</label>
      </div>
      <div class="input-field">
        <input type="password" id="password" name="password" required>
        <label for="password">Enter your password</label>
      </div>
      <div class="forget">
        <label for="remember">
          <input type="checkbox" id="remember">
          <p>Remember me</p>
        </label>
        <a href="#">Forgot password?</a>
      </div>
      <button type="submit" name="login">Log In</button>
      <div class="register">
        <p>Don't have an account? <a href="register.php">Register</a></p>
      </div>
    </form>
  </div>
  <footer>
    <small>
        Copyright © 2024 Food Recipe Archives. All Rights Reserved.
    </small>
</footer>
</body>
</html>
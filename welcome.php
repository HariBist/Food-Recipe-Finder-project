 <?php
    session_start();
    if(!isset($_SESSION['user'])){
        header("Location: login.php");
        exit;
    }
?> 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> Home | AAHARA®</title>
    <link rel="shortcut icon" href="https://www.rejouice.com/assets/favicon/favicon-32x32.png" type="image/x-icon">
    <!-- <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossorigin="anonymous"/> -->
    <link rel="stylesheet" href="welcome.css">    
</head>
<body>
<nav>
   <a href="welcome.php"><h3>AAHARA RECIPE</h3></a> 
 <div id="nav-right"> 
 <a href="welcome.php"class="nav-link"> <h3>Home</h3></a>
    <a href="./fav/recipe.html"class="nav-link"><h3>Find Recipe</h3> </a>
    <a href="./fav/favRecipe.html"class="nav-link"> <h3>Favourite</h3> </a>   
   <p><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/></svg> 
    <a><?php echo $_SESSION['user']; ?></a></p>
    <a href="logout.php" type="button" id="login">Log Out</a>
</nav>
<footer>
    <small>
        Copyright © 2024 Food Recipe Archives. All Rights Reserved.
    </small>
</footer>
</body>
</html>
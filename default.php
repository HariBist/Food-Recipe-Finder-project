<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> Home | AAHARA®</title>
    <link rel="shortcut icon" href="https://www.rejouice.com/assets/favicon/favicon-32x32.png" type="image/x-icon">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossorigin="anonymous"/>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="aboutus.css">
    <link rel="stylesheet" href="contact.css">
</head>
<body>
<div id="main">
    <div id="page1">
       <video autoplay loop muted src="./video/AAHARA-video-clip.mp4"></video>
       <div id="page1-content">
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
<h1>aahara</h1>
</div> 
    </div>
    <div id="page2">
        <div id="page2-top">
            <h4>"Savor the Moment, Indulge in <span>aahara</span>: Where Every Bite Tells a Delicious Tale!"</h4>
            <h4>Mahendranagar,Nepal</h4>
        </div>
        <div id="page2-main">
<p>"Welcome to <span>aahara</span>, your culinary compass to a world of delightful flavors and gastronomic adventures! At <span>aahara</span>,
     we believe that every meal is an opportunity to create something extraordinary. Whether you're a seasoned chef or a kitchen novice, our platform is your go-to destination for a treasure trove of meticulously crafted food recipes.
</p>
   <p> Our goal is to guide you through the cooking process with clear steps and helpful tips. 
    No more kitchen stress—just good food made easy. Join our community of food lovers and discover new flavors from around the world.
 </p>
    <p>
    Let's embark on this culinary adventure together and turn your kitchen into a place of creativity, joy, and of course, great food. Get ready to cook, share, and savor the magic of homemade recipes!"
</p>
        </div>
    </div>
    <div id="page3">
        <div id="page3-top">
            <h4>The <span>aahara</span> food recipe.</h4>
            <h2>Explore Our Services</h2>
            <h2>& Find happy in you</h2>
        </div>
        <div id="page3-elements">
        <div class="box">
            <img src="./images/foodiesfeed.com_cheeseburger.jpg" alt="">
            <video autoplay muted loop src="./video/slice_-_11610 (720p).mp4"></video>
        </div>
        <div class="box">
            <img src="./images/foodiesfeed.com_homemade-poppy-seed-almond-cake-with-pears.jpg" alt="">
            <video autoplay muted loop src="./video/stir_fry_-_11695 (720p).mp4"></video>

        </div>
        <div class="box">
            <img src="./images/foodiesfeed.com_vanilla-ice-cream-cone.jpg" alt="">
            <video autoplay muted loop  src="./video/pancake_-_11670 (720p).mp4"></video>
        </div>
       </div>
    </div>
        <div class="section" id="about_us">
            <div class="container">
                <div class="content-section">
                    <div id="page4-top"><h2>About Us</h2></div>
                    <div class="content">
                        <h3>Welcome to <span>aahara</span>, where our love for food takes center stage! We're more than just a collection of recipes; we're a community of culinary enthusiasts on a mission to make cooking an enjoyable experience for everyone.</h3>
                        <p>We are committed to guiding you through your culinary adventures with clear, easy-to-follow recipes that ignite your passion for cooking. Whether you're a beginner seeking kitchen confidence or an experienced chef looking for fresh ideas,<span>aahara</span>  is your culinary companion every step of the way.</p>
    <div class="button">
        <a href="">Read more</a>
    </div>
                    
                    </div>
                    <div class="social">
                        <a href=""><i class="fab fa-facebook"></i></a>
                        <a href=""><i class="fab fa-twitter"></i></a>
                    <a href=""><i class="fab fa-instagram"></i></a>
                    </div>
                </div>
                <div class="image-section">
                    <img src="" alt="">
                </div>
            </div>
        </div>
        <section class="contact">
            <div class="content">
                <h2 id="contact_us">Contact Us</h2>
                <p>At <span>aahara</span>, we value your feedback, questions, and suggestions. Whether you're looking for cooking advice, have a recipe request, or just want to say hello, we're here for you.</p>
            </div>
            <div class="container">
                <div class="contactinfo">
                    <div class="box">
                        <div class="icon"><i class="fa fa-map-marker" aria-hidden="true"></i>
                        </div>
                        <div class="text">
                            <h3>Address</h3>
                            <p>1006 Campus Road ,<br> Mahendranagar, kanchanpur,<br>Galli no 5</p>
                        </div>
                    </div>
                    <div class="box">
                        <div class="icon"><i class="fa fa-phone" aria-hidden="true"></i></div>
                        <div class="text">
                            <h3>Phone</h3>
                            <p>+977 9864756120</p>
                        </div>
                    </div>
                    <div class="box">
                        <div class="icon"><i class="fa fa-envelope" aria-hidden="true"></i></div>
                        <div class="text">
                            <h3>Email</h3>
                            <p>specialaahara@gmail.com</p>
                        </div>
                    </div>
    
                </div>
                <div class="contactForm">
                    <?php
                    include ("config.php"); 
                    if(isset($_POST['send'])){
                    $name = trim($_POST['fname']);
                    $email = trim($_POST['femail']);
                    $message = trim($_POST['message']);
                    $sql= "SELECT * FROM contact_form where Email ='$email' and Message='$message'";
                    $result = mysqli_query($conn, $sql);
                    $user_count = mysqli_num_rows($result);
                    if(!empty($name)||!empty($email)||!empty("message")){
                        if($user_count ==0){
                    $sql = "INSERT INTO contact_form(Name, Email, Message) VALUES('$name', '$email' ,'$message')";
                    $result = mysqli_query($conn, $sql);
                    if($result){
                        echo '<script> alert("your message sent successfully")</script>';
                        //  header("Location: default.php");
                        //  exit();
                    }
                }
                else{
                    if($user_count>0)
                    {
                        echo '<script> alert("type other message")</script>';
                    }
                }
                    }
                    else{
                        echo '<script> alert(" Enter message first ")</script>';
                    }
                }
                    ?>

                    <form action="default.php" name="contactForm" method="post">
                        <h2>send message</h2>
                        <p>Got something on your mind? Fill out the form below, and we'll get back to you as soon as possible.</p>
                        <div class="inputBox" id="name">
                            <input type="text" name="fname"required="required">
                            <span>Full Name</span>
                        </div>
                        <div class="inputBox" id="email">
                            <input type="email" name="femail"  required="required">
                            <span>Email</span>
                        </div>
                        <div class="inputBox" id="message">
                            <textarea name="message" cols="4" rows="3" required="required"></textarea>
                            <span>type your message</span>
                        </div>
                        <div class="inputBox">
                            <input type="Submit" name="send" value="Send">
                        </div>
                    </form>
                </div>
            </div>
        </section>
</div>
<footer>
    <small>
        Copyright © 2024 Food Recipe Archives. All Rights Reserved.
    </small>
</footer>
</body>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.3/gsap.min.js" integrity="sha512-7Au1ULjlT8PP1Ygs6mDZh9NuQD0A5prSrAUiPHMXpU6g3UMd8qesVnhug5X4RoDr35x5upNpx0A6Sisz1LSTXA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="./script.js"></script>
</html>
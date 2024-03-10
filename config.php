<?php
$servername ="localhost";
$username= "root";
$password ="";
$db_name ="aahara";
$conn = new mysqli($servername, $username, $password, $db_name);
if($conn->connect_error)
{
    die("connecttion failed".$Conn->connect_error);
}
?>
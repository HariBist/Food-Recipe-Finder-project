<?php

include_once "C:/xampp/htdocs/aahara_food_recipe/config.php";
    
    $id = $_REQUEST['delete_Id'];
    $query="DELETE FROM users where id='$id'";

    $data=mysqli_query($conn,$query);

    if($data){

        echo '<script>alert("User Deleted")</script>';
        header("Location: index.php");
    }
    else{
        
        echo '<script>alert("User not deleted")</script>';
        header("Location: index.php");
    }
    
?>
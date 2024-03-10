<div >
  <h2>All Users</h2>
  <table class="table ">
    <thead>
      <tr>
        <th class="text-center">S.N.</th>
        <th class="text-center">Username </th>
        <th class="text-center">Email</th>
        <th class="text-center"> Password</th>
        <th class="text-center">Joining Date</th>
        <th class="text-center">Action</th>
      </tr>
    </thead>
    <?php
      include_once "C:/xampp/htdocs/aahara_food_recipe/config.php";
      $sql="SELECT * from users";
      $result=$conn-> query($sql);
      $count=1;
      if ($result-> num_rows > 0){
        while ($row=$result-> fetch_assoc()) {
           
    ?>
    <tr>
      <td><?=$count?></td>
      <td><?=$row["Username"]?></td>
      <td><?=$row["Email"]?></td>
      <td><?=$row["Password"]?></td>
      <td><?=$row["submission_date"]?></td>
      <td><button class="btn btn-danger" style="height:40px"  onclick="variationDelete('<?$row['Username']?>')"><a href="./Controller/viewUserDelete.php?delete_Id=<?php echo $row['id'];?>">Delete</a></button></td>
    </tr>
    <?php
            $count=$count+1;
           
        }
    }
    ?>
  </table>
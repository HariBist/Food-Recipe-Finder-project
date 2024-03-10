<div >
  <h2>User Responses.</h2>
  <table class="table ">
    <thead>
      <tr>
        <th class="text-center">S.N.</th>
        <th class="text-center">Name </th>
        <th class="text-center">Email</th>
        <th class="text-center"> Submission Date</th>
        <th class="text-center">Message</th>
      </tr>
    </thead>
    <?php
      include_once "C:/xampp/htdocs/aahara_food_recipe/config.php";
      $sql="SELECT * from contact_form";
      $result=$conn-> query($sql);
      $count=1;
      if ($result-> num_rows > 0){
        while ($row=$result-> fetch_assoc()) {
           
    ?>
    <tr>
      <td><?=$count?></td>
      <td><?=$row["Name"]?></td>
      <td><?=$row["Email"]?></td>
      <td><?=$row["submission_time"]?></td>
      <td><?=$row["Message"]?></td>
    </tr>
    <?php
            $count=$count+1;
           
        }
    }
    ?>
  </table>
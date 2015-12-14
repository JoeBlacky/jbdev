<?php
    $to = "gooddealthanks@gmail.com";
    $subject = "Новый подписчик";
    $txt = "Почта: " . $_POST["email"];

    mail($to,$subject,$txt);
?>
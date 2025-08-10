<?php
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "yggdrasil_db";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed"]));
}
?>

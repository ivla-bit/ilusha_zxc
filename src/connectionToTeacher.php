<?php
$servername = "localhost";
$username = "root";
$password = "";
$dataBaseName = "teacher";
// Create connection
$conn = new mysqli($servername, $username, $password,$dataBaseName);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";
?>
<?php
header("Content-Type: application/json");
require "db.php";

$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';
$role = $_POST['role'] ?? 'player';
$campaign_id = $_POST['campaign_id'] ?? null;
$profileimg = $_POST['profileimg'] ?? null;

if (!$name || !$email || !$password) {
    echo json_encode(["error" => "Missing fields"]);
    exit;
}

$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

$stmt = $conn->prepare("INSERT INTO users (name, email, password, role, campaign_id, profileimg) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssis", $name, $email, $hashedPassword, $role, $campaign_id, $profileimg);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["error" => $stmt->error]);
}

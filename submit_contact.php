<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *'); // adjust if needed
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit; }

require_once __DIR__ . '/config.php';

// Basic validation helper
define('MAX_MESSAGE_LEN', 5000);

$input = $_POST;

$name    = trim($input['name'] ?? '');
$email   = trim($input['email'] ?? '');
$phone   = trim($input['phone'] ?? '');
$service = trim($input['service'] ?? '');
$message = trim($input['message'] ?? '');

$errors = [];
if ($name === '' || mb_strlen($name) < 2) { $errors['name'] = 'Name required (min 2 chars)'; }
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) { $errors['email'] = 'Valid email required'; }
if ($service === '') { $errors['service'] = 'Select a service'; }
if ($message === '' || mb_strlen($message) < 10) { $errors['message'] = 'Message too short (min 10 chars)'; }
if (mb_strlen($message) > MAX_MESSAGE_LEN) { $errors['message'] = 'Message too long'; }

if ($errors) {
    echo json_encode(['success' => false, 'errors' => $errors]);
    exit;
}

$ip  = $_SERVER['REMOTE_ADDR'] ?? '';
$ua  = substr($_SERVER['HTTP_USER_AGENT'] ?? '', 0, 250);

$mysqli = db_connect();

$stmt = $mysqli->prepare('INSERT INTO contact_messages (name, email, phone, service, message, ip_address, user_agent) VALUES (?, ?, ?, ?, ?, ?, ?)');
if (!$stmt) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Prepare failed']);
    exit;
}
$stmt->bind_param('sssssss', $name, $email, $phone, $service, $message, $ip, $ua);
$ok = $stmt->execute();

if (!$ok) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Insert failed']);
    exit;
}

$id = $stmt->insert_id;
$stmt->close();
$mysqli->close();

echo json_encode(['success' => true, 'id' => $id, 'message' => 'Thank you! We received your message.']);

<?php
// Production configuration template
// Copy this file to config.php and update with your actual database credentials

// For hosting providers like InfinityFree, 000webhost, Hostinger, etc.
$DB_HOST = 'localhost';        // Usually 'localhost' or provided by hosting
$DB_USER = 'your_db_username'; // Provided by hosting provider
$DB_PASS = 'your_db_password'; // Set by you in hosting control panel
$DB_NAME = 'your_db_name';     // Created in hosting control panel

// For Heroku with ClearDB MySQL addon:
// $DB_HOST = 'us-cdbr-east-06.cleardb.net';
// $DB_USER = 'cleardb_username';
// $DB_PASS = 'cleardb_password';
// $DB_NAME = 'cleardb_database_name';

function db_connect(): mysqli {
    global $DB_HOST, $DB_USER, $DB_PASS, $DB_NAME;
    
    $mysqli = @new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
    
    if ($mysqli->connect_errno) {
        error_log("Database connection failed: " . $mysqli->connect_error);
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Database connection failed']);
        exit;
    }
    
    $mysqli->set_charset('utf8mb4');
    return $mysqli;
}

// Auto-create table if it doesn't exist
function init_database() {
    $mysqli = db_connect();
    
    $sql = "CREATE TABLE IF NOT EXISTS contact_messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) NOT NULL,
        phone VARCHAR(50),
        service VARCHAR(100),
        message TEXT NOT NULL,
        ip_address VARCHAR(45),
        user_agent VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";
    
    if (!$mysqli->query($sql)) {
        error_log("Table creation failed: " . $mysqli->error);
    }
    
    $mysqli->close();
}

// Call this on first run
init_database();

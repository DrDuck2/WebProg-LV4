<?php
require 'db_config.php';

header('Content-Type: application/json');

try {
    $stmt = $pdo->query('SELECT id, name, price, type, subtype, image_url FROM items');
    $items = $stmt->fetchAll();
    echo json_encode($items);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>

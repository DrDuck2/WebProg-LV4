<?php

require 'db_config.php';

try {
    // Query to calculate the total number of items in the cart
    $stmt = $pdo->query("SELECT SUM(amount) AS total_items FROM cart");
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    
    // Check if there are any items in the cart
    if ($result && isset($result['total_items'])) {
        $total_items = $result['total_items'];
        echo $total_items; // Output the total number of items
    } else {
        echo 0; // If no items in the cart, display 0
    }
} catch (PDOException $e) {
    // Handle any database errors
    echo json_encode(['error' => $e->getMessage()]);
}


?>

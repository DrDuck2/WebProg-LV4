<?php
require 'db_config.php';

try {
    // Prepare the SQL query to fetch all cart items along with their details from the items table
    $stmt = $pdo->prepare("
        SELECT cart.id AS cart_id, cart.amount, items.id AS item_id, items.name, items.price, items.type, items.subtype, items.image_url
        FROM cart
        JOIN items ON cart.item_id = items.id
    ");
    
    // Execute the query
    $stmt->execute();
    
    // Fetch all results as an associative array
    $cartItems = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Output the results as JSON
    echo json_encode($cartItems);
} catch (PDOException $e) {
    // Handle any database errors
    echo json_encode(['error' => $e->getMessage()]);
}
?>

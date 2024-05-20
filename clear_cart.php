<?php
require 'db_config.php';

try {
    // Delete all items from the cart table
    $pdo->exec("DELETE FROM cart");

    // Reset auto-increment value
    $pdo->exec("ALTER TABLE cart AUTO_INCREMENT = 1");

    echo "Cart has been reset successfully.";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>

<?php

require 'db_config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $data = json_decode(file_get_contents("php://input"));
    if($data != null){

        $item_id = $data->item_id;

        try {
            $stmt = $pdo->prepare("SELECT id, amount FROM cart WHERE item_id = :item_id");
            $stmt->bindValue(':item_id', $item_id, PDO::PARAM_INT);
            $stmt->execute();

            // Fetch the result row by row
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                // Process each row here
                $cart_item_id = $row['id'];
                $amount = $row['amount'] + 1;

                // Update the amount for the item in the cart
                $update_stmt = $pdo->prepare("UPDATE cart SET amount = :amount WHERE id = :id");
                $update_stmt->bindValue(':amount', $amount, PDO::PARAM_INT);
                $update_stmt->bindValue(':id', $cart_item_id, PDO::PARAM_INT);
                $update_stmt->execute();
                $update_stmt = null; // Release resources

                echo "Updated existing item successfully";
                exit; 
            }

            $insert_stmt = $pdo->prepare("INSERT INTO cart (item_id, amount) VALUES (:item_id, 1)");
            $insert_stmt->bindValue(':item_id', $item_id, PDO::PARAM_INT);
            $insert_stmt->execute();
            $insert_stmt = null; 
            echo "Added new item successfully";

        } catch (PDOException $e) {
            echo json_encode(['error' => $e->getMessage()]);
        }

    } else {
        echo "Invalid JSON data";
    }
}



?>
<?php

declare(strict_types=1);

$email = 'huy1@gmail.com';
$password = '123456';

$pdo = new PDO(
    'mysql:host=mysql;dbname=opencart;charset=utf8mb4',
    'root',
    'opencart',
    [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    ]
);

$hash = password_hash($password, PASSWORD_DEFAULT);

$check = $pdo->prepare(
    'SELECT customer_id FROM oc_customer WHERE email = :email LIMIT 1'
);

$check->execute([
    'email' => $email,
]);

$customerId = $check->fetchColumn();

if ($customerId) {
    $stmt = $pdo->prepare(
        'UPDATE oc_customer
         SET password = :password,
             customer_group_id = 1,
             status = 1
         WHERE customer_id = :customer_id'
    );

    $stmt->execute([
        'password' => $hash,
        'customer_id' => $customerId,
    ]);

    echo "Test user updated: {$email}\n";
} else {
    $stmt = $pdo->prepare(
        'INSERT INTO oc_customer (
            customer_group_id,
            store_id,
            language_id,
            firstname,
            lastname,
            email,
            telephone,
            password,
            custom_field,
            newsletter,
            ip,
            status,
            safe,
            commenter,
            date_added
        ) VALUES (
            1,
            0,
            1,
            :firstname,
            :lastname,
            :email,
            :telephone,
            :password,
            :custom_field,
            0,
            :ip,
            1,
            0,
            0,
            NOW()
        )'
    );

    $stmt->execute([
        'firstname' => 'Huy',
        'lastname' => 'Pham',
        'email' => $email,
        'telephone' => '0000000000',
        'password' => $hash,
        'custom_field' => '',
        'ip' => '127.0.0.1',
    ]);

    echo "Test user created: {$email}\n";
}
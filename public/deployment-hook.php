<?php

$secret = trim(file_get_contents(dirname(__FILE__) . '/../deployment-secret'));
$request_body = file_get_contents('php://input');
$computed_hmac = hash_hmac('sha1', $request_body, $secret);
$send_hmac = substr($_SERVER['HTTP_X_HUB_SIGNATURE'], 5);

if ($send_hmac !== $computed_hmac) exit;

shell_exec(dirname(__FILE__) . '/../deployment-hook.sh');

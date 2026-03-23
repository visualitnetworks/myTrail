<?php
session_start();
require_once "./api_db/config.php";
require_once "./api_db/tools.php";

error_reporting(E_ERROR);

if (strcmp($_POST["token"], $_SESSION['token']) == 0) {
	$sessionID = generateSessionID('-sesEND');
	$conn = new mysqli($connDB['host'], $connDB['user'], $connDB['pass'], $connDB['name']);
	$conn->query(" UPDATE `aaa_user` SET `session` = '" . $sessionID . "' WHERE `userID` = '" . $_SESSION['userID'] . "' ");
	$conn->close();

	// Eliminar todas las variables de sesión
	$_SESSION = [];

	// Destruir la sesión
	session_destroy();

	// Eliminar cookie de sesión en el cliente
	setcookie(session_name(), '', time() - 42000);
}
exit;
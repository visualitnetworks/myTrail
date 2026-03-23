<?php
session_start();
require_once "./api_db/config.php";
require_once "./api_db/tools.php";

error_reporting(E_ERROR);
post_max_size_exceeded();

$filterUser = filter($_POST["user"], "user");
$filterPass = filter($_POST["pass"], "pass");
$filterPath = filter($_POST["path"], "path");

$user = reset($filterUser);
$pass = reset($filterPass);
$path = reset($filterPath);

$conn = new mysqli($connDBuser['host'], $connDBuser['user'], $connDBuser['pass'], $connDBuser['name']);

// Check connection
if ($conn->connect_error) {
	setFail($conn->connect_error);
}
mysqli_set_charset($conn, 'utf8mb4');//utf8

$resultLogin = $conn->query(" SELECT `pass`,`path` FROM `aaa_user` WHERE `name` = '" . $user . "' ");
$rowLogin = mysqli_fetch_assoc($resultLogin);
$conn->close();

$conn = new mysqli($connDB['host'], $connDB['user'], $connDB['pass'], $connDB['name']);

if (password_verify($pass, $rowLogin["pass"]) && strcmp($path, $rowLogin["path"]) == 0) {
	//setFail("Valid LOGIN!");

	$sessionID = generateSessionID('');

	$conn->query(" UPDATE `aaa_user` SET `session` = '" . $sessionID . "' WHERE `name` = '" . $user . "' ");

	$resultQry = $conn->query(" SELECT `userID`, `path` from `aaa_user` WHERE `name` = '" . $user . "' ");
	$rowQry = mysqli_fetch_assoc($resultQry);
	
	$_SESSION['userID'] = $rowQry['userID'];
	$_SESSION['token'] = $sessionID;
	$_SESSION['path'] = $rowQry['path'];
	$_SESSION['name'] = $user;

	$conn->query(" UPDATE `data_login` SET `last_login` = '" . date("Y-m-d H:i:s") . "' WHERE `userID` = '" . $_SESSION['userID'] . "' ");

	$sessionIDfake0 = generateSessionID('');
	$sessionIDfake1 = generateSessionID('');

	echo $sessionIDfake0 . "$$$" . $sessionID . "$$$" . $rowQry['path'] . "$$$" . $sessionIDfake1;

} else {
	setFail("Invalid LOGIN");
}

$conn->close();
exit;
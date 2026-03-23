<?php
session_start();
require_once "./api_db/config.php";
require_once "./api_db/tools.php";

error_reporting(E_ERROR);
post_max_size_exceeded();

$proj = reset(filter($_POST["proj"], 'path'));

if (isset($proj)) {

	$conn = new mysqli($connDBuser['host'], $connDBuser['user'], $connDBuser['pass'], $connDBuser['name']);

	$resultQry = $conn->query(" SELECT `userID` from `aaa_user` WHERE `path` = '" . $proj . "' ");
	$rowQry = mysqli_fetch_assoc($resultQry);

	$sql = $conn->query(" SELECT `text`,`color`,`image`,`patreons`,`logo`,`autoOpen`,`title`,`inform` FROM `globals` WHERE (`userID` = '" . $rowQry['userID'] . "') ");
	while ($r = mysqli_fetch_assoc($sql)) {
		$rows1[] = $r;
	}

	$sql = $conn->query(" SELECT `IDtracks`,`name`,`gpx`,`date`,`place`,`info` FROM `tracks` WHERE (`userID` = '" . $rowQry['userID'] . "') ");
	while ($r = mysqli_fetch_assoc($sql)) {
		$rows2[] = $r;
	}

	$sql = $conn->query(" SELECT `IDtext2map`,`text`,`coords` FROM `text2map` WHERE (`userID` = '" . $rowQry['userID'] . "') ");
	while ($r = mysqli_fetch_assoc($sql)) {
		$rows3[] = $r;
	}

	$sql = $conn->query(" SELECT `IDwaypois`,`image`,`short`,`coords`,`type`,`title`,`text`,`tilt`,`track` FROM `waypois` WHERE (`userID` = '" . $rowQry['userID'] . "') ORDER BY `track`,`short`");
	while ($r = mysqli_fetch_assoc($sql)) {
		$rows4[] = $r;
	}

	echo json_encode($rows1);
	echo '$$$';
	echo json_encode($rows2);
	echo '$$$';
	echo json_encode($rows3);
	echo '$$$';
	echo json_encode($rows4);
	$conn->close();
} else {
	setFail("Invalid USER");
}
exit;

<?php
session_start();
require_once "./api_db/config.php";
require_once "./api_db/tools.php";

error_reporting(E_ERROR);
post_max_size_exceeded();
//ini_set('post_max_size', '128M');
//ini_set('upload_max_filesize', '128M');
//ini_set('max_file_uploads', '130');

$tokenUser = $_POST["token"];
$dirPOST = filter($_POST["directory"], "directory");
$directory = reset($dirPOST);

if (is_array($_POST["update"])) {
	$update = $_POST["update"];
} else {
	$update = [];
}

if (is_array($_POST["delete"])) {
	$delete = $_POST["delete"];
} else {
	$delete = [];
}

if (is_array($_POST["insert"])) {
	$insert = $_POST["insert"];
} else {
	$insert = [];
}

if (is_array($_POST["images"])) {
	$images = $_POST["images"];
} else {
	$images = [];
}

$maxFileUploads = ini_get('max_file_uploads');
if (count($images) > $maxFileUploads) {
	setFail("Too much FILES! at same time TotlaMax=" . $maxFileUploads);
}

$conn = new mysqli($connDBuser['host'], $connDBuser['user'], $connDBuser['pass'], $connDBuser['name']);

$resultQry = $conn->query(" SELECT `name` FROM `aaa_user` WHERE `path` = '" . $directory . "' ");
$assocQry = mysqli_fetch_assoc($resultQry);
$nameUSER = $assocQry['name'];
$conn->close();

if (!empty($tokenUser) && strlen(trim($tokenUser)) !== 0 && strcmp($tokenUser, $_SESSION['token']) == 0 && strcmp($nameUSER, $_SESSION['name']) == 0) {

	$conn = new mysqli($connDB['host'], $connDB['user'], $connDB['pass'], $connDB['name']);

	$sqlcountText2Map = $conn->query(" SELECT COUNT(*) AS NUM FROM `text2map` WHERE (`userID` = '" . $_SESSION['userID'] . "') ");
	$countText2Map = mysqli_fetch_assoc($sqlcountText2Map);
	echo '_text2map_' . $countText2Map['NUM'];

	$sqlcountWaypois = $conn->query(" SELECT COUNT(*) AS NUM FROM `waypois` WHERE (`userID` = '" . $_SESSION['userID'] . "') ");
	$countWaypois = mysqli_fetch_assoc($sqlcountWaypois);
	echo '_waypois_' . $countWaypois['NUM'];

	/*foreach ($update as $index => $item) {
		echo "Item at index ".$index." has sm_id value ".print_r($item);
	}*/
	foreach ($delete as $value) {
		$setCols = "";
		$IDtable = 'ID' . $value['table'];
		$wereIDtable = " && " . "`" . $IDtable . "`" . " = '" . reset(filter($value[$IDtable], "delByIDtable")) . "'";

		$queryDELETE = " DELETE FROM `" . $value['table'] . "` WHERE (`userID` = '" . $_SESSION['userID'] . "'" . $wereIDtable . ") ";
		//echo '-----'.$queryUPDATE;
		$conn->query($queryDELETE);
	}

	$arrFields = ['title', 'text', 'color', 'autoOpen', 'name', 'place', 'info', 'inform', 'date', 'coords', 'type', 'tilt', 'track', 'image', 'short'];
	foreach ($insert as $value) {
		$setCols = "(userID,";
		$setValues = "('" . $_SESSION['userID'] . "',";
		$insrtTable = reset(filter($value['table'], "table"));
		$IDtable = 'ID' . $insrtTable;

		$maxIMPUTS = $countWaypois['NUM'];
		if ($insrtTable == 'text2map') {
			$maxIMPUTS = $countText2Map['NUM'];
			$arrFields = ['text', 'coords']; //avoid short field
		}

		$maxCounts = 0;
		$totalMax = 60;

		//echo $setValues . '---';

		foreach ($arrFields as $arrF) {
			if (isset($value[$arrF])) {
				$maxCounts++;
				if ($maxCounts < $totalMax - $maxIMPUTS) { //
					$setCols = $setCols . "" . $arrF . ",";
					$setValues = $setValues . "'" . reset(filter($value[$arrF], "fields")) . "',";
				} else {
					setFail("Too much IMPUTS! TotlaMax=" . $totalMax);
				}
			}
		}

		$setCols = substr($setCols, 0, -1);
		$setCols = $setCols . ")";
		$setValues = substr($setValues, 0, -1);
		$setValues = $setValues . ")";

		$queryINSERT = " INSERT INTO `" . $insrtTable . "` " . $setCols . " VALUES " . $setValues;
		//echo '-----'.$queryINSERT;
		$conn->query($queryINSERT);
	}

	foreach ($update as $value) {
		$setCols = "";
		$insrtTable = reset(filter($value['table'], "table"));
		$IDtable = 'ID' . $insrtTable;
		$wereIDtable = '';

		if (isset($insrtTable) && $insrtTable !== 'globals') {
			$wereIDtable = " && " . "`" . $IDtable . "`" . " = '" . $value[$IDtable] . "'";
		}

		foreach ($arrFields as $arrF) {
			if (isset($value[$arrF])) {
				$setCols = $setCols . $arrF . "= '" . reset(filter($value[$arrF], "fields")) . "',";
			}
		}

		$setColsDB = substr($setCols, 0, -1);
		$queryUPDATE = " UPDATE `" . $insrtTable . "` SET " . $setColsDB . " WHERE (`userID` = '" . $_SESSION['userID'] . "'" . $wereIDtable . ") ";
		//echo '-----'.$queryUPDATE;
		$conn->query($queryUPDATE);
	}

	$arrFieldsImgs = ['image', 'patreons', 'logo'];

	$countDir = count(glob('../zzprojs/' . $_SESSION['path'] . '/*'));
	if ($countDir > 75) {
		setFail("Too much FILES in Directory! TotlaFiles=" . $countDir);
	}

	foreach ($images as $value) {
		$setCols = "";
		$selectCols = "";
		$insrtTable = reset(filter($value['table'], "table"));
		$IDtable = 'ID' . $insrtTable;

		$wereIDtable = "";
		$directory = '../zzprojs/' . $_SESSION['path'] . '/skin/';
		if (isset($insrtTable) && $insrtTable !== 'globals') {
			$directory = '../zzprojs/' . $_SESSION['path'] . '/skin/imgs/';
			$wereIDtable = " && " . "`" . $IDtable . "`" . " = '" . $value[$IDtable] . "'";
		}

		$nameImage = "";
		foreach ($arrFieldsImgs as $arrF) {
			if (isset($value[$arrF])) {
				$nameImage = reset(filter($value[$arrF], "nameImage"));
				$setCols = $setCols . $arrF . "= '" . $nameImage . "',";
				$selectCols = "`" . $arrF . "`";
				$selectCols2 = $arrF;
			}
		}

		$querySELECTimg = " SELECT " . $selectCols . " FROM `" . $insrtTable . "` WHERE (`userID` = '" . $_SESSION['userID'] . "'" . $wereIDtable . ") ";
		//echo '_%%%%%%_'.$querySELECTimg;
		$sqlSELECTimg = $conn->query($querySELECTimg);
		$rowQry = mysqli_fetch_assoc($sqlSELECTimg);
		//echo '_%%%%%%_'.$directory.$rowQry[$selectCols2];
		$ulink = unlinkFile($directory . $rowQry[$selectCols2]);
		//echo '<pre>'; print_r($ulink); echo '</pre>';

		$setColsDB = substr($setCols, 0, -1);
		$queryUPDATEimg = " UPDATE `" . $insrtTable . "` SET " . $setColsDB . " WHERE (`userID` = '" . $_SESSION['userID'] . "'" . $wereIDtable . ") ";
		//echo '-----'.$queryUPDATEimg;
		$conn->query($queryUPDATEimg);

		createFile($value['blob'], $directory, $nameImage);
	}

	$conn->query(" UPDATE `data_login` SET `last_updated` = '" . date("Y-m-d H:i:s") . "' WHERE `userID` = '" . $_SESSION['userID'] . "' ");
	$conn->close();
	msgFail("Done OK!");
} else {
	setFail("Invalid USER");
}

/**
 * Unlink a file
 */
function unlinkFile($file)
{
	$exist = file_exists($file) ? 'true' : 'false';
	$writable = is_writable($file) ? 'true' : 'false';

	if (file_exists($file) && is_writable($file)) {
		unlink($file);
	}

	return [$exist, $writable];
}

/**
 * create a file
 */
function createFile($blob, $directory, $name)
{
	if (isset($blob)) {
		$sizeBlob = strlen($blob);
		preg_match('~(\d+)([KMG])*~', ini_get('upload_max_filesize'), $matches);
		list(, $number, $unit) = $matches;
		$uploadMaxFilesize  = $number * ($unit ? pow(1024, ['K' => 1, 'M' => 2, 'G' => 3][$unit]) : 1);

		if ($sizeBlob > 10 && $sizeBlob < $uploadMaxFilesize) { //1024MB
			// parse data URI
			$semiPos = strpos($blob, ';', 5);
			$mime = substr($blob, 5, $semiPos - 5);

			// save image data to file
			/*switch ($mime) {
				case 'image/png':
					$ext = 'png';
					break;
				case 'image/gif':
					$ext = 'gif';
					break;
				case 'image/jpg':
				case 'image/jpeg':
					$ext = 'jpeg';
					break;
				default:
					setFail('No image type MIME find!');
					break;
			}*/

			//if (!file_exists($directory) && !is_dir($directory)) {
			//	mkdir($directory, 0777, true);
			//}
			file_put_contents(
				$directory . $name,
				base64_decode(
					str_replace('data:' . $mime . ';base64,', '', $blob)
				),
				LOCK_EX
			);
		} else {
			setFail("Bad size image! " . $sizeBlob);
		}
	}
}
exit;

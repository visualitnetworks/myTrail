<?php

/*****************************
 ****filter injection query****
 ******************************/
/*test*/
//reset(filter($POSTvar, "proj", false));
function filter($variable, $field, $subs = 1000)
{
	if (isset($variable)) {
		$newVariable = $variable;
		$msg = '';
		/*$aValid = array('-', '_','.','@',' ','é');
		if(!ctype_alnum(str_replace($aValid, '', $variable))) {
		$variable = '';
		}*/
		$variable = trim($variable);
		$variable = strip_tags($variable);
		$variable = htmlspecialchars($variable, ENT_QUOTES);
		$variable = stripslashes($variable);
		/*if (urlencode($variable)) {
			$variable = urlencode($variable);
		}*/
		/*if ($variable !== $newVariable) {
			$msg = 'Caracter inválido en el campo: ' . $field;acostacima@terre3.es4
			msgFail( $msg );
		}*/
	} else {
		$variable = '';
		$msg = 'Vacio en el campo: ' . $field;
		msgFail($msg);
	}

	if (isset($subs)) {
		$variable = substr($variable, 0, $subs);
	}
	return [$variable, $msg];
}

/***********************
 ******RANDOM STRING*****
 ************************/
function generateRandomString($length)
{
	//md5(date('Ymd'));
	return substr(str_shuffle(str_repeat($x = 'abcefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', ceil($length / strlen($x)))), 1, $length);
}

function generateFolder($idUSER)
{
	$semilla = strval('gjv' . $idUSER  * 3);

	$semSize = $idUSER * 752;
	$subLast = substr($semSize, strlen($semSize) - 1, 1);
	$last = substr(str_repeat($x = 'MTiCsqRlnbwhAmIEQYpaeFZSPGxLJXBkWruDcKHyofNjVztUgOv', ceil($subLast / strlen($x))), $subLast, $subLast);
	return $last . $semilla;
}

/***********************
 ******  SessionID  *****
 ************************/
function generateSessionID($str)
{
	$strSFL0 = generateRandomString(random_int(5, 7));
	$strSFL1 = generateRandomString(random_int(1, 3));
	$strSFL2 = generateRandomString(random_int(2, 5));
	$strSFL3 = generateRandomString(random_int(5, 7));

	$time = date('his');
	$random = $strSFL0 . $time . $strSFL1 . $strSFL2 . $strSFL3 . $str;
	$d4 = str_replace(4, "d", $random);

	return $d4;
}

function generateIDuser()
{
	$strSFL1 = generateRandomString(random_int(1, 3));
	$strSFL2 = generateRandomString(random_int(2, 3));

	$random = $strSFL1 . $strSFL2;

	return $random;
}


/***********************
 ******  Validate  *****
 ************************/

function sec2time($tiempo_en_segundos)
{
	$horas = floor($tiempo_en_segundos / 3600);
	$minutos = floor(($tiempo_en_segundos - ($horas * 3600)) / 60);
	$segundos = $tiempo_en_segundos - ($horas * 3600) - ($minutos * 60);

	return $horas . ':' . $minutos . ":" . $segundos;
}

function time2sec($time)
{
	$porciones = explode(":", $time);
	$segundos = (int) $porciones[0] * 60 * 60 + ((int) $porciones[1] * 60) + (int) $porciones[2];
	return $segundos;
}

function validateIP($token, $numTry, $tryMode)
{
	require("config.php");

	$db_game_host = $game_conn['host'];
	$db_game_user = $game_conn['user'];
	$db_game_name = $game_conn['name'];
	$db_game_pass = $game_conn['pass'];

	//Create connection GAME
	$connGame = new mysqli($db_game_host, $db_game_user, $db_game_pass, $db_game_name);
	// Check connection
	if ($connGame->connect_error) {
		die("Connection failed:" . $connGame->connect_error);
	}
	mysqli_set_charset($connGame, 'utf8');

	$proxy_headers = array(
		'HTTP_VIA',
		'HTTP_X_FORWARDED_FOR',
		'HTTP_FORWARDED_FOR',
		'HTTP_X_FORWARDED',
		'HTTP_FORWARDED',
		'HTTP_CLIENT_IP',
		'HTTP_FORWARDED_FOR_IP',
		'VIA',
		'X_FORWARDED_FOR',
		'FORWARDED_FOR',
		'X_FORWARDED',
		'FORWARDED',
		'CLIENT_IP',
		'FORWARDED_FOR_IP',
		'HTTP_PROXY_CONNECTION'
	);
	foreach ($proxy_headers as $x) {
		if (isset($_SERVER[$x]))
			die("No Proxy allow!");
	}

	$ip = $_SERVER['REMOTE_ADDR'];

	$result = $connGame->query(" SELECT `time`,`" . $tryMode . "` FROM `" . $token . "_ip` WHERE `id` = '" . $ip . "' ");
	$rowResult = mysqli_fetch_assoc($result);
	$resultTime = $rowResult['time'];
	$resultTry = (int) $rowResult[$tryMode];

	$actualTime = time2sec(date("h:i:s"));
	$difTime = 0;

	if (mysqli_num_rows($result) == 0) {
		//echo "No description available";
		$connGame->query(" INSERT INTO `" . $token . "_ip` (`id`,`time`,`" . $tryMode . "`) VALUES ('" . $ip . "', '" . $actualTime . "', 1) ");
		$difTime = 0;
		if ($tryMode == 'tryRank') {
			$difTime = 1000;
		} //to rank ip must exist
	} else {
		$difTime = (int) $actualTime - (int) $resultTime;
		if ($difTime < 0) {
			$difTime = (int) $actualTime - ((int) $resultTime + 86400);
		} //86400 seconds 1day

		if ($difTime < 900) { // 900sec = 15min
			if ($resultTry < $numTry) {
				$resultTry++;
				$connGame->query(" UPDATE `" . $token . "_ip` SET `" . $tryMode . "` = '" . $resultTry . "' WHERE `id` =  '" . $ip . "' ");
				$difTime = 0;
			} else {
				$difTime = 900 - $difTime;
			}
		} else {
			$connGame->query(" UPDATE `" . $token . "_ip` SET `tryGame` = '1', `tryRank` = '0', `time` = '" . $actualTime . "' WHERE `id` =  '" . $ip . "' ");
			$difTime = 0;
		}
	}

	$length = $connGame->query(" SELECT COUNT(*) AS NUM FROM `" . $token . "_ip` ");
	$lengthResult = mysqli_fetch_assoc($length);
	if ($lengthResult['NUM'] > 999) {
		$connGame->query(" DELETE FROM `" . $token . "_ip` LIMIT 300 ");
	}

	$connGame->close();
	return $difTime;
}

function setFail($incorrect)
{
	// Wrong password or no password entered display this message
	die("die Find fail: " . $incorrect);
}

function msgFail($incorrect)
{
	// Wrong password or no password entered display this message
	echo "msg Find fail: " . $incorrect;
}

/**
 * Get the directory size
 * @param  string $directory
 * @return integer
 */
function dirSize($directory)
{
	$size = 0;
	foreach (new RecursiveIteratorIterator(new RecursiveDirectoryIterator($directory)) as $file) {
		$size += $file->getSize();
	}
	return $size;
}

function post_max_size_exceeded()
{
	preg_match('~(\d+)([KMG])*~', ini_get('post_max_size'), $matches);
	list(, $number, $unit) = $matches;
	$postMaxSize = $number * ($unit ? pow(1024, ['K' => 1, 'M' => 2, 'G' => 3][$unit]) : 1);

	if ((int)$_SERVER['CONTENT_LENGTH'] > $postMaxSize) {
		error_log('post_max_size of ' . ($postMaxSize / pow(1024, 2)) . 'M exceeded: ' . ~~($_SERVER['CONTENT_LENGTH'] / pow(1024, 2)) . 'M received.');
		http_response_code(413);
		setFail('post_max_size of ' . ($postMaxSize / pow(1024, 2)) . 'M exceeded: ' . ~~($_SERVER['CONTENT_LENGTH'] / pow(1024, 2)) . 'M received.');
		exit;
	}
}

function getTable($sql, $name)
{
	$num_rows = mysqli_num_rows($sql);
	if ($num_rows > 0) {

		//print_r($_SESSION);
		$output_table = '<table id="' . $name . '">';
		foreach ($sql as $key => $var) {
			//$output_table .= '<tr>';
			if ($key === 0) {
				$output_table .= '<thead><tr>';
				foreach ($var as $col => $val) {
					$output_table .= "<th>" . $col . '</th>';
				}
				$output_table .= '</tr></thead><tbody>';
				foreach ($var as $col => $val) {
					$output_table .= '<td>' . $val . '</td>';
				}
				$output_table .= '</tr>';
			} else {
				$output_table .= '<tr>';
				foreach ($var as $col => $val) {
					$output_table .= '<td>' . $val . '</td>';
				}
				$output_table .= '</tr>';
			}
		}
		$output_table .= '</tbody></table>';
	} else {
		$output_table = '<table id="' . $name . '">
		<thead>
		  <tr>
			<th>NAME</th>
			<th>X</th>
			<th>Y</th>
			<th>ZOOM</th>
		  </tr>
		</thead>
	  </table>';
	}
	return $output_table;
}

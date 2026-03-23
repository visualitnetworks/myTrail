<?php
session_start();
require_once "./api_db/config.php";
require_once "./api_db/tools.php";

error_reporting(E_ERROR);
post_max_size_exceeded();

$to = 'test-1w2mzyiwa@srv1.mail-tester.com';
     $subject = 'el asunto';
     $message = '¡Hola!';
     $headers = 'From: noreply@terre3.es' . "\r\n" .
     'Reply-To: support@terre3.es' . "\r\n" .
     'X-Mailer: PHP/' . phpversion();

     mail($to, $subject, $message, $headers);

//if(!mail('acostacima@gmail.com', 'Mi Asunto', 'quiero mi bocadillo!')){ echo "Error al enviar el correo."; }

$conn = new mysqli($connDB['host'], $connDB['user'], $connDB['pass'], $connDB['name']);
$userID = $conn->query(" SELECT `userID` FROM `aaa_user` WHERE (`session` = '" . reset(filter($_POST['token'], 'token-new')) . "') ");
$userIDdb = mysqli_fetch_assoc($userID);

if (isset($userIDdb['userID']) && isset($_POST['email']) && isset($_POST['pass']) && isset($_POST['name'])) {
	$passDB = password_hash($_POST['pass'], PASSWORD_DEFAULT);
	$sessionID = generateSessionID('-NEW');

	$emlDB = $conn->query(" SELECT email FROM `aaa_user` WHERE (`userID` = '" . $userIDdb['userID'] . "') ");
	$emlDBFetch = mysqli_fetch_assoc($emlDB);
	
	if (strcmp($emlDBFetch['email'], $_POST['email']) !== 0) {
		// Destinatario
		$para = $emlDBFetch['email'];

		// Asunto del correo
		$asunto = "Su cuenta TerreTrail se ha actualizado";

		// Cuerpo del mensaje
		$mensaje = "Su cuenta TerreTrail de terre3.es ha sido actualizada. Si no ha sido usted o tiene dudas al respecto póngase en contacto con <a href=»mailto:support@terre3.es>support@terre3.es></a>";

		// Cabeceras adicionales (opcional pero recomendable)
		$cabeceras = "From: support@terre3.es" . "\r\n" .
			"Reply-To: support@terre3.es" . "\r\n" .
			"X-Mailer: PHP/" . phpversion();

		// Enviar el correo
		if (mail($para, $asunto, $mensaje, $cabeceras)) {
			echo "Correo enviado correctamente.";
		} else {
			echo "Error al enviar el correo.";
		}
	}

	$conn->query(" UPDATE `aaa_user` SET `session` = '" . $sessionID . "' WHERE `userID` = '" . $userIDdb['userID'] . "' ");
	$conn->query(" UPDATE `aaa_user` SET `name` = '" . reset(filter($_POST['name'], 'user-new')) . "' WHERE `userID` = '" . $userIDdb['userID'] . "' ");
	$conn->query(" UPDATE `aaa_user` SET `email` = '" . reset(filter($_POST['email'], 'email-new')) . "' WHERE `userID` = '" . $userIDdb['userID'] . "' ");
	$conn->query(" UPDATE `aaa_user` SET `pass` = '" . $passDB . "' WHERE `userID` = '" . $userIDdb['userID'] . "' ");

	$conn->query(" UPDATE `data_login` SET `data_created` = '" . date("Y-m-d H:i:s") . "' WHERE `userID` = '" . $userIDdb['userID'] . "' ");
	$ip = isset($_SERVER['HTTP_CLIENT_IP']) ? $_SERVER['HTTP_CLIENT_IP'] : (isset($_SERVER['HTTP_X_FORWARDED_FOR']) ? $_SERVER['HTTP_X_FORWARDED_FOR'] : $_SERVER['REMOTE_ADDR']);
	$conn->query(" UPDATE `data_login` SET IP_ADRESS=CONCAT('" . $ip . "-',`IP_ADRESS`) WHERE `userID` = '" . $userIDdb['userID'] . "' ");

	echo 'Bienvenido! Ya puede hacer Login. :-)';
} else {
	msgFail('Wrong values, sorry');
}
$conn->close();
exit;

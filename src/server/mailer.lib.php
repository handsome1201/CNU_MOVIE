<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require '../../vendor/phpmailer/phpmailer/src/PHPMailer.php';
require '../../vendor/phpmailer/phpmailer/src/Exception.php';
require '../../vendor/phpmailer/phpmailer/src/SMTP.php';


function mailer($fname, $fmail, $to, $subject, $content, $type=0, $cc="", $bcc="") {
    if ($type != 1)
        $content = nl2br($content);
    
        $mail = new PHPMailer();

        $mail->IsSMTP();
        $mail->SMTPSecure= "ssl";
        $mail->SMTPAuth = true;

        $mail->Host = "smtp.naver.com";
        $mail->Port = 465;
        $mail->Username = "dyyim4725";
        $mail->Password = "dlaehddbs@12";

        $mail->CharSet = 'UTF-8';
        $mail->From = $fmail;
        $mail->FromName = $fname;
        $mail->Subject = $subject;
        $mail->AltBody = "";
        $mail->msgHTML($content);
        $mail->addAddress($to);
        if ($cc) {
            $mail->addCC($cc);
        }
        if ($bcc)
            $mail->addBCC($bcc);
        
        return $mail->send();
}
?>
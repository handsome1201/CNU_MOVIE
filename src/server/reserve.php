<?php
include_once('./mailer.lib.php');
$tns = "
    (DESCRIPTION=
        (ADDRESS_LIST= (ADDRESS=(PROTOCOL=TCP)(HOST=localhost)(PORT=1521)))    
        (CONNECT_DATA = (SERVICE_NAME=XE))
    )"; 
$dns = "oci:dbname=".$tns.";charset=utf8";
$username = 'C##T_201802147';
$password = 'qlrqod12';

try {
    $conn = new PDO($dns, $username, $password);        #로그인
    $data = json_decode(file_get_contents('php://input'), true);
    $sql = "INSERT INTO TIKETING
    (RC_DATE, SEATES, STATUS, CID, S_ID)
    VALUES (SYSDATE, ".$data["num"].", 'R', ".$data["cid"].", ".$data["sid"].")";          #쿼리문
    $stmt = $conn -> prepare($sql);
    try {
        $conn -> beginTransaction();
        $stmt->execute();
        $conn-> commit();
    } catch (PDOException $e) {
        $conn -> rollback();
        echo("에러 내용: ".$e->getMessage());
    }
    $ansql = "Select m.title, s.s_datetime From MOVIE M, SCHEDULE S Where m.mid = s.mid and s.sid = ".$data["sid"]."";
    $stmt = $conn -> prepare($ansql);
    $stmt->execute();
    $row = $stmt->fetchAll(PDO::FETCH_OBJ);
    $mailContent = "영화제목 : ".$row[0]->TITLE."
    / 상영일시 : ".$row[0]->S_DATETIME." / 상영관 : ".$data["room"]."관 /
     좌석 수 : ".$data["num"]." / 예매자명 : ".$data["name"]." / 즐거운 관람 되세요.";
    mailer("CNU영화관", "dyyim4725@naver.com", $data["email"], "CNU 예매정보", $mailContent, 1);
    print "예약완료";

} catch (PDOException $e) {
    echo("에러 내용: ".$e->getMessage());
}
?>
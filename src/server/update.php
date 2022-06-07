<?php
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
    $sql = "UPDATE ( Select T.STATUS, S.S_DATETIME
    FROM TIKETING T, SCHEDULE S
    WHERE T.S_ID = S.SID
    )
    SET STATUS = 'W'
    WHERE STATUS = 'R' and S_DATETIME < SYSDATE";         #쿼리문
    $stmt = $conn -> prepare($sql);
    try {
        $conn -> beginTransaction();
        $stmt->execute();
        $conn-> commit();
    } catch (PDOException $e) {
        $conn -> rollback();
        echo("에러 내용: ".$e->getMessage());
    }
    print "업데이트완료";
} catch (PDOException $e) {
    echo("에러 내용: ".$e->getMessage());
}
?>
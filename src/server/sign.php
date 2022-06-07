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
    $today = substr(date("Ymd"),2);
    $ranint = rand(100, 999);
    $sql = "INSERT INTO CUSTOMER
    VALUES (".$today.$ranint.", '".$data["name"]."', '".$data["pw"]."', '".$data["id"]."', '".$data["birth"]."', '".$data["sex"]."' )";         #쿼리문
    $stmt = $conn -> prepare($sql);
    try {
        $conn -> beginTransaction();
        $stmt->execute();
        $conn-> commit();
    } catch (PDOException $e) {
        $conn -> rollback();
        echo("에러 내용: ".$e->getMessage());
    }
    print "가입완료";
} catch (PDOException $e) {
    echo("에러 내용: ".$e->getMessage());
}
?>
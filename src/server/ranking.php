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
    $sql = "Select C.C_NAME name, SUM(T.SEATES) sum_seat, COUNT(*) sum_ticket,
    RANK() OVER (ORDER BY SUM(T.SEATES) DESC) rank
    From CUSTOMER C, TIKETING T
    Where C.CID = T.CID and T.STATUS = 'W'
    Group by C.C_NAME";         #쿼리문
    $stmt = $conn -> prepare($sql);
    $stmt->execute();
    $row = $stmt->fetchAll(PDO::FETCH_OBJ);
    if ($row === []) {
        echo "실패";
    } else {
        echo json_encode($row, JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
    }   
} catch (PDOException $e) {
    echo("에러 내용: ".$e->getMessage());
}
?>
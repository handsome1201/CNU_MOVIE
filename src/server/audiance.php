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
    $sql = "Select DECODE(GROUPING(M.TITLE), 1, 'AllMovie', M.TITLE) title, 
    DECODE(GROUPING(S.S_DATETIME), 1, 'sum', S.S_DATETIME) schedule,
    COUNT(*) ticketC, SUM(T.SEATES) watchNum 
    From MOVIE M, SCHEDULE S, TIKETING T
    Where M.mid = S.mid and S.sid = T.s_id and T.STATUS = 'W'
    group by ROLLUP (M.TITLE, s.s_datetime)";         #쿼리문
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
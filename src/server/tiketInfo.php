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
    $sql = "SELECT S.sid, S.tname, S.mid, S.s_datetime, NVL(T.reserv_seat, 0) r_seat, R.total_seat t_seat
    from SCHEDULE S,
        (select s_id, SUM(seates) as reserv_seat
        from tiketing
        group by s_id) T, THEATER R
    where T.s_id(+) = S.sid and R.tname = S.tname and S.mid = ".$data["mid"];          #쿼리문
    $stmt = $conn -> prepare($sql);
    $stmt->execute();
    while ($row = $stmt->fetchAll(PDO::FETCH_OBJ)) {
        echo json_encode($row, JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
    }
} catch (PDOException $e) {
    echo("에러 내용: ".$e->getMessage());
}
?>
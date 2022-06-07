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
    $sql = "Select j.title, j.s_datetime, j.tname, t.status, t.seates, t.rc_date, t.t_id
    from tiketing t, 
        (Select m.title, s.s_datetime, s.tname, s.sid
        from movie m, schedule s
        where m.mid = s.mid) j
    where t.s_id = j.sid and cid =".$data["cid"];          #쿼리문
    $stmt = $conn -> prepare($sql);
    $stmt->execute();
    while ($row = $stmt->fetchAll(PDO::FETCH_OBJ)) {
        echo json_encode($row, JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
    }
} catch (PDOException $e) {
    echo("에러 내용: ".$e->getMessage());
}
?>
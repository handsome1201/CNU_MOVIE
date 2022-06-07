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
    $sql = "Select m.title, m.mid, m.open_day, m.director, m.rating, m.movie_length, NVL(k.seat, 0) as tiketer, j.audiance
    from movie m, (
        select s.mid, SUM(t.wseat) as seat
        from schedule s, (
            select s_id, SUM(SEATES) as wseat
            from tiketing 
            where status = 'R'
            group by s_id) t
        where s.sid = t.s_id
        group by mid) k, (
        select m.title, m.mid, m.open_day, m.director, m.rating, m.movie_length, NVL(k.seat, 0) as audiance
        from movie m, (
            select s.mid, SUM(t.wseat) as seat
            from schedule s, (
                select s_id, SUM(SEATES) as wseat
                from tiketing 
                where status = 'W'
                group by s_id) t
            where s.sid = t.s_id
            group by mid) k
        where m.mid = k.mid(+)
            ) j
    where m.mid = k.mid(+) and m.mid = j.mid and m.mid = ".$data['mid']." ";          #쿼리문
    $stmt = $conn -> prepare($sql);
    $stmt->execute();
    while ($row = $stmt->fetchAll(PDO::FETCH_OBJ)) {
        echo json_encode($row, JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
    }
} catch (PDOException $e) {
    echo("에러 내용: ".$e->getMessage());
}
?>
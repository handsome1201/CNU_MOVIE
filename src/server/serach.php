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
    if ($data["class"] == "영화제목") {
        $sql = "SELECT * from movie where title LIKE '%".$data["data"]."%' ";          #쿼리문
    } else {
        $sql = "SELECT * from movie where open_day <= '".$data["date"]."' and '".$data["date"]."' < open_day+10"; 
    }
    
    $stmt = $conn -> prepare($sql);
    $stmt->execute();
    while ($row = $stmt->fetchAll(PDO::FETCH_OBJ)) {
        echo json_encode($row, JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
    }
} catch (PDOException $e) {
    echo("에러 내용: ".$e->getMessage());
}
?>
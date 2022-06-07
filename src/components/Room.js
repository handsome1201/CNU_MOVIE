import { useState, useEffect } from "react";
import DivStyle from "../style/DivStyle.module.css";

function Room({ date, schedule, roomName, rnum, rate }) {
    let today = new Date();
    const [nowData, setNowData] = useState([]);
    const [renderFlag, setRenderFlag] = useState(false);
    const settingData = () => {
        let tempArray = [];
        schedule.map((arr) => {     //날짜가 맞는 데이터만 걸러준다.
            if ((((JSON.stringify(date.substr(2,))).replace("-", "/")).replace("-", "/"))
                === JSON.stringify(arr["S_DATETIME"].substr(0, 8))) {
                tempArray.push(arr);
            }
        })
        if (tempArray.toString() === [].toString()) {
            setRenderFlag(false);
        } else {
            setRenderFlag(true);
            setNowData(tempArray.sort(compare_date));
        }
    }
    useEffect(() => {
        settingData();
    }, [date])
    function compare_date(a, b) {       //시간별로 정렬
        if (a.S_DATETIME < b.S_DATETIME) {
            return -1;
        }
        if (a.S_DATETIME > b.S_DATETIME) {
            return 1;
        }
        return 0;
    }
    const mOver = (event) => {
        { document.getElementById(event.target.id).style.backgroundColor = "grey" }
    }
    const mDown = (event) => {
        { document.getElementById(event.target.id).style.backgroundColor = "white" }
    }
    const reserve = (event) => {
        let cid = sessionStorage.getItem('cid')
        if (cid === null) {
            alert("로그인 후 이용하세요");
            window.location.href = "/";
        }
        else if (sessionStorage.getItem('age') < rate && rate !== 'ALL') {
            alert("연령제한에 맞지 않습니다.");
            window.location.href = "/";
        }
        //시간 지난 영화 예약안되도록
        else {
            if (window.confirm("인원: " + rnum + "예약하시겠습니까?") === true) {
                const send = async () => {
                    try {
                        let url = '/dbtp/src/server/reserve.php';
                        let response = await fetch(url, {
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                cid: cid,
                                date: date,
                                sid: event.target.id,
                                num: rnum,
                                email: sessionStorage.getItem('email'),
                                name: sessionStorage.getItem('name'),
                                room: roomName,
                            })
                        });
                        alert("예매완료");
                        window.location.href = "/";
                    } catch (e) {
                        alert(e);
                    }
                }
                send();
            } else {
                //아무일도 일어나지 않는다.
            }
        }

    }
    return (
        <div className={DivStyle.marginB15}>
            {renderFlag
                ?
                <div className={DivStyle.roomDiv}>
                    <h3>Room{roomName}</h3>
                    <div className={DivStyle.scheDiv}>
                        {nowData.map((arr) => {
                            let temp = "20" + (arr["S_DATETIME"].substr(0, 17).replace("/", "-")).replace("/", "-")
                            temp = new Date(temp)
                            let flag = temp > today     //현재시간 보다 전의 영화들 예매불가
                            return (
                                <div
                                    onClick={flag ? reserve : null}
                                    onMouseEnter={flag ? mOver : null}
                                    onMouseLeave={flag ? mDown : null}
                                    className={DivStyle.scheItem}
                                    key={arr["SID"]}
                                    id={arr["SID"]}
                                >
                                    <p id={arr["SID"]}>상영시간 {arr["S_DATETIME"].substr(8, 9)}</p>
                                    <p id={arr["SID"]}>좌석 {arr["T_SEAT"] - arr["R_SEAT"]}/{arr["T_SEAT"]}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
                : null}
        </div>
    );
}


export default Room;
import { useEffect, useState } from 'react';
import DivStyle from "../style/DivStyle.module.css";
import Room from "../components/Room";

function Tiketing({ mid, rate }) {
    const [reDate, setReDate] = useState("");     //날짜선택
    const [reNum, setReNum] = useState(1);       //인원선택
    const [dFlag, setDFlag] = useState(-1);
    const [room1, setRoom1] = useState([])
    const [room2, setRoom2] = useState([])
    const [room3, setRoom3] = useState([])
    const [room4, setRoom4] = useState([])
    const [room5, setRoom5] = useState([])
    const changeNum = (event) => {
        setReNum(event.target.value);
    }
    const changeDate = (event) => {
        setReDate(event.target.value);
    }
    const getTdata = async () => {
        try {
            let url = '/dbtp/src/server/tiketInfo.php';
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    mid: mid
                })
            });
            let data = await response.json();
            let tempRoom1 = []
            let tempRoom2 = []
            let tempRoom3 = []
            let tempRoom4 = []
            let tempRoom5 = []
            //예외 -> 영화에 스케줄정보가 아예 없을 때 -> 예매버튼이 안눌림.
            data.map((arr) => {
                switch (arr["TNAME"]) {
                    case "Room1":
                        tempRoom1.push(arr);
                        break;
                    case "Room2":
                        tempRoom2.push(arr);
                        break;
                    case "Room3":
                        tempRoom3.push(arr);
                        break;
                    case "Room4":
                        tempRoom4.push(arr);
                        break;
                    case "Room5":
                        tempRoom5.push(arr);
                        break;
                }
            })
            setRoom1(tempRoom1);
            setRoom2(tempRoom2);
            setRoom3(tempRoom3);
            setRoom4(tempRoom4);
            setRoom5(tempRoom5);
        } catch (e) {
            alert(e);
        }
    }
    useEffect(() => {
        getTdata();
    }, [])
    useEffect(() => {
        setDFlag(dFlag + 1);
    }, [reDate])
    return (
        <div>
            <div className={DivStyle.flex2}>
                <span>
                    예매인원(1~10): <input
                        className={DivStyle.inputStyle}
                        onChange={changeNum}
                        value={reNum}
                        type="number"
                        min={1}
                        max={10}
                        placeholder='예매인원선택'>
                    </input>
                </span>
                <span>
                    날짜선택: <input
                        className={DivStyle.inputStyle}
                        onChange={changeDate}
                        value={reDate}
                        type="date">
                    </input>
                </span>
            </div>
            {dFlag ?
                <div>
                    <Room date={reDate} schedule={room1} roomName={1} rnum={reNum} rate={rate} />
                    <Room date={reDate} schedule={room2} roomName={2} rnum={reNum} rate={rate} />
                    <Room date={reDate} schedule={room3} roomName={3} rnum={reNum} rate={rate} />
                    <Room date={reDate} schedule={room4} roomName={4} rnum={reNum} rate={rate} />
                    <Room date={reDate} schedule={room5} roomName={5} rnum={reNum} rate={rate} />
                </div>
                : <p> 인원, 날짜를 선택해주세요 </p>}
        </div>
    );
}


export default Tiketing;
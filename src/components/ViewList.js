import DivStyle from "../style/DivStyle.module.css";
import { useEffect, useState } from 'react';

function ViewList() {
    let today = new Date();
    let year = today.getFullYear() // 년도
    let month = (today.getMonth()).length !== 1 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1;  // 월
    let date = (today.getDate()).length !== 1 ? "0" + (today.getDate()) : today.getDate();
    const [startDate, setStartDate] = useState(year + "-" + month + "-" + date);
    const [endDate, setEndDate] = useState(year + "-" + month + "-" + date);
    const [pickedOption, setPickedOption] = useState("예매내역");
    const [allData, setAllData] = useState([]);
    const [conditionData, setConditionData] = useState([]);
    const [cancleFlag, setCancleFlag] = useState(false);
    const pickList = ["예매내역", "관람내역", "취소내역"];
    const sdChange = (event) => {
        setStartDate(event.target.value);
    }
    const edChange = (event) => {
        setEndDate(event.target.value);
    }
    const changePick = (event) => {
        setPickedOption(event.target.value);
    }
    const changeCondition = () => {
        let resultArr = []
        allData.map((arr) => {
            let start = Date.parse(startDate);
            let end = Date.parse(endDate);
            let arrData = Date.parse("20" + arr["RC_DATE"])
            if (start <= arrData && arrData <= end) {
                if (pickedOption === "예매내역" && arr["STATUS"] === 'R') {
                    resultArr.push(arr);
                } else if (pickedOption === "관람내역" && arr["STATUS"] === 'W') {
                    resultArr.push(arr);
                } else if (pickedOption === "취소내역" && arr["STATUS"] === 'C') {
                    resultArr.push(arr);
                }
            }
        })
        if (pickedOption === "예매내역") {
            setCancleFlag(true);
        } else {
            setCancleFlag(false);
        }
        if (pickedOption === "관람내역") {  //관람내역은 관람날짜 (S_DATETIME 정렬)
            resultArr.sort(compare_dt)
        } else {                            //예매, 취소는 실행 날짜 (RC_DATE 정렬) 
            resultArr.sort(compare_rc)
        }


        setConditionData(resultArr);
    }
    const getUserticket = async () => {
        try {
            let url = '/dbtp/src/server/getTiket.php';
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    cid: sessionStorage.getItem('cid')
                })
            });
            let data = await response.json();
            data.map((arr) => {
                arr["RC_DATE"] = (arr["RC_DATE"].replace("/", "-")).replace("/", "-");
                arr["S_DATETIME"] = arr["S_DATETIME"].substr(0, 17);
            })
            setAllData(data);
        } catch (e) {
            alert("데이터가 없음");
        }
    }
    const doCancle = (event) => {
        const cancle = async () => {
            try {
                let url = '/dbtp/src/server/cancle.php';
                let response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        tid: event.target.id,
                        date: year + "/" + month + "/" + date
                    })
                })
                alert("취소됐습니다.");
                window.location.reload();
            } catch (e) {
                alert(e);
            }
        }
        if (window.confirm(event.target.id + "번을 취소하시겠습니까?")) {
            cancle();
        } else {
            //아무일도 일어나지 않는다.
        }
    }
    function compare_rc(a, b) {
        if (a.RC_DATE < b.RC_DATE) {
            return 1;
        }
        if (a.RC_DATE > b.RC_DATE) {
            return -1;
        }
        return 0;
    }
    function compare_dt(a, b) {
        if (a.S_DATETIME < b.S_DATETIME) {
            return 1;
        }
        if (a.S_DATETIME > b.S_DATETIME) {
            return -1;
        }
        return 0;
    }
    useEffect(() => {
        getUserticket();
        changeCondition();
    }, [])
    useEffect(() => {
        changeCondition();
    }, [startDate, endDate, pickedOption])
    return (
        <div>
            <span>
                <select onChange={changePick} value={pickedOption}>
                    {pickList.map((item) =>
                        <option value={item} key={item}>
                            {item}
                        </option>
                    )}
                </select>
                시작일자 :
                <input
                    type="date"
                    value={startDate}
                    onChange={sdChange}
                >
                </input>
                ~ 종료일자 :
                <input
                    type="date"
                    value={endDate}
                    onChange={edChange}
                >
                </input>
            </span>
            <div className={DivStyle.tableDiv}>
                <table className={DivStyle.table}>
                    <thead className={DivStyle.th}>
                        <tr>
                            <td className={DivStyle.td}>날짜</td>
                            <td className={DivStyle.td}>영화제목</td>
                            <td className={DivStyle.td}>상영관</td>
                            <td className={DivStyle.td}>상영일시</td>
                            <td className={DivStyle.td}>예매좌석 수</td>
                            <td className={DivStyle.td}>취소</td>
                        </tr>
                    </thead>
                    <tbody>
                        {conditionData.map((arr) => {
                            let temp = new Date("20" + (arr["S_DATETIME"].replace("/", "-")).replace("/", "-"))
                            let disFlag = Date.parse(temp) < Date.parse(today)
                            return (
                                <tr key={arr["T_ID"]}>
                                    <td className={DivStyle.td}>{arr["RC_DATE"]}</td>
                                    <td className={DivStyle.td}>{arr["TITLE"]}</td>
                                    <td className={DivStyle.td}>{arr["TNAME"]}</td>
                                    <td className={DivStyle.td}>{arr["S_DATETIME"]}</td>
                                    <td className={DivStyle.td}>{arr["SEATES"]}</td>
                                    <td className={DivStyle.td}>
                                        {cancleFlag
                                            ? <button disabled={disFlag} id={arr["T_ID"]} onClick={doCancle}>취소하기</button>
                                            : null}
                                    </td>
                                </tr>);
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ViewList;
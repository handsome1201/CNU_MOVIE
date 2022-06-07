import { useEffect, useState } from "react";
import DivStyle from "../style/DivStyle.module.css";

function MemRanking() {
    const [ranking, setRanking] = useState([]);
    const getRanking = async () => {
        try {
            let url = "./dbtp/src/server/ranking.php";
            let response = await fetch(url);
            let data = await response.json();
            setRanking(data);
        } catch (e) {
            alert(e);
        }
    }
    const update = async () => {
        try {
            let url = "./dbtp/src/server/update.php";
            let response = await fetch(url);
            alert("업데이트 완료");
            window.location.reload();
        } catch (e) {
            alert(e);
        }
    }
    useEffect(() => {
        getRanking();
    }, [])
    return (
        <div>
            <div className={DivStyle.scheDiv}>
                <h3>관람 랭킹 확인하기</h3>
                <button onClick={update}> 업데이트 </button>
            </div>
            <div className={DivStyle.tableDiv}>
                <table className={DivStyle.table}>
                    <thead>
                        <tr>
                            <td className={DivStyle.th}>이름</td>
                            <td className={DivStyle.th}>총_예매_좌석</td>
                            <td className={DivStyle.th}>예매횟수</td>
                            <td className={DivStyle.th}>순위</td>
                        </tr>
                    </thead>
                    <tbody>
                        {ranking.map((obj, index) => {
                            return (
                                <tr key={index}>
                                    <td className={DivStyle.td}>{obj["NAME"]}</td>
                                    <td className={DivStyle.td}>{obj["SUM_SEAT"]}</td>
                                    <td className={DivStyle.td}>{obj["SUM_TICKET"]}</td>
                                    <td className={DivStyle.td}>{obj["RANK"]}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );



}


export default MemRanking;
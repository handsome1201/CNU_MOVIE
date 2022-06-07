import { useState, useEffect } from "react";
import DivStyle from "../style/DivStyle.module.css";

function MovieSchedule({ selected, setSelect }) {
    const [titleList, setTitleList] = useState([]);
    const [allData, setAllData] = useState([]);
    const changeSelect = (event) => {
        setSelect(event.target.value);
    }
    const getSchedule = async () => {
        try {
            let url = './dbtp/src/server/schedule.php';
            let response = await fetch(url);
            let data = await response.json();
            let mySet = new Set();
            data.map((obj) => [
                mySet.add(obj["TITLE"])
            ])
            mySet.add("조회할 영화 선택")
            setTitleList([...mySet].reverse())
            setAllData(data);
        } catch (e) {
            alert(e);
        }
    }
    useEffect(() => {
        getSchedule();
    }, [])
    return (
        <div>
            <h3>스케줄 정보보기</h3>
            <select value={selected} onChange={changeSelect}>
                {titleList.map((val, index) => {
                    return (
                        <option value={val} key={index}>
                            {val}
                        </option>
                    );
                })}
            </select>
            <div className={DivStyle.tableDiv}>
                <table className={DivStyle.table}>
                    <thead>
                        <tr>
                            <td className={DivStyle.th}>영화제목</td>
                            <td className={DivStyle.th}>상영관</td>
                            <td className={DivStyle.th}>시간</td>
                        </tr>
                    </thead>
                    <tbody>
                        {allData.map((obj, index) => {
                            return (obj["TITLE"] === selected
                                ?
                                <tr key={index}>
                                    <td className={DivStyle.td}>{obj["TITLE"]}</td>
                                    <td className={DivStyle.td}>{obj["TNAME"]}</td>
                                    <td className={DivStyle.td}>{obj["S_DATETIME"]}</td>
                                </tr>
                                : null
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}


export default MovieSchedule;
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../style/SearchBar.module.css";

function Search({ setSearchData }) {
    let today = new Date();
    let year = today.getFullYear() // 년도
    let month = (today.getMonth()).length !== 1 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1;  // 월
    let date = (today.getDate()).length !== 1 ? "0" + (today.getDate()) : today.getDate();
    const [typing, setTyping] = useState("");
    const [selDate, SetSelDate] = useState(year + "-" + month + "-" + date);
    const selectList = ["영화제목", "관람일"];
    const [selected, setSelect] = useState("영화제목");
    const changeSelect = (event) => {
        setSelect(event.target.value);
    }
    const changeTyping = (event) => {
        setTyping(event.target.value);
    }
    const changeDate = (event) => {
        SetSelDate(event.target.value)
    }
    const searching = async () => {
        try {
            let url = "./dbtp/src/server/serach.php";
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    class: selected,
                    data: typing,
                    date: selDate,
                })
            })
            let data = await response.json();
            setSearchData(data);
            //검색결과 data를 SearchResult로 넘겨줘서 SearchResult에서 보여줌
        } catch (e) {
            alert("검색결과 없음");
        }
    }
    return (
        <div className={SearchBar.container}>
            <select className={SearchBar.item} onChange={changeSelect} value={selected}>
                {selectList.map((item) =>
                    <option value={item} key={item}>
                        {item}
                    </option>
                )}
            </select>
            {selected === "영화제목"
                ?
                <input
                    value={typing}
                    onChange={changeTyping}
                    className={SearchBar.item}
                    id="search"
                    placeholder="검색어 입력">
                </input>
                :
                <input
                    type="date"
                    value={selDate}
                    onChange={changeDate}
                >
                </input>
            }
            <Link to="/search">
                <button onClick={searching} className={SearchBar.item}> 검색 </button>
            </Link>
        </div>
    );
}


export default Search;
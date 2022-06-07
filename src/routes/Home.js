import Logo from "../components/Logo";
import Login from "../components/Login";
import Search from "../components/SearchBar";
import Movie from "../components/Movie";
import DivStyle from "../style/DivStyle.module.css";
import { useState, useEffect } from "react";

function Home({ setSearchData }) {
    // 홈 화면을 구성하는 Route역할
    const [movieTitle, setMovieTitle] = useState([]);
    const [mID, setMID] = useState([]);
    const [exMovieTitle, setExMovieTitle] = useState([]);
    const [exmid, setExmid] = useState([]);
    const getData = async () => {   //홈화면에 띄워질 영화들을 load하는 함수
        try {
            let url = './dbtp/src/server/loadInitMovie.php';
            let response = await fetch(url);
            let data = await response.json();
            return data;
        } catch (e) {
            alert(e);
        }
    }
    const makeData = async () => {  //load된 데이터를 가공하는 함수
        try {
            let myArray = await getData();
            let titleArray = []
            let midArray = []
            let exArr = []
            let exmidArr = []
            myArray.map((movie, index) => {
                if (index < 5) {
                    titleArray.push(movie.TITLE);
                    midArray.push(movie.MID);
                } else {
                    exArr.push(movie.TITLE);
                    exmidArr.push(movie.MID);
                }
            })
            setMovieTitle(titleArray);
            setMID(midArray);
            setExMovieTitle(exArr);
            setExmid(exmidArr);
            sessionStorage.setItem('now', midArray);
            sessionStorage.setItem("expected", exmidArr);
        } catch (e) {
            alert(e.responseData);
        }
    }
    useEffect(() => {   //화면이 처음 띄워질 때만 데이터를 가져오고 가공한다.
        makeData();
    }, [])
    return (
        <div>
            <div className={DivStyle.flex2}>
                <Logo Flag={false} />
                <Login />
            </div>
            <Search setSearchData={setSearchData} />
            <Movie script="상영중인 영화" title={movieTitle} mid={mID} />
            <Movie script="상영예정 영화" title={exMovieTitle} mid={exmid} />
        </div>
    );
}

export default Home;
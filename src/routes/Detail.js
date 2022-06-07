import Logo from "../components/Logo";
import Tiketing from "../components/Tiketing";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DivStyle from "../style/DivStyle.module.css";

function Detail() {
    let today = new Date();
    const { id } = useParams();
    const [movieData, setMovieData] = useState({});
    const [actorData, setActorData] = useState([{ A_NAME: "" }, { A_NAME: "" }]);
    const [loading, setLoding] = useState(false);
    const [tiketing, setTiketing] = useState(false);
    const getSingleData = async () => {
        let url = '/dbtp/src/server/detail.php';
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                mid: id,
            })
        });
        let data = await response.json();
        setMovieData(data[0])
        setLoding(true);
    }
    const getActor = async () => {
        let url = '/dbtp/src/server/actor.php';
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                mid: id,
            })
        });
        let data = await response.json();
        setActorData(data);
    }
    useEffect(() => {
        getSingleData();
        getActor();
    }, [])
    const renderTicketing = () => {
        setTiketing(true)
    }
    return (
        <div>
            <Logo Flag={true} />
            {loading ?
                <div className={DivStyle.gridContainer}>
                    <div></div>
                    <div className={DivStyle.detailDiv}>
                        <img className={DivStyle.imgStyle} src={require("../poster/" + movieData["MID"] + ".jpg")} placeholder={movieData["TITLE"]}></img>
                        <div className={DivStyle.summaryDiv}>
                            <h2>{movieData["TITLE"]}</h2>
                            <p>개봉일 : {movieData["OPEN_DAY"]}</p>
                            <p>감독 : {movieData["DIRECTOR"]}</p>
                            <p>출연 : {actorData[0]["A_NAME"]}, {actorData[1]["A_NAME"]} </p>
                            <p>등급 : {movieData["RATING"]}</p>
                            <p>상영시간 : {movieData["MOVIE_LENGTH"]}</p>
                            {(sessionStorage.getItem('expected').split(",")).includes(id)
                                ? null
                                : <p>누적관람객 : {movieData["AUDIANCE"]}</p>}
                            <p>예매자 수 : {movieData["TIKETER"]}</p>
                        </div>
                    </div>
                    <div></div>
                    <div></div>
                    <div>
                        {tiketing ?
                            <Tiketing mid={id} rate={movieData["RATING"]} />
                            :
                            <button
                                disabled={!((sessionStorage.getItem('now').split(",")).includes(id) || (sessionStorage.getItem('expected').split(",")).includes(id))}
                                onClick={renderTicketing}
                            >
                                예매하기
                            </button>
                        }
                    </div>
                    <div></div>
                </div>
                : <p>Loading...</p>}
        </div>
    );
}

export default Detail;
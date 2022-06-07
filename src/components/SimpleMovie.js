import DivStyle from "../style/DivStyle.module.css";
import { Link } from "react-router-dom";

function SimpleMovie({ mid, title, openDay, director, rating, movieLen }) {
    return (
        <div className={DivStyle.SimpleMovieFrame}>
            <div className={DivStyle.SimpleImage}>
                <img className={DivStyle.imgStyle} src={require("../poster/" + mid + ".jpg")} placeholder={title}></img>
            </div>
            <div className={DivStyle.SimpleSummary}>
                <h3>{title}</h3>
                <p>개봉일 : {openDay}</p>
                <p>감독 : {director}</p>
                <p>등급 : {rating}</p>
                <p>상영시간 : {movieLen}</p>
                <Link to={"/detail/" + mid} >
                    <button>상세정보/예매</button>
                </Link>
            </div>
        </div>

    );
}


export default SimpleMovie;
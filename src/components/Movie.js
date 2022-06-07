import { Link } from "react-router-dom"
import DivStyle from "../style/DivStyle.module.css";

function Movie({ script, title, mid }) {
    return (
        <div className={DivStyle.movieFrame}>
            <h2 className={DivStyle.pad20}> {script} </h2>
            <div className={DivStyle.movieContainer}>
                {title.map((data, index) => {
                    let img = require("../poster/" + mid[index] + ".jpg");
                    return (
                        <Link to={"/detail/" + mid[index]} key={mid[index]}>
                            <div className={DivStyle.alignCenter}>
                                <img className={DivStyle.imgStyle} src={img} placeholder={data}></img>
                                <p className="title"> {data.length > 12 ? data.substr(0, 12) + "..." : data} </p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>

    );
}


export default Movie;
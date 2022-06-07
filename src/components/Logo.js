import templogo from "../img/logo_temp.png"
import DivStyle from "../style/DivStyle.module.css";

function Logo({ Flag = "false" }) {
    return (
        Flag ? <img className={DivStyle.Logo} width={500} height={250} src={templogo} alt="이미지임"></img> :
            <img width={500} height={250} src={templogo} alt="이미지임"></img>
    );



}


export default Logo;
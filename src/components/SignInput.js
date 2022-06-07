import DivStyle from "../style/DivStyle.module.css";
import { useState, useEffect } from 'react';

function SignInput({ inputName, data, setter }) {
    const [inputType, setInputType] = useState("text");
    const [radioFlag, setRadioFlag] = useState(false);
    const changeData = (event) => {
        setter(event.target.value);
    }
    const initSetting = () => {
        if (inputName === "비밀번호" || inputName === "비밀번호 확인") {
            setInputType("password");
        } else if (inputName === "생년월일") {
            setInputType("date");
        } else if (inputName === "성별") {
            setInputType("radio");
            setRadioFlag(true);
        }
    }
    useEffect(() => {
        initSetting();
    }, [])
    return (
        <div className={DivStyle.flex1}>
            <span></span>
            <span className={DivStyle.item}>{inputName}</span>
            {radioFlag
                ?
                <div>
                    <label>Man
                        <input value='man' type={inputType} onChange={changeData} checked={data === 'man'} />
                    </label>
                    <label>Woman
                        <input value='woman' type={inputType} onChange={changeData} checked={data === 'woman'} />
                    </label>
                </div>
                :
                <input
                    type={inputType}
                    value={data}
                    className={DivStyle.item}
                    onChange={changeData}
                >
                </input>
            }

            <span></span>
        </div>
    );
}


export default SignInput;
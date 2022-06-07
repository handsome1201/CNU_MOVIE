import SignInput from "../components/SignInput";
import Logo from "../components/Logo";
import DivStyle from "../style/DivStyle.module.css";
import { useState } from 'react';

function Join() {
    const [inputid, setInputID] = useState("");
    const [inputpw, setInputPW] = useState("");
    const [inputcheck, setInputCheck] = useState("");
    const [inputName, setInputName] = useState("");
    const [inputBirth, setInputBirth] = useState("");
    const [inputSex, setInputSex] = useState("");
    const SignIn = async () => {
        var regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        if (inputid === "" || inputpw === "" || inputcheck === "" || inputName === ""
            || inputBirth === "" || inputSex === "") {
            alert("빈 입력 값이 있습니다.");
        } else if (!regEmail.test(inputid)) {
            alert("이메일이 유효하지 않습니다.");
        } else if (inputpw !== inputcheck) {
            alert("비밀번호가 일치하지 않습니다.");
        } else {
            let url = './dbtp/src/server/sign.php';
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: inputid,
                    pw: inputpw,
                    name: inputName,
                    birth: inputBirth,
                    sex: inputSex
                })
            });
            window.location.href = "/";
        }
    }
    return (
        <form className={DivStyle.joinDiv}>
            <Logo Flag={true} />
            <SignInput inputName='아이디/이메일' data={inputid} setter={setInputID} />
            <br></br>
            <SignInput inputName='비밀번호' data={inputpw} setter={setInputPW} />
            <br></br>
            <SignInput inputName='비밀번호 확인' data={inputcheck} setter={setInputCheck} />
            <br></br>
            <SignInput inputName='이름' data={inputName} setter={setInputName} />
            <br></br>
            <SignInput inputName='생년월일' data={inputBirth} setter={setInputBirth} />
            <br></br>
            <SignInput inputName='성별' data={inputSex} setter={setInputSex} />
            <br></br>
            <button onClick={SignIn}> 회원가입 </button>
        </form>
    );
}

export default Join;
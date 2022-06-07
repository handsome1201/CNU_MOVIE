import LoginStyle from "../style/LoginStyle.module.css";
import SmallMyPage from "../components/SmallMyPage"
import { useState, useEffect } from 'react';

function Login() {
    let today = new Date();
    let year = today.getFullYear() // 현재년도
    let month = (today.getMonth()).length !== 1 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1;  // 현재월
    const [isLogIn, setLogIn] = useState(false);
    const [userId, setUserId] = useState("");
    const [userPw, setUserPw] = useState("");
    const [username, setUserName] = useState("");
    const moveToSignUp = () => window.location.href = "./join";
    const typeID = (event) => {
        setUserId(event.target.value);
    }
    const typePW = (event) => {
        setUserPw(event.target.value);
    }
    const logIn = async () => {
        try {
            let url = './dbtp/src/server/login.php';
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: userId,
                    pw: userPw,
                })
            });
            let data = await response.json();
            let [userYear, userMonth] = data[0]["BIRTH_DATE"].split("/");
            userYear = userYear[0] === 0 || userYear[0] === 1 ? "20" + userYear : "19" + userYear
            let tempAge = (parseInt(month) - parseInt(userMonth)) < 0 ? (parseInt(year) - parseInt(userYear) - 1) : (parseInt(year) - parseInt(userYear));
            sessionStorage.setItem('cid', data[0]['CID']);
            sessionStorage.setItem('name', data[0]['C_NAME']);
            sessionStorage.setItem('email', data[0]["EMAIL"]);
            sessionStorage.setItem('age', tempAge);
            if (data[0]['CID'].substr(2, 2) === '77') {
                sessionStorage.setItem('admin', true);
            }
            setLogIn(true);
            setUserName(data[0]['C_NAME']);
        } catch (e) {
            alert("아이디 및 비밀번호를 확인하세요");
        }
    }
    const enterPress = () => {
        if (window.event.keyCode === 13) {
            logIn();
        }
    }
    useEffect(() => {
        if (sessionStorage.getItem('cid')) {
            setLogIn(true);
            setUserName(sessionStorage.getItem('name'));
        }
        else {
            setLogIn(false);
        }
    }, [isLogIn, username])
    return (
        isLogIn ? <SmallMyPage username={username} /> :
            <div className={LoginStyle.container}>
                <div className={LoginStyle.sub}>
                    <span className={LoginStyle.item}>ID</span>
                    <input value={userId} onChange={typeID} type="text" placeholder="input_id"></input>
                </div>
                <div className={LoginStyle.sub}>
                    <span className={LoginStyle.item}>PW</span>
                    <input value={userPw} onKeyUp={enterPress} onChange={typePW} type="password" placeholder="input_pw"></input>
                </div>
                <button onClick={logIn}> Log in </button>
                <button type="button" onClick={moveToSignUp}> Sign Up </button>
            </div>
    );
}

export default Login;
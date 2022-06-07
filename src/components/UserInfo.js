import DivStyle from "../style/DivStyle.module.css";
import { useEffect, useState } from 'react';

function UserInfo() {
    const [userData, setUserData] = useState([]);
    const [flag, setFlag] = useState(false);
    const getUserData = async () => {
        try {
            let url = '/dbtp/src/server/user.php';
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    cid: sessionStorage.getItem('cid')
                })
            });
            let data = await response.json();
            setUserData(data[0]);
            setFlag(true);
        } catch (e) {
            alert(e);
        }
    }
    useEffect(() => {
        getUserData();
    }, [])
    return (
        <div>
            {flag
                ? <div>
                    <p>이름: {userData["C_NAME"]}</p>
                    <p>나이: {sessionStorage.getItem('age')}</p>
                    <p>성별: {userData["SEX"]}</p>
                    <p>이메일: {userData["EMAIL"]}</p>
                </div>
                : <p>Loading...</p>}
        </div>
    );
}

export default UserInfo;
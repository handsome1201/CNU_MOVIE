import LoginStyle from "../style/LoginStyle.module.css";
import { Link } from "react-router-dom";

function SmallMyPage({ username }) {
    const logout = () => {
        sessionStorage.clear();
        window.location.reload();
    }
    return (
        <div className={LoginStyle.container}>
            <p>{username} 님</p>
            <Link to={"/mypage/" + sessionStorage.getItem("cid")}>
                <span>마이페이지로 가기</span>
            </Link>
            {sessionStorage.getItem("admin")
                ? <Link to="/admin">
                    <span>관리자페이지</span>
                </Link>
                : null}
            <button onClick={logout}>로그아웃</button>
        </div>
    );
}

export default SmallMyPage;
import Logo from "../components/Logo";
import MovieSchedule from "../components/MovieSchedule";
import AudiData from "../components/AudiData";
import MemRanking from "../components/MemRanking";
import DivStyle from "../style/DivStyle.module.css";
import { useState } from 'react';

function Admin() {
    const [selected, setSelect] = useState("");
    return (
        <div>
            <Logo Flag={true} />
            <h1>관리지 페이지</h1>
            <MovieSchedule selected={selected} setSelect={setSelect} />
            <AudiData selected={selected} />
            <MemRanking />
        </div>
    );
}

export default Admin;
import { useState, useEffect } from 'react'

function AudiData({ selected }) {
    const [total, setTotal] = useState(0);
    const [subData, setSubData] = useState([]);
    const [subTotal, setSubTotal] = useState(0);
    const getAudi = async () => {
        try {
            let url = './dbtp/src/server/audiance.php';
            let response = await fetch(url);
            let data = await response.json();
            let temp = []
            data.map((obj) => {
                if (obj["TITLE"] === 'AllMovie' && obj["SCHEDULE"] === 'sum') {
                    setTotal(obj["WATCHNUM"]);
                }
                else if (obj["SCHEDULE"] === 'sum') {
                    temp.push(obj)
                }
            })
            setSubData(temp);
        } catch (e) {
            alert(e);
        }
    }
    useEffect(() => {
        getAudi();
    }, [])
    useEffect(() => {
        let flag = false
        let res = 0
        subData.map((obj) => {
            if (selected === obj["TITLE"]) {
                flag = true
                res = obj["WATCHNUM"];
            }
        })
        flag ? setSubTotal(res) : setSubTotal(0);
    }, [selected])
    return (
        <div>
            <p>"{selected}" 누적관객수 : {subTotal}</p>
            <p>CNU영화관 누적관객수 : {total}</p>
        </div>
    );
}


export default AudiData;
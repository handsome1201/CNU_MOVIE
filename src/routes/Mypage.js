import { useParams } from "react-router-dom";
import Logo from "../components/Logo";
import UserInfo from "../components/UserInfo";
import ViewList from "../components/ViewList";

function MyPage() {
    const { id } = useParams();
    return (
        <div>
            <Logo Flag={true} />
            <UserInfo />
            <ViewList />
        </div>
    );
}

export default MyPage;
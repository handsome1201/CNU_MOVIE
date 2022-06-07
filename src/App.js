import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState } from "react";
import Home from "./routes/Home";
import Join from "./routes/Join";
import Search from "./routes/SearchResult";
import Detail from "./routes/Detail";
import MyPage from "./routes/Mypage";
import Admin from "./routes/Admin";

function App() {
  const [searchData, setSearchData] = useState([]);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home setSearchData={setSearchData} />} />
        <Route path="/join" element={<Join />} />
        <Route path="/search" element={<Search searchData={searchData} setSearchData={setSearchData} />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/mypage/:id" element={<MyPage />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;

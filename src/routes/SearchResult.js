import Search from "../components/SearchBar";
import Logo from "../components/Logo";
import SimpleMovie from "../components/SimpleMovie";
import DivStyle from "../style/DivStyle.module.css";

function SearchResult({ searchData, setSearchData }) {
    return (
        <div>
            <Logo Flag={true} />
            <Search setSearchData={setSearchData} />
            {
                searchData.map((obj) => {
                    return (
                        <SimpleMovie
                            key={obj["MID"]}
                            mid={obj["MID"]}
                            title={obj["TITLE"]}
                            openDay={obj["OPEN_DAY"]}
                            director={obj["DIRECTOR"]}
                            rating={obj["RATING"]}
                            movieLen={obj["MOVIE_LENGTH"]}
                        />
                    );
                })
            }
        </div>
    );
}

export default SearchResult;
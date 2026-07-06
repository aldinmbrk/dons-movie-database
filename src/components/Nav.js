import { useContext } from "react";
import { GenresContext } from "./GenreContext";

// Generate tahun
let years = [];
const thisYear = new Date().getFullYear();
for (let i = 0; i < 10; i++) {
  years.push(thisYear - i);
}

const Nav = ({year, onYearChange, genreId, onGenreChange}) => {
    const genres = useContext(GenresContext);
    
    const handleYearChange = (e) => {
        onYearChange(e.target.value);
    }

    const handleGenreChange = (e) => {
        const genreId = e.target.value;

        // Untuk mengambil nama genre dari <select>
        const index = e.target.selectedIndex;
        const genreName = e.target[index].text;

        onGenreChange({
            id: genreId,
            name: genreName
        });
    }


    return (
        <nav>
            <div className="container text-white">
                <div className="row">
                    <div className="col d-flex align-items-center">
                        <hr className="flex-grow-1 me-3" />
                        <small>powered by themoviedb.org</small>
                    </div>
                    <div className="col-3 d-flex">
                        <div className="me-3">
                            <label htmlFor="year" className="form-label">Year</label>
                            <select className="form-select" onChange={handleYearChange}
                                value={year} id="year">
                                {
                                years.map((year) =>
                                    <option key={year.toString()} value={year}>
                                    {year}
                                    </option>)
                                }
                            </select>
                        </div>
                        <div>
                            <label htmlFor="genre" className="form-label">Genre</label>
                            <select className="form-select" onChange={handleGenreChange}
                                value={genreId} id="genre">
                                {
                                genres.map((genre) =>
                                    <option key={genre.id} value={genre.id}>
                                    {genre.name}
                                    </option>)
                                }
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Nav;
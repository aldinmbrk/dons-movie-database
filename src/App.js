import React, { useState, useEffect, createContext } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import Movie from './components/Movie';
import Nav from './components/Nav';
import { GenresContext } from './components/GenreContext';

// Generate genre
const genres = [
  { "id": "", "name": "All" },
  { "id": 28, "name": "Action" },
  { "id": 12, "name": "Adventure" },
  { "id": 16, "name": "Animation" },
  { "id": 35, "name": "Comedy" },
  { "id": 80, "name": "Crime" },
  { "id": 99, "name": "Documentary" },
  { "id": 18, "name": "Drama" },
  { "id": 10751, "name": "Family" },
  { "id": 14, "name": "Fantasy" },
  { "id": 36, "name": "History" },
  { "id": 27, "name": "Horror" },
  { "id": 10402, "name": "Music" },
  { "id": 9648, "name": "Mystery" },
  { "id": 10749, "name": "Romance" },
  { "id": 878, "name": "Science Fiction" },
  { "id": 10770, "name": "TV Movie" },
  { "id": 53, "name": "Thriller" },
  { "id": 10752, "name": "War" },
  { "id": 37, "name": "Western" }
];

const thisYear = new Date().getFullYear();

const App = () => {
  const [movies, setMovies] = useState([]);
  const [year, setYear] = useState(thisYear);
  const [genreId, setGenreId] = useState("");
  const [genreName, setGenreName] = useState("All");
  const [page, setPage] = useState(1);

  const handleYearChange = (value) => {
    // Untuk mengambil tahun dari <select>
    setYear(value);

    // Untuk Reset page
    setPage(1);
  }

  const handleGenreChange = (genre) => {
    setGenreId(genre.id);
    setGenreName(genre.name);

    // Untuk Reset page
    setPage(1);
  }

  const handleLoadMoreClick = () => {
    setPage(prevPage => prevPage + 1);
  }

  useEffect(() => {
    const myFetch = async () => {
      try {
        let url = `https://api.themoviedb.org/3/discover/movie`;
        url += `?api_key=${process.env.REACT_APP_TMDB_API_KEY}`;
        url += `&certification_country=US`;
        url += `&certification.lte=PG-13`;
        url += `&primary_release_year=${year}`;
        url += `&with_genres=${genreId}`;
        url += `&page=${page}`;

        let response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Terjadi gangguan dengan kode: ${response.status}`);
        }
        let data = await response.json();
        // Jika halaman 1, isi ulang state movies
        // Jika halaman 2 atau lebih, tambahkan ke dalam state movie
        if (page === 1) {
          setMovies(data.results);
        } else {
          setMovies((prevMovie) => [...prevMovie, ...data.results]);
        }
      }
      catch (error) {
        console.log(error);
      }
    }
    myFetch();
  }, [year, genreId, page]);

  return (
    <React.Fragment>
      <Header />

      <GenresContext.Provider value={genres}>
        <Nav
          year={year}
          onYearChange={handleYearChange}
          genreId={genreId}
          onGenreChange={handleGenreChange} />

        <Movie
          movies={movies}
          year={year}
          genreName={genreName}
          onLoadMore={handleLoadMoreClick} />
      </GenresContext.Provider>

      <Footer />
    </React.Fragment>
  )
}

export default App;
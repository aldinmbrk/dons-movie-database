import React, { useEffect, useReducer, useState } from 'react';
import Header from './components/Header';
import Movie from './components/Movie';
import Footer from './components/Footer';
import MovieFilter from './components/MovieFilter';

const initialGenres = {
  selectedGenre: 
  {
    value: '',
    label: 'All'
  },
  options: [
    { "id": "", "name": "All" },
    { "id": 28, "name": "Action" },
    { "id": 12, "name": "Abenteuer" },
    { "id": 16, "name": "Animation" },
    { "id": 35, "name": "Komödie" },
    { "id": 80, "name": "Krimi" },
    { "id": 99, "name": "Dokumentarfilm" },
    { "id": 18, "name": "Drama" },
    { "id": 10751, "name": "Familie" },
    { "id": 14, "name": "Fantasy" },
    { "id": 36, "name": "Historie" },
    { "id": 27, "name": "Horror" },
    { "id": 10402, "name": "Musik" },
    { "id": 9648, "name": "Mystery" },
    { "id": 10749, "name": "Liebesfilm" },
    { "id": 878, "name": "Science Fiction" },
    { "id": 10770, "name": "TV-Film" },
    { "id": 53, "name": "Thriller" },
    { "id": 10752, "name": "Kriegsfilm" },
    { "id": 37, "name": "Western" }
  ]
};

let years = [];
const thisYear = new Date().getFullYear();
for(let i = 0; i < 10; i++) {
  years.push(thisYear - i);
}

const genresReducer = (genres, action) => {
  switch(action.type) {
    case 'SELECT_OPTION':
      return {
        ...genres,
        selectedGenre: action.payload
      }
    default:
      throw Error('Unknown action: '+ action.type);
  }
}

const App = () => {
  const [movies, setMovies] = useState([]);
  const [year, setYear] = useState(thisYear);
  const [page, setPage] = useState(1);

  const [genres, dispatch] = useReducer(genresReducer, initialGenres);
  const {selectedGenre} = genres;

  const handleYearChange = (year) => {
    setYear(year);

    setPage(1);
  }

  const handleGenreChange = (selectedOption) => {
    dispatch({
      type: 'SELECT_OPTION',
      payload: selectedOption
    });

    setPage(1);
  }

  const handleLoadMoreClick = () => {
    setPage(prevPage => prevPage + 1);
  }

  useEffect(() => {
    const myFetch = async () => {
      try {
        let url = `https://api.themoviedb.org/3/discover/movie?primary_release_year=${year}&with_genres=${selectedGenre.value}&page=${page}`;
        let response = await fetch(url, {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YjlmMGUxODBiYTE4YjNiMmVmYjViNGNmNzkwNTcyYSIsIm5iZiI6MTY0NzQ4MTIwOS41ODcwMDAxLCJzdWIiOiI2MjMyOTE3OTUzODY2ZTAwN2UyMTBhZTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.zwLEk7WFcy0O-paAv9pSzXJHvxa89wmRLJYmOIRKfN8'
          }
        });
        if(!response.ok) {
          throw new Error(`Terjadi gangguan dengan kode: ${response.status}`);
        }
        let data = await response.json();

        if(page === 1) {
          setMovies(data.results);
        } else {
          setMovies(prevMovie => [...prevMovie, ...data.results]);
        }
      } catch (error) {
        console.log(error);
      }
    }
    myFetch();
  }, [year,selectedGenre,page]);

  return (
    <React.Fragment>
      <Header/>

      <MovieFilter
        years={years}
        yearValue={year}
        onYearChange={handleYearChange}
        genres={genres.options} 
        genereValue={selectedGenre.value} 
        onGenreChange={handleGenreChange}
      />

      <main className='pb-5'>
        <div className='container'>
          <h2 className='py-5 text-white text-center'>{`Best Movie ${year}, Genre: ${selectedGenre.label}`}</h2>
          <div className='row'>
            {movies.map(movie => 
              <Movie key={movie.id} movie={movie} />)
            }
          </div>
          <div className='row'>
            <div className='col text-center'>
              <button className='btn btn-dark' onClick={handleLoadMoreClick}>Load More...</button>
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </React.Fragment>
  );
}

export default App;

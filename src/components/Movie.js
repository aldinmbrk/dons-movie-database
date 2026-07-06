import React, { useContext } from 'react'
import imgPlaceholder from '../img/img-placeholder.png'
import { GenresContext } from './GenreContext'

const Movie = ({movies, year, genreName, onLoadMore}) => {
    const genres = useContext(GenresContext);
    
    const getImage = (path) => {
        if(path) {
            return `http://image.tmdb.org/t/p/w342/${path}`;
        }
        else {
            return imgPlaceholder;
        }
    }

    const getYear = (releaseDate) => {
        return new Date(releaseDate).getFullYear();
    }

    const getTitle = (title) => {
        if(title.length >= 17) {
            return title.substring(0,17) + '...';
        }
        else {
            return title;
        }
    }

    const getOverview = (overview) => {
        if(overview.length >= 200) {
            return overview.substring(0,200) + '...';
        }
        else {
            return overview;
        }
    }

    const getGenre = (genreIds) => {
        let movieGenre = [];
        genres.forEach((genre) => {
            if(genreIds.includes(genre.id)) {
                movieGenre.push(genre.name);
            }
        });

        return (
            <div>
                {movieGenre.map((genre) =>
                    <span key={genre.toString()} className='badge bg-success me-1'>{genre}</span>
                )}
            </div>
        )
    }

  return (
    <main className="pb-5">
        <div className="container">
          <h2 className="py-5 text-white text-center">
            {`Best Movie ${year}, Genre: ${genreName}`}
          </h2>
          <div className="row">
            {movies.map(movie =>
                <div key={movie.id} className='movie-container col-6 col-md-4 col-xl-3 mb-5'>
                    <img src={getImage(movie.poster_path)} alt={movie.title} className='w-100 img-thumbnail'></img>
                    <span className='badge bg-danger vote'>{movie.vote_average}</span>

                    <div className='movie-info'>
                        <h2>{getTitle(movie.title)}</h2>
                        <p>({getYear(movie.release_date)})</p>
                        <p className='overview d-none d-lg-block'>{getOverview(movie.overview)}</p>
                        {getGenre(movie.genre_ids)}
                    </div>
                </div>
            )}
          </div>
            <div className="row">
                <div className="col text-center">
                    <button className="btn btn-dark" onClick={() => onLoadMore()}>
                        Load More...
                    </button>
                </div>
            </div>
        </div>
    </main>
  )
}

export default Movie
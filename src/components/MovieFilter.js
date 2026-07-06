import YearList from "./YearList"
import GenreList from "./GenreList"

const MovieFilter = (props) => {
  return (
    <nav>
        <div className='container text-white'>
          <div className='row'>
            <div className='col d-flex align-items-center'>
              <hr className='flex-grow-1 me-3' />
              <small>powered by themoviedb.org</small>
            </div>
            <div className='col-3 d-flex'>
              <div className='me-3'>
                <YearList
                  years={props.years}
                  yearValue={props.yearValue}
                  onYearChange={props.onYearChange}
                />
              </div>
              <div>
                <GenreList 
                  genres={props.genres} 
                  genereValue={props.genreValue} 
                  onGenreChange={props.onGenreChange} />
              </div>
            </div>
          </div>
        </div>
    </nav>
  )
}

export default MovieFilter
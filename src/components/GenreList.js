import React from 'react'

const GenreList = ({genres,genreValue,onGenreChange}) => {
    const handleGenreChange = (e) => {
        let index = e.target.selectedIndex;
        let selectedGenre = {
            value: e.target.value,
            label: e.target[index].text,
        }
        onGenreChange(selectedGenre);
    }

  return (
    <>
        <label htmlFor='genre' className='form-label'>Genre</label>
        <select className='form-select' onChange={handleGenreChange} id='genre' value={genreValue}>
            {
            genres.map(genre => 
                <option value={genre.id} key={genre.id}>{genre.name}</option>
            )
            }
        </select>
    </>
  )
}

export default GenreList
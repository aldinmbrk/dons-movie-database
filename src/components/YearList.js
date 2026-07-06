const YearList = ({years,yearValue,onYearChange}) => {
  return (
    <>
        <label htmlFor='year' className='form-label'>Year</label>
        <select className='form-select' onChange={(e) => onYearChange(e.target.value)} id='year' value={yearValue}>
            {
            years.map(year => 
                <option value={year} key={year.toString()}>{year}</option>
            )
            }
        </select>
    </>
  )
}

export default YearList
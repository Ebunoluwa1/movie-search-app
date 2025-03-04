import React, {useState} from 'react';

const MainApp = () => {
  const [change, setChange] = useState('');
  const [searchMovie, setSearchMovie] = useState(null);
  const  [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSearch= () => {
    setLoading(true);
    setError('');
    setSearchMovie(null);
    
    fetch(` http://www.omdbapi.com/?t=${change}&apikey=56384115&`)
    .then(resp => resp.json())
    
    .then((data) => {
      console.log(data);

      setLoading(false);
      if (data.Response === 'False') {
      setError('This Movie is not present. Try another title')
   
      setSearchMovie(null)
    } else {
      setSearchMovie(data)
      setError('')
    } 
    })
    .catch((err) => {
      setError('Something went wrong. Kindly try again') 
      setSearchMovie(null)
    })
  } 

  return (
    <div className='min-h-screen w-full flex flex-col items-center p-8 bg-gray-800 text-white'>
        <div className=''>
          <h1 className='text-4xl font-bold mb-4 '> Movie Search-App </h1>
          <div className=''>
            <input  
            type='text'
            value={change}
            placeholder='Enter Movie title'
            className='p-4 rounded-2xl border-2'
            onChange={(e) => setChange(e.target.value)}
            
            />
            <button className='text-gray-800 rounded-2xl p-4 bg-white m-4 w-fit px-8' onClick={handleSearch}> Search</button>
          </div>
          
        </div>
        {error && <div className='text-red-400 pt-4'>{error}</div>}
        {loading && ( <div className="flex items-center justify-center min-h-screen bg-gray-800">
          <div className="w-10 h-10 border-4 border-t-gray-50 border-gray-300 rounded-full animate-spin"></div>
        </div>)}
        {searchMovie && (
          <div className='flex lg:flex-row items-center justify-center mt-10 flex-col'>
            <img src={searchMovie.Poster} alt={searchMovie.Title} className='w-40 h-40 rounded-lg shadow-lg' />
            <div className='ml-4'>
               <h2 className='text-lg font-bold'> {searchMovie.Title},  {searchMovie.Year}</h2>
               
               <p>Released Date: {searchMovie.Released}</p>
                <p>Rating:  {searchMovie.Ratings?.length > 0 ? searchMovie.Ratings[0].Value : "N/A"}</p>
            </div>
          </div>
        )}
    </div>
  );
}

export default MainApp;

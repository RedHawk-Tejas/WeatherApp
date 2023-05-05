import React, {  useState } from 'react'
import {TfiLocationPin} from 'react-icons/tfi'
import {BiSearch} from 'react-icons/bi'
import '../index.css'

function Weather() {

    const [searchValue, setSearchValue] = useState('')
    const [weather, setWeather] = useState(null)
    const [error, setError] = useState(null)

//    useEffect(() => {
//     fetch('https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=833d6da92ebe90058e5dda87375272fa')
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(error => console.log(error))
//    }, []);

   const handleSearch = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&APPID=833d6da92ebe90058e5dda87375272fa&units=metric`)
    .then(response => {
        if(!response.ok){
            throw new Error(response.statusText);
        }
        return response.json()
    })
    .then(data => {
        setWeather(data)
        setError(null)
        setSearchValue('')
        console.log(data)
    })
    .catch(error => {
        setError(error.message)
        setWeather(null)
    })
   }
   
   function getIconUrl(iconCode){
     return `https://openweathermap.org/img/wn/${iconCode}.png`;
   }


  return (
    <div 
        className="flex-col items-center justify-center border border-gray-600 rounded-lg w-4/5 h-4/5 bg-hero bg-no-repeat bg-cover bg-center bg-fixed">

        <div className='flex items-center justify-center w-4/4 h-24'>
            <div className='flex items-center justify-center w-3/4 h-24'>
                <div className='flex items-center justify-between w-96 border border-gray-600 rounded-lg'>
                    <input className='w-11/12 p-1 focus:ring-0 focus:outline-none rounded-l-lg'
                        type="text" placeholder='Search' value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
                    <button onClick={handleSearch}
                        className='h-8 text-xl font-medium mr-0.5 bg-white-200 p-1 rounded-r-lg'><BiSearch/></button>
                </div>
            </div>
        </div>

        <hr />

        <div className='flex items-center justify-center mt-10'>
            {error && 
                    <p className='font-medium'>{error}</p> 
            }
        </div>

        <div className='flex items-center justify-center'>
            {weather && (
                <div className='flex items-center text-2xl font-medium'>
                    <TfiLocationPin/>
                    <p>{weather.name}, {weather.sys.country}</p>
                </div>
            )}
        </div>

        <div className='flex items-center justify-center'>
            {weather && (
                <div className='flex'>
                    <div className='flex items-center'>
                        <p className='text-lg font-medium'>lat:&nbsp;</p>
                        <p className='text-white font-medium'>{weather.coord.lat}</p>
                    </div> &nbsp;
                    <div className='flex items-center'>
                        <p className='text-lg font-medium'>lon:&nbsp;</p>
                        <p className='text-white font-medium'>{weather.coord.lon}</p>
                    </div>
                </div>
            )}
        </div>

        <div className='flex items-center justify-center'>
            {weather && (
                <div className='flex items-center text-lg font-medium my-5'>
                    {weather.weather[0].main}
                    <img src={getIconUrl(weather.weather[0].icon)} alt={weather.weather[0].description} />
                </div>
            )}
        </div>

        <div className='flex items-center justify-center mt-3'>
        {weather && (
            <React.Fragment>
            <div className='flex items-center justify-center w-80'>
                <div className='w-2/4 items-center justify-center'>
                    <div className='my-4'>
                        <p className='text-lg font-medium'>Temperature</p>
                        <p className='text-white font-medium'>{weather.main.temp}&deg;C</p>
                    </div>

                    <div className='my-4'>
                        <p className='text-lg font-medium'>Humidity</p>
                        <p className='text-white font-medium'>{weather.main.humidity}</p>
                    </div>
                </div>

                <div className='mt-1'>
                    <div className='my-4'>
                        <p className='text-lg font-medium mt-2'>Wind Speed</p>
                        <p className='text-white font-medium'>{weather.wind.speed} km/h</p>
                    </div>

                    <div className='my-4'>
                        <p className='text-lg font-medium'>Pressure</p>
                        <p className='text-white font-medium'>{weather.main.pressure}</p>
                    </div>
                </div>
            </div>
            </React.Fragment>
        )}
        </div>
        

    </div>
  )
}

export default Weather
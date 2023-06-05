import React, { useState } from 'react'
import Container from './components/container'
import Search from './components/Search'
import './index.css'
import CurrentWeather from './components/current-weather/current-weather'
import { weatherApiUrl, weatherApiKey } from './api/weather-api'

export default function App() {
  const [currentWeather, setCurrentWeather] = useState(null)

  async function handleOnSearchChange(searchData){
    const [lat, long] = searchData.value.split(' ')
    try{
      const currentWeatherFetch = await fetch(`${weatherApiUrl}lat=${lat}&lon=${long}&appid=${weatherApiKey}&units=metric`)
      const currentWeatherResult = await currentWeatherFetch.json()
      setCurrentWeather({city : searchData.label, ...currentWeatherResult})
      
    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <Container>
      <Search onSearchChange={handleOnSearchChange}/>
      {currentWeather && <CurrentWeather data = {currentWeather}/>}
    </Container>
  )
}


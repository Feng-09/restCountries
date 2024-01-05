import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import moonIcon from '../assets/moon-solid.svg'
import Home from './home'
import Detail from './detail'


function App() {
  const [countries, setCountries] = useState(null)
  const [region, setRegion] = useState(countries)
  const [country, setCountry] = useState(null)

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all').then(
        (response) => response.json()
    ).then((data) => {
        setCountries(data)
        setRegion(data)
    }).catch((err) => {
        console.log(err.message)
    })
  }, [])

  return (
    <main className="bg-[#202c37] h-fit min-h-screen pb-8 w-screen pt-[6.5rem] px-4">
      <div className="fixed top-0 w-full left-0 bg-[#2b3945] flex justify-between items-center p-4 h-20 z-20">
        <p className="font-nunito font-extrabold tracking-tighter text-base text-white">Where in the world?</p>
        <div className="flex">
          <img src={moonIcon} className="w-4 h-4 mr-2" />
          <p className="font-nunito text-sm">Dark Mode</p>
        </div>        
      </div>
      <Routes>
        <Route path='/' element={<Home countries={countries} region={region} setRegion={setRegion} setCountry={setCountry} />} />
        <Route path='/detail' element={<Detail country={country} countries={countries} setCountry={setCountry} />} />
      </Routes>

    </main>
  )
}

export default App

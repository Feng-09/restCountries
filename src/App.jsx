import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import moonIcon from '../assets/moon-solid.svg'
import sunIcon from '../assets/sunIcon2.png'
import Home from './home'
import Detail from './detail'
import Map from './map'

function App() {
  const [countries, setCountries] = useState(null)
  const [region, setRegion] = useState(countries)
  const [country, setCountry] = useState(null)
  const [theme, setTheme] = useState(localStorage.theme)
  const [loaded, setLoaded] = useState(false) 

  const [indx, setIndx] = useState(Number(localStorage.getItem("index")) || 0)
  
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all').then(
        (response) => response.json()
    ).then((data) => {
        setCountries(data)
        setRegion(data)
    }).catch((err) => {
        console.log(err.message)
    }).finally(() => {
      setLoaded(true)
    })
  }, [])

  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }

  const handleTheme = () => {
    if(theme == 'dark') {
      localStorage.theme = 'light'
      setTheme('light')
    } else {
      localStorage.theme = 'dark'
      setTheme('dark')
    }
  }

  return (
    <main className="bg-[#fafafa] dark:bg-[#202c37] h-fit min-h-screen pb-8 w-screen pt-[6.5rem] md:pt-32 px-4 md:px-8 lg:px-12 xl:px-20">
      <div className="fixed top-0 w-full left-0 bg-white dark:bg-[#2b3945] shadow-[0_0_10px_2px_#b7bec4] dark:shadow-[0_0_10px_2px_#172129] flex justify-between items-center p-4 h-20 z-20 md:px-8 lg:px-12 xl:px-20">
        <p className="font-nunito font-extrabold tracking-tighter text-base text-[#111517] dark:text-white md:text-xl lg:text-2xl xl:text-[1.675rem]">Where in the world?</p>
        <div className="flex hover:cursor-pointer group" onClick={handleTheme}>
          <img src={theme == 'dark' ? moonIcon : sunIcon} className="w-4 h-4 mr-2 md:w-6 md:h-6 lg:w-8 lg:h-8 group-hover:scale-[1.2] duration-200" />
          <p className="font-nunito text-sm md:text-base lg:text-xl text-[#111517] dark:text-white">{theme == 'dark' ? "Dark Mode" : "Light Mode"}</p>
        </div>        
      </div>
      <Routes>
        <Route path='/' element={<Home countries={countries} region={region} setRegion={setRegion} setCountry={setCountry} theme={theme} loaded={loaded} setIndx={setIndx} />} />
        <Route path='/details/:code' element={<Detail country={country} countries={countries} setCountries={setCountries} setCountry={setCountry} theme={theme} indx={indx} />} />
        <Route path='/map/:code' key={1} element={<Map country={country} theme={theme} key={1} />} />        
      </Routes>
      

    </main>
  )
}

export default App

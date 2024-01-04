import { useState, useEffect } from 'react'
import './App.css'
import Card from './card'
import moonIcon from '../assets/moon-solid.svg'
import searchIcon from '../assets/magnifying-glass-solid.svg'
import arrow from '../assets/angle-down-solid.svg'

function App() {
  const [countries, setCountries] = useState(null)
  const [list, setlist] = useState(25)
  const [more, setMore] = useState(false)
  const [filter, setFilter] = useState(false)
  const [region, setRegion] = useState(countries)
  const [input, setInput] = useState("")
  const [filtered, setFiltered] = useState([])

  const handleMore = () => {
    setlist(a => a + 25)
    setMore(true)
  }

  const handleLess = () => {
    setlist(a => a - 25)
    if (list > 50) {
    } else {
      setMore(false)
    }
  }

  const handleSearch = (value) => {
    setInput(value)
      const filt = countries.filter((item) => {
      return item.name.toLowerCase().includes(value.toLowerCase())
      })
      setFiltered(filt)
    }

  let africa
  let america
  let asia
  let europe
  let oceania

  if (countries == null) {
  } else {
    africa = countries.filter(country => country.region === "Africa")
    america = countries.filter(country => country.region === "Americas")
    asia = countries.filter(country => country.region === "Asia")
    europe = countries.filter(country => country.region === "Europe")
    oceania = countries.filter(country => country.region === "Oceania")
  }

  const filterAfrica = () => {
    setRegion(africa)
  }
  const filterAmerica = () => {
    setRegion(america)
  }
  const filterAsia = () => {
    setRegion(asia)
  }
  const filterEurope = () => {
    setRegion(europe)
  }
  const filterOceania = () => {
    setRegion(oceania)
  }
  

  const toggleFilter = (e) => {
    setFilter(!filter)
    e.currentTarget.lastElementChild.classList.toggle("active")
    e.currentTarget.nextElementSibling.classList.toggle("filterOn")
  }


    useEffect(() => {
        fetch('../data.json').then(
            (response) => response.json()
        ).then((data) => {
            setCountries(data)
            setRegion(data)
        }).catch((err) => {
            console.log(err.message)
        })
    }, [])

    

  return (
    <main className="bg-[#202c37] h-fit pb-8 w-screen pt-[6.5rem] px-4">
      <div className="fixed top-0 w-full left-0 bg-[#2b3945] flex justify-between items-center p-4 h-20 z-20">
        <p className="font-nunito font-extrabold tracking-tighter text-base text-white">Where in the world?</p>
        <div className="flex">
          <img src={moonIcon} className="w-4 h-4 mr-2" />
          <p className="font-nunito text-sm">Dark Mode</p>
        </div>        
      </div>

      <div className='mb-6'>
        <input placeholder="Search for a country..." type='text' onChange={(e) => handleSearch(e.target.value)} value={input} className="pl-16 py-4 w-full rounded-md bg-[#2b3945] font-nunito" />
        <img src={searchIcon} className="w-4 h-4 relative bottom-9 left-6" />
      </div>
      <div className='bg-[#2b3945] w-[14rem] h-14 rounded-md flex justify-between p-4 mb-2' onClick={toggleFilter}>
        <p className='font-nunito'>Filter by Region</p>
        <img src={arrow} className='w-4 h-4 relative top-1 duration-300'/>
      </div>
      <div className='filter'>
        <p className='font-nunito' onClick={() => {setRegion(countries)}}>All</p>
        <p className='font-nunito block' onClick={filterAfrica}>Africa</p>
        <p className='font-nunito block' onClick={filterAmerica}>America</p>
        <p className='font-nunito block' onClick={filterAsia}>Asia</p>
        <p className='font-nunito block' onClick={filterEurope}>Europe</p>
        <p className='font-nunito block' onClick={filterOceania}>Oceania</p>
       </div>
      <div className="flex flex-col space-y-12 mt-16">
        {input != '' ? filtered.map((country, id) => {
          return (
            <Card country={country} key={id} />
          )
        }) : countries != null ? region.filter((item, idx) => {
          return idx < list
        }).map((country, id) => {
          return (
            <Card country={country} key={id} />
          )
        }) : null}
      </div>
      <div className='m-auto w-36 h-14 rounded-md text-center bg-[#2b3945] py-4 mt-8' onClick={handleMore}>
        <p className='font-nunito'>View More</p>
      </div>
      {more ? (<div className='m-auto w-36 h-14 rounded-md text-center bg-[#2b3945] py-4 mt-4' onClick={handleLess}>
        <p className='font-nunito'>View Less</p>
      </div>) : null}
      
    </main>
  )
}

export default App

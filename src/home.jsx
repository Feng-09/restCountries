import { useState } from 'react'
import Card from './card'
import searchIcon from '../assets/magnifying-glass-solid.svg'
import arrow from '../assets/angle-down-solid.svg'

function Home({ countries, region, setRegion, setCountry }) {
  const [list, setlist] = useState(25)
  const [more, setMore] = useState(false)
  const [filter, setFilter] = useState(false)
  const [input, setInput] = useState("")
  const [filtered, setFiltered] = useState([])
  const [items, setItems] = useState(0)
  const [filtErr, setFiltErr] = useState('')

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
    setFiltErr('in Africa')
  }
  const filterAmerica = () => {
    setRegion(america)
    setFiltErr('in America')
  }
  const filterAsia = () => {
    setRegion(asia)
    setFiltErr('in Asia')
  }
  const filterEurope = () => {
    setRegion(europe)
    setFiltErr('in Europe')
  }
  const filterOceania = () => {
    setRegion(oceania)
    setFiltErr('in Oceania')
  }
  
  const handleSearch = (value) => {
    setInput(value)
      const filt = region.filter((item) => {
      return item.name.common.toLowerCase().includes(value.toLowerCase())
      })
      setFiltered(filt)
      setItems(filt.length)
    }

  const toggleFilter = (e) => {
    setFilter(!filter)
    e.currentTarget.lastElementChild.classList.toggle("active")
    e.currentTarget.nextElementSibling.classList.toggle("filterOn")
  }

  return (
    <>
    <div className='mb-6'>
        <input placeholder="Search for a country..." type='text' onChange={(e) => handleSearch(e.target.value)} value={input} className="pl-16 py-4 w-full rounded-md bg-[#2b3945] font-nunito" />
        <img src={searchIcon} className="w-4 h-4 relative bottom-9 left-6" />
      </div>
      <div className='bg-[#2b3945] w-[14rem] h-14 rounded-md flex justify-between p-4 mb-2' onClick={toggleFilter}>
        <p className='font-nunito'>Filter by Region</p>
        <img src={arrow} className='w-4 h-4 relative top-1 duration-300'/>
      </div>
      <div className='filter'>
        <p className='font-nunito' onClick={() => {setRegion(countries); setFiltErr('')}}>All</p>
        <p className='font-nunito' onClick={filterAfrica}>Africa</p>
        <p className='font-nunito' onClick={filterAmerica}>America</p>
        <p className='font-nunito' onClick={filterAsia}>Asia</p>
        <p className='font-nunito' onClick={filterEurope}>Europe</p>
        <p className='font-nunito' onClick={filterOceania}>Oceania</p>
       </div>
      <div className="flex flex-col space-y-12 mt-16">
        {input != '' ? items > 0 ?
        filtered.map((country, id) => {
          return (
            <Card country={country} setCountry={setCountry} key={id} />           
          )
        }) : <p className='font-nunito text-xl m-auto'>No matching countries {filtErr}</p>
         : countries != null ? region.filter((item, idx) => {
          return idx < list
        }).map((country, id) => {
          return (
            <Card country={country} setCountry={setCountry} key={id} />
          )
        }) : null}
      </div>
      <div className='m-auto w-36 h-14 rounded-md text-center bg-[#2b3945] py-4 mt-8' onClick={handleMore}>
        <p className='font-nunito'>View More</p>
      </div>
      {more ? (<div className='m-auto w-36 h-14 rounded-md text-center bg-[#2b3945] py-4 mt-4' onClick={handleLess}>
        <p className='font-nunito'>View Less</p>
      </div>) : null}
    </>
  )

}

export default Home
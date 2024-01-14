import { useState } from 'react'
import Card from './card'
import searchIcon from '../assets/magnifying-glass-solid.svg'
import searchIconL from '../assets/magnifying-glass-solid (1).svg'
import arrow from '../assets/angle-down-solid.svg'
import arrowL from '../assets/angle-down-solid (1).svg'
import { Link } from 'react-router-dom'

function Home({ countries, region, setRegion, setCountry, theme, loaded, setIndx }) {
  const [list, setlist] = useState(24)
  const [more, setMore] = useState(false)
  const [filter, setFilter] = useState(false)
  const [input, setInput] = useState("")
  const [filtered, setFiltered] = useState([])
  const [items, setItems] = useState(0)
  const [filtErr, setFiltErr] = useState('')

  const handleMore = () => {
    setlist(a => a + 24)
    setMore(true)
  }

  const handleLess = () => {
    setlist(a => a - 24)
    if (list > 48) {
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
      <div className='mb-6 group'>
        <input placeholder="Search for a country..." type='text' onChange={(e) => handleSearch(e.target.value)} value={input} className="pl-16 py-4 w-full rounded-md bg-white dark:bg-[#2b3945] shadow-[0_0_10px_2px_#b7bec4] dark:shadow-[0_0_10px_2px_#172129] text-[#858585] dark:text-white font-nunito md:w-80 lg:w-[30rem] lg:text-xl" />
        <img src={theme == 'dark' ? searchIcon : searchIconL} className="w-4 h-4 relative bottom-9 left-6 lg:w-6 lg:h-6 lg:bottom-11 group-hover:scale-[1.2] duration-200" />
      </div>
      <div className='md:float-right md:relative bottom-[6.1rem]'>
      <div className='bg-white dark:bg-[#2b3945] w-[14rem] shadow-[0_0_10px_2px_#b7bec4] dark:shadow-[0_0_10px_2px_#172129] h-14 rounded-md flex justify-between p-4 mb-2 hover:cursor-pointer group' onClick={toggleFilter}>
        <p className='font-nunito lg:text-xl text-[#111517] dark:text-white group-hover:scale-[1.05] duration-200'>Filter by Region</p>
        <img src={theme == 'dark' ? arrow : arrowL} className='w-4 h-4 relative top-1 duration-300 lg:w-6 lg:h-6 lg:top-0'/>
      </div>
      <div className='filter bg-white dark:bg-[#2b3945] shadow-[0_0_10px_2px_#b7bec4] dark:shadow-[0_0_10px_2px_#172129]'>
        <p className='font-nunito text-[#111517] dark:text-white' onClick={() => {setRegion(countries); setFiltErr('')}}>All</p>
        <p className='font-nunito text-[#111517] dark:text-white' onClick={filterAfrica}>Africa</p>
        <p className='font-nunito text-[#111517] dark:text-white' onClick={filterAmerica}>America</p>
        <p className='font-nunito text-[#111517] dark:text-white' onClick={filterAsia}>Asia</p>
        <p className='font-nunito text-[#111517] dark:text-white' onClick={filterEurope}>Europe</p>
        <p className='font-nunito text-[#111517] dark:text-white' onClick={filterOceania}>Oceania</p>
       </div>
       </div>
      <div className="flex flex-col items-center space-y-12 mt-16 md:w-full md:grid md:grid-flow-row md:grid-cols-2 lg:grid-cols-3 min-[1440px]:grid-cols-4">
        <div className={loaded ? 'hidden' : 'block scale-150'}>
          <div className="idk"></div>
          <div className="idk2"></div>
        </div>
        {input != '' ? items > 0 ?
        filtered.map((country, id) => {
          return (
           <Link to={`/details/${country.cca3}`} key={id}  className='w-fit m-auto'> <Card country={country} setCountry={setCountry} key={id} index={id} setIndx={setIndx} />  </Link>         
          )
        }) : <p className='font-nunito text-[#111517] dark:text-white text-xl m-auto'>No matching countries {filtErr}</p>
         : countries != null ? region.filter((item, idx) => {
          return idx < list
        }).map((country, id) => {
          return (
            
         <Link to={`/details/${country.cca3}`} key={id} className='w-fit m-auto'>   <Card country={country} setCountry={setCountry} key={id} index={id} /></Link>
          )
        }) : null}
      </div>
      {loaded ? null : (
      <div className='m-auto w-36 h-14 rounded-md text-center bg-white dark:bg-[#2b3945] py-4 mt-8 hover:cursor-pointer shadow-[0_0_10px_2px_#b7bec4] dark:shadow-[0_0_10px_2px_#172129] group' onClick={handleMore}>
        <p className='font-nunito text-[#111517] dark:text-white group-hover:scale-[1.1] duration-200'>View More</p>
      </div>)}
      {more ? (<div className='m-auto w-36 h-14 rounded-md text-center bg-white dark:bg-[#2b3945] py-4 mt-4 hover:cursor-pointer shadow-[0_0_10px_2px_#b7bec4] dark:shadow-[0_0_10px_2px_#172129] group' onClick={handleLess}>
        <p className='font-nunito text-[#111517] dark:text-white group-hover:scale-[1.1] duration-200'>View Less</p>
      </div>) : null}
    </>
  )

}

export default Home
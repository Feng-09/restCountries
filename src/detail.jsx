import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import arrow from '../assets/arrow-left-solid.svg'
import arrowL from '../assets/arrow-left-solid (1).svg'

function Detail({ theme }) {
    const [loaded, setLoaded] = useState(false)
    const [country, setCountry] = useState(null)
    const [countries, setCountries] = useState(null)
    const {code} = useParams()
  
        useEffect(() => {
            fetch(`https://restcountries.com/v3.1/alpha/${code}`).then(
                (response) => response.json()
            ).then((data) => {
                setCountry(data[0])
                setLoaded(true)
            }).catch((err) => {
                console.log(err.message)
            })
          }, [])

          useEffect(() => {
            fetch(`https://restcountries.com/v3.1/all`).then(
                (response) => response.json()
            ).then((data) => {
                setCountries(data)
            }).catch((err) => {
                console.log(err.message)
            })
          }, [])
  

          if (loaded == false) {
            return (<div className='block scale-150'>
            <div className="idk"></div>
            <div className="idk2"></div>
          </div>)
          } else {
    return (
    <>
    {
    country && countries && ( <div className="px-6 pt-8 pb-24 bg-[#fafafa] dark:bg-[#202c37] min-h-screen h-fit w-full lg:px-12 xl:px-0">
    <Link to='/'>
    <div className="bg-white dark:bg-[#2b3945] w-28 h-10 items-center rounded-md shadow-[0_0_10px_2px_#b7bec4] dark:shadow-[0_0_10px_2px_#172129] flex justify-around mb-16 hover:scale-[1.1] duration-200">
        <img src={theme == 'dark' ? arrow : arrowL} className='w-6 h-6' />
        <p className='font-nunito text-[#111517] dark:text-white text-xl'>Back</p>
    </div>
    </Link>
    <div className='xl:flex xl:justify-between relative'>
    <div>
    <img src={country.flags.png} className='w-full max:md:max-w-[22rem] h-[12rem] mb-14 pr-4 md:w-[30rem] md:h-[20rem] xl:w-[36rem] xl:h-[24rem] xl:mr-8' onLoad={() => {setLoaded(true)}} />
    <Link to={`/map/${country.cca3}`} className='w-fit'>
    <div className='m-auto mb-8 w-40 h-14 rounded-md text-center bg-white dark:bg-[#2b3945] py-4 mt-8 hover:cursor-pointer shadow-[0_0_10px_2px_#b7bec4] dark:shadow-[0_0_10px_2px_#172129] group'>
     <p className='font-nunito text-[#111517] dark:text-white group-hover:scale-[1.1] duration-200'>View on Map</p>
    </div>
    </Link>
    </div>
    <div className={loaded ? 'hidden' : "absolute top-14 left-28 md:top-28 md:left-48 xl:left-60 xl:top-36"}>
        <div className="idk"></div>
        <div className="idk2"></div>
    </div>
    <div>
    <h1 className='font-nunito text-[#111517] dark:text-white text-2xl font-extrabold mb-8 md:text-4xl'>{country.name.common}</h1>
    <div className='md:flex md:space-x-24'>
    <div>
      <p className='font-nunito text-[#111517] dark:text-white mb-4 md:text-xl'>Native Name: <span className='opacity-80'>{country.name.nativeName[Object.keys(country.name.nativeName)[0]].common}</span></p>
      <p className='font-nunito text-[#111517] dark:text-white mb-4 md:text-xl'>Population: <span className='opacity-80'>{new Intl.NumberFormat().format(country.population)}</span></p>
      <p className='font-nunito text-[#111517] dark:text-white mb-4 md:text-xl'>Region: <span className='opacity-80'>{country.region}</span></p>
      <p className='font-nunito text-[#111517] dark:text-white mb-4 md:text-xl'>Sub Region: <span className='opacity-80'>{country.subregion}</span></p>
      <p className='font-nunito text-[#111517] dark:text-white mb-12 md:text-xl'>Capital: <span className='opacity-80'>{country.capital}</span></p>
    </div>
    <div>
      <p className='font-nunito text-[#111517] dark:text-white mb-4 md:text-xl'>Top Level Domain: <span className='opacity-80'>{country.tld[0]}</span></p>
      <p className='font-nunito text-[#111517] dark:text-white mb-4 md:text-xl'>Currencies: <span className='opacity-80'>{country.currencies[Object.keys(country.currencies)[0]].name}</span></p>
      <p className='font-nunito text-[#111517] dark:text-white mb-12 md:text-xl'>Languages: <span className='opacity-80'>{Object.values(country.languages).join(', ')}</span></p>
    </div>
    </div>

    <h2 className='font-nunito text-[#111517] dark:text-white text-xl font-bold md:text-2xl'>Border Countries:</h2>
    <div className='w-full pt-4 grid grid-flow-row grid-cols-3 gap-y-4 md:gap-x-6 md:w-fit'>
        {country.borders != null ?
        country.borders.map((border, id) => {
            let borCountry = countries.filter((item) => {
                return item.cca3 == border
            })
            return (
               <Link to={`/details/${country.cca3}`} key={id}>
                 <div className='bg-white dark:bg-[#2b3945] shadow-[0_0_10px_2px_#b7bec4] dark:shadow-[0_0_10px_2px_#172129] w-24 h-8 overflow-auto text-center scroll font-nunito text-[#111517] dark:text-white text-base flex items-start pt-1 justify-center rounded md:text-xl md:h-10 md:w-36 hover:scale-[1.1] duration-200' key={id} onClick={() => {setCountry(borCountry[0])}}>{borCountry[0].name.common}</div>
               </Link>
            )
        }) : (<p className='font-nunito text-[#111517] dark:text-white text-lg'>None</p>)}
    </div>
    </div>
    </div>

    </div>
    )}
    </>
    )}
}

export default Detail
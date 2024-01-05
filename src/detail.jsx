import { Link } from 'react-router-dom'
import arrow from '../assets/arrow-left-solid.svg'

function Detail({ country, setCountry, countries }) {
    return (
        <div className="px-6 pt-8 pb-24 bg-[#202c37] min-h-screen h-fit w-screen">
            <Link to='/'>
            <div className="bg-[#2b3945] w-28 h-10 items-center rounded-md shadow shadow-[#0d1318] flex justify-around mb-16">
                <img src={arrow} className='w-6 h-6' />
                <p className='font-nunito text-xl text-white'>Back</p>
            </div>
            </Link>
            <img src={country.flags.png} className='w-full h-[12rem] mb-14 pr-3' />
            <h1 className='font-nunito text-2xl font-extrabold mb-8'>{country.name.common}</h1>
            <p className='font-nunito mb-4'>Native Name: <span className='opacity-80'>{country.name.nativeName[Object.keys(country.name.nativeName)[0]].common}</span></p>
            <p className='font-nunito mb-4'>Population: <span className='opacity-80'>{new Intl.NumberFormat().format(country.population)}</span></p>
            <p className='font-nunito mb-4'>Region: <span className='opacity-80'>{country.region}</span></p>
            <p className='font-nunito mb-4'>Sub Region: <span className='opacity-80'>{country.subregion}</span></p>
            <p className='font-nunito mb-12'>Capital: <span className='opacity-80'>{country.capital}</span></p>
            <p className='font-nunito mb-4'>Top Level Domain: <span className='opacity-80'>{country.tld[0]}</span></p>
            <p className='font-nunito mb-4'>Currencies: <span className='opacity-80'>{country.currencies[Object.keys(country.currencies)[0]].name}</span></p>
            <p className='font-nunito mb-12'>Languages: <span className='opacity-80'>{Object.values(country.languages).join(', ')}</span></p>

            <h2 className='font-nunito text-xl font-bold'>Border Countries:</h2>
            <div className='w-full pt-4 grid grid-flow-row grid-cols-3 gap-y-4'>
                {country.borders != null ?
                country.borders.map((border, id) => {
                    let borCountry = countries.filter((item) => {
                        return item.cca3 == border
                    })
                    return (
                       <Link to='/detail' key={id}>
                         <div className='bg-[#2b3945] w-24 h-8 mt-auto font-nunito text-base text-white flex items-center justify-center rounded' key={id} onClick={() => {setCountry(borCountry[0])}}>{borCountry[0].name.common}</div>
                       </Link>
                    )
                }) : (<p className='font-nunito text-lg'>None</p>)}
            </div>


        </div>
    )
}

export default Detail
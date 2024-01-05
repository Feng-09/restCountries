import { Link } from "react-router-dom"

function Card({ country, setCountry }) {
    return (
        <Link to='/detail'>
        <div className="bg-[#2b3945] min-w-[16rem] w-[18rem] h-[24rem] m-auto rounded-lg text-white" onClick={() => {setCountry(country)}}>
            <img src={country.flags.png} className="rounded-t-lg h-1/2 w-[100%]" />
            <div className="p-4 pt-5 flex flex-col space-y-1">
                <p className="font-nunito text-xl font-extrabold mb-2 mt-1">{country.name.common}</p>
                <p className="font-nunito text-base">Population: <span className="opacity-80">{new Intl.NumberFormat().format(country.population)}</span></p>
                <p className="font-nunito text-base">Region: <span className="opacity-80">{country.region}</span></p>
                <p className="font-nunito text-base">Capital: <span className="opacity-80">{country.capital}</span></p>
            </div>
        </div>
        </Link>
    ) 
}

export default Card
function Card({ country }) {
    return (
        <div className="bg-[#2b3945] w-[16rem] h-80 m-auto rounded-lg" onClick={() => {console.log(country)}}>
            <img src={country.flags.png} className="rounded-t-lg h-1/2 w-[100%]" />
            <div className="p-4 pt-5 flex flex-col space-y-1">
                <p className="font-nunito text-base font-extrabold mb-2 mt-1">{country.name.common}</p>
                <p className="font-nunito text-sm">Population: <span className="opacity-80">{new Intl.NumberFormat().format(country.population)}</span></p>
                <p className="font-nunito text-sm">Region: <span className="opacity-80">{country.region}</span></p>
                <p className="font-nunito text-sm">Capital: <span className="opacity-80">{country.capital}</span></p>
            </div>
        </div>
    ) 
}

export default Card
import { useState, useEffect } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import arrow from '../assets/arrow-left-solid.svg'
import arrowL from '../assets/arrow-left-solid (1).svg'
import { Link, useParams } from 'react-router-dom'

function Map({ theme }) {
  const [ country, setCountry] = useState(null)
  const {code} = useParams()

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/alpha/${code}`).then(
        (response) => response.json()
    ).then((data) => {
        setCountry(data[0])
        // setLoaded(true)       
    }).catch((err) => {
        console.log(err.message)
    })
  }, [])

  let center
    if(country) {
      center = {
        lat: country.latlng[0],
        lng: country.latlng[1]
    }
    }

    const container = {
        width: '36rem',
        height: '36rem'
    }

    return(
      <> {country && 
        (<div className='px-6 pt-8 pb-24 bg-[#fafafa] dark:bg-[#202c37] min-h-screen h-fit w-fit lg:px-12 xl:px-0 m-auto'>
          <Link to='/detail'>
            <div className="bg-white dark:bg-[#2b3945] w-28 h-10 items-center rounded-md shadow-[0_0_10px_2px_#b7bec4] dark:shadow-[0_0_10px_2px_#172129] flex justify-around mb-16 hover:scale-[1.1] duration-200">
                <img src={theme == 'dark' ? arrow : arrowL} className='w-6 h-6' />
                <p className='font-nunito text-[#111517] dark:text-white text-xl'>Back</p>
            </div>
            </Link>
          <LoadScript googleMapsApiKey='AIzaSyDCutXsjYa_D29LULZHoK67x9m4VqkUdto'>
            <GoogleMap mapContainerStyle={container} center={center} zoom={6}>
             <Marker position={center} />
            </GoogleMap>
          </LoadScript>
        </div>
        )}
      </>
    )
}

export default Map
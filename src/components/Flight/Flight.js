  import React,{useEffect, useState, useRef} from 'react'
  import  "./flight.css"
  import TextField from '@mui/material/TextField';
  import Autocomplete from '@mui/material/Autocomplete';
import { Typography } from '@mui/material';

  export default function Flight() {
    const [fromDestination,setFromDestination] = useState('');
    const [toDestination,setTodestination] = useState("");
    const [departureDate,setDepartureDate] = useState("");
    const [travellerClass,setTravelarClass] = useState('');
      const [city,setCity] = useState('')
      const [airportName,setAirportsName] = useState([])
      const [offers,setOffers] = useState([]);
      const [selectCategory,setSelectCategory] = useState("ALL")
      const APP_API = "https://academics.newtonschool.co/api/v1/bookingportals";
      
    



      async function HandleOfferSection(){
        try{
            const response = await fetch(`${APP_API}/offers?filter={"type":"${selectCategory}"}`,{
              method:'GET',
              headers:{"projectID":"f104bi07c490"}
            })
            if(!response.ok){
              throw new Error("Somthing went wrong")
            }
            const data = await response.json()
            setOffers(data?.data?.offers)
            
        }catch(err){
            console.log(err)
        }
      }

      async function searchAirportName(){
        try{
          const response = await fetch(`${APP_API}/airport?limit=50`,{
          method:'GET',
          headers:{"projectID":"f104bi07c490"}
        })
        const airportData = await response.json()
        setAirportsName(airportData.data.airports)
        console.log(airportData.data.airports)
        }catch(err){
          console.log("something went wrong")
        }
      }
      
        searchAirportName()

      useEffect(()=>{
        HandleOfferSection()
      },[selectCategory])
      

      function handleSelectCategory(category){
          setSelectCategory(category)
      }
      



      return (
        <>
          
          <div className='flightContainer'>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={airportName}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="From" />}
            />
  
              
          
  
          <input className='departureDate'
            placeholder='Departure'
          />
          <input 
          className='class'
          />

          <button className='searchBtn'>SEARCH</button>

        </div>
         
        <div className='offerContainer'>
          <h1>Offers</h1>
          <div className='categoryTabs'>
            <button className={selectCategory === "ALL"?"active":''}
              onClick={()=> handleSelectCategory("ALL")}
            >
                All Offers
            </button>
            <button className={selectCategory === "FLIGHT"?"active":''}
             onClick={()=>handleSelectCategory("FLIGHT")}
            >
              Flights
            </button>
            <button className={selectCategory === "HOTELS"?"active":''}
              onClick={()=>handleSelectCategory("HOTELS")}
            >
              Hotels
            </button>
          <button className={selectCategory === "HOLIDAYS"?"active":''}
           onClick={()=>handleSelectCategory("HOLIDAYS")}
          >
            Holidays
          </button>
          <button className={selectCategory === "TRAINS"?"active":''}
           onClick={()=>handleSelectCategory("TRAINS")}
          >
            Trains
          </button>
          </div>
             <div className='offerCards'>
            {
              offers.map((offer)=>{
                return(
                  <div className='offerCard' key={offer.id}>
                    <div className='offerImg' alt={offer.title}>
                    <img src={offer.newHeroUrl}/>
                    </div>
                    <h4>{offer.pTl}</h4>
                    <p>{offer.pTx}</p>
                  </div>
                )
              })
            }
            </div>
        </div>
      </>
      
    )
  }

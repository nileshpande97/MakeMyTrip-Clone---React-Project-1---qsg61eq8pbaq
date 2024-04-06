  import React,{useEffect, useState, useRef} from 'react'
  import  "./flight.css"
  import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
  import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

  export default function Flight() {
    const [fromDestination,setFromDestination] = useState('');
    const [toDestination,setTodestination] = useState("");
    const [departureDate,setDepartureDate] = useState("");
    const [offers,setOffers] = useState([]);
    const [selectCategory,setSelectCategory] = useState("ALL")
    const OFFER_API = ` https://academics.newtonschool.co/api/v1/bookingportals/offers?filter={"type":"${selectCategory}"}`;
  



    async function HandleOfferSection(){
      try{
          const response = await fetch(OFFER_API,{
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
    useEffect(()=>{
        
      HandleOfferSection()
    },[selectCategory])
    



    function handleSelectCategory(category){
        setSelectCategory(category)
    }
    const scrollLeft = () => {
      if (offerSliderRef.current) {
        offerSliderRef.current.scrollBy({
          left: -300, 
          behavior: 'smooth'
        });
      }
    };
  
    const scrollRight = () => {
      if (offerSliderRef.current) {
        offerSliderRef.current.scrollBy({
          left: 300, 
          behavior: 'smooth'
        });
      }
    };

    



    return (
      <>
        
        <div className='flightContainer'>
          <input className='fromDestination' value={fromDestination} 
          onChange={(e)=>setFromDestination(e.target.value)}
          />
          <input className='toDestination'/>
          <input className='departureDate'/>

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

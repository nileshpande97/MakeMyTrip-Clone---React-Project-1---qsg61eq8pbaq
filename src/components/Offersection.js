import React,{useState,useEffect} from 'react'

export default function Offersection() {

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

    useEffect(()=>{
        HandleOfferSection()
      },[selectCategory])
      

    function handleSelectCategory(category){
        setSelectCategory(category)
    }
  return (
    <>
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

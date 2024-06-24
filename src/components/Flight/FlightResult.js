import React, {useEffect,useState}from "react"
import "./flightresult.css"
import Navbar from "./Flight Search/Navbar";
import Inpute from "./Flight Search/Inpute";
import { useLocation } from "react-router-dom";
import MyContextStore from "./MycontexStore";
import { nl } from "date-fns/locale";
import { WidthFull } from "@mui/icons-material";








function FlightResult() {
    const location = useLocation()
    const {fromDestination, toDestination, departureDate, selecteAdults, selectChild,airportName,travellerClass} = location.state || {}
    const airport = airportName
    const [from,setFrom] = useState(fromDestination)
    const [to,setTo] = useState(toDestination)
    const [date,setDate] = useState(departureDate)
    const [adult,setAdult] = useState(selecteAdults)
    const [children,setChildren] = useState(selectChild)
    const [Class,setClass] = useState(travellerClass)
    const [flight,setFlight] = useState([])
    const days = getDayformat(date.toString())
    const API_ENDPOINT ="https://academics.newtonschool.co/api/v1/bookingportals"
    const PROJECT_ID = "f104bi07c490";
     

    function handleAirline(data){
        if(data === "AI"){
          return "Air India"
        }
        if(data === "IX"){
          return "Air India Express"
        }
        if(data === "I5"){
          return "AIX Connect"
        }
        if(data === "Qp"){
          return "Akasa Air"
        }
        if(data === "6E"){
          return "IndiGo"
        }
        if(data === "SG"){
          return "SpiceJet"
        }
        if(data === "UK"){
          return "Vistara"
        }
        if(data === "G8"){
          return "Go Air"
        }
    }

    function handleFlightLogo(data){
      if (data === "AI") {
        return <img  src="https://play-lh.googleusercontent.com/BMIZX4wV8t3ZbgDaPwPNXgzsSWrmu9c-aMIBPknr9MttjL05SsHRPJ7shNy4D-bA6y5U" alt="Air India" />;
      }
      if (data === "IX") {
        return <img src=" https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM70hjiFpo1RsYbkeTAJqH9n4DFH6u9bjadQ&s" alt="Air India Express" />;
      }
      if (data === "I5") {
        return <img  src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/AirAsia_New_Logo.svg/220px-AirAsia_New_Logo.svg.png" alt="AIX Connect" />;
      }
      if (data === "QP") {
        return <img src="https://logos-world.net/wp-content/uploads/2022/01/Akasa-Air-Emblem.png" alt="Akasa Air" />;
      }
      if (data === "6E") {
        return <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMcUMH0VxUTElD1tjWO8iLs_8mN7Lm2l0HEw&s" alt="IndiGo" />;
      }
      if (data === "SG") {
        return <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-HlmvzR5LoJ-ME_f5OcL2OBYYj7l8YKfiEqiqg8U7JIOmLLuIuJiBroO9mZDtm1MDwVM&usqp=CAU" alt="SpiceJet" />;
      }
      if (data === "UK") {
        return <img src="https://assets.planespotters.net/files/airlines/1/goair_72e0ed_opk.png" alt="Vistara" />;
      }
      if (data === "G8") {
        return <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFTlSDGsxMsjR4wFC-33moZEnjGRHgvZlTrQ&s" alt="Go Air" />;
      }
  }




    function getDayformat(datestring){
        const dayMatch = datestring.match(/^\w{3}/)
        return dayMatch ? dayMatch[0]:""
    }
    
   
    console.log(flight)
  
    
   useEffect(()=>{
      try{
        fetch(`${API_ENDPOINT}/flight?search={"source":"${from.iata_code}","destination":"${to.iata_code}"}&day=${days}`,
          {
            method: "GET",
            headers: {projectID: `${PROJECT_ID}`}
        }).then((res)=>res.json())
          .then((data)=>{
              setFlight(data?.data?.flights)
          })
        
      }
      catch(err){
          console.log(err)
        }
 },[])
  
  
  return (
    <>
      <MyContextStore.Provider value={{
           airport,
          from,setFrom,
          to , setTo,
          date, setDate,
          adult,setAdult,
          children,setChildren,
          Class,setClass
      }}
      >
        <div>
          <Navbar/>
          <div className="bgColor">
             <Inpute/>
          </div>
        </div>
      </MyContextStore.Provider>
       <div className="headingLabel">
          Flights from {from.city} to {to.city}
       </div>

       <div className="flightCards">
              {
                flight.map((flightDetails)=>
                  <>
                      <div key={flightDetails._id} >
                        <div className="flightSection">

                            <div style={{paddingTop:"60px"
                                ,paddingLeft:"20px"}}
                                >
                                  {handleFlightLogo(flightDetails.flightID.substring(0,2))}  

                            </div>  

                            <div style={{paddingTop:"57px",
                              paddingLeft:"5px",
                              display:"flex",
                              flexDirection:"column",
                              fontWeight:"600"
                            }}
                              >
                                {handleAirline(flightDetails.flightID.substring(0,2))}

                                <span style={{fontSize:"small",
                                  color:"#878787"}}
                                  >
                                  {flightDetails.flightID.substring(0,2)}
                                  {flightDetails.flightID.substring(13,16)}

                                </span>
                            </div>

                            <div style={{paddingTop:"57px",
                                         paddingLeft:"80px",
                                         fontWeight:"700",
                                          fontSize:"large",
                                          display:"flex",
                                          flexDirection:"column"
                            }}>
                                {flightDetails.departureTime}

                                <span style={{fontSize:"small",
                                    fontWeight:"400"
                                }}>
                                    {from.city}
                                </span>

                            </div>
                            <div style={{paddingTop:"57px",
                              paddingLeft:"100px",
                              fontSize:"small",
                              display:"flex",
                              flexDirection:"column",
                              flexGap:"50px"
                            }}>
                              {flightDetails.duration}hr

                              <div style={{width:"50px",height:"2.5px",backgroundColor:"rgb(81,226,196"}}>

                              </div>
                                <span style={{fontSize:"smaller"}}>
                                  {flightDetails.stops === 0?"Non stop": `${flightDetails.stops} Stop`} 
                                </span>
                            </div>

                            <div style={{paddingTop:"57px",
                               paddingLeft:"100px",
                               fontWeight:"700",
                               fontSize:"large",
                               display:"flex",
                               flexDirection:"column"
                            }}>
                              {flightDetails.arrivalTime}

                              <span style={{fontSize:"small",
                                fontWeight:"400"
                              }}>
                                  {to.city}
                              </span>

                            </div>

                            <div style={{paddingTop:"57px",
                              paddingLeft:"100px",
                              fontWeight:"700",
                              fontSize:"larger"
                            }}>
                                {flightDetails.ticketPrice}
                            </div>

                        </div>
                      </div>
                  </>
                )
              }
       </div>
    </>
  )
}

export default FlightResult;

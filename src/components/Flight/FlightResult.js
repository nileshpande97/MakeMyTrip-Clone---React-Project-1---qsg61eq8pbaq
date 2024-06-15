import React, {useEffect,useState}from "react"
import "./flightresult.css"
import Navbar from "./Flight Search/Navbar";
import Inpute from "./Flight Search/Inpute";
import { useLocation } from "react-router-dom";
import MyContextStore from "./MycontexStore";







function FlightResult() {
    const location = useLocation()
    const {fromDestination, toDestination, departureDate, Adults, Child,airportName, class: travellerClass } = location.state || {}
    const [airport,setAirport] = useState([])
    const {from,setFrom} = useState(fromDestination || {city:'',country:''})
    const {to,setTo} = useState({})
    const {date,setDate} = useState()
    const API_ENDPOINT ="https://academics.newtonschool.co/api/v1/bookingportals"
    const PROJECT_ID = "f104bi07c490"

   useEffect(()=>{
      
 },[])

 console.log(airportName)

  return (
    <>
      <MyContextStore.Provider value={{
          airport: airport,
      }}

      >
        <div>
          <Navbar/>
          <div className="bgColor">
             {/* <Inpute/> */}
          </div>
        </div>
      </MyContextStore.Provider>
       
    </>
  )
}

export default FlightResult;

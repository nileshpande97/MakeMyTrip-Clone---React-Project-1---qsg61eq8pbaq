import React, {useEffect,useState,MouseEvent,HTMLElement}from "react"
import "./flightresult.css"
import Navbar from "./Flight Search/Navbar";
import Inpute from "./Flight Search/Inpute";
import { json, useLocation } from "react-router-dom";
import MyContextStore from "./MycontexStore";
import {Box,Button,Modal,ToggleButton,ToggleButtonGroup,Slider,FormGroup,FormControlLabel,Checkbox} from '@mui/material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import CloudIcon from '@mui/icons-material/Cloud';












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
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const API_ENDPOINT ="https://academics.newtonschool.co/api/v1/bookingportals"
    const PROJECT_ID = "f104bi07c490";
    const [alignment, setAlignment] = React.useState('web');
    const [sort,setSort] = useState({})
    const [stop,setStop] = useState({"stops":[]})
    const [dTime,setDTime] = useState({})
  

  

    const style = {
      position: 'absolute',
      top: '40%',
      left: '70%',
      transform: 'translate(-50%, -50%)',
      width: 600,
      height:250,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };

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
        return <img src="https://play-lh.googleusercontent.com/E_SwrB7iPlTB53XBwlrgNsWPM_JhJ8DPK60Ht_RDHLkim_FIGF558LPA7QXw4ksWYEU" alt="Vistara" />;
      }
      if (data === "G8") {
        return <img src="https://assets.planespotters.net/files/airlines/1/goair_72e0ed_opk.png" alt="Go Air" />;
      }
  }
  



    function getDayformat(datestring){
        const dayMatch = datestring.match(/^\w{3}/)
        return dayMatch ? dayMatch[0]:""
    }
    
   
    const handleChange = (even,newAlignment) => {
      setAlignment(newAlignment);
    };

     

   useEffect(()=>{
      async function fetchFlights(){
      try{
          const response = await fetch( `${API_ENDPOINT}/flight?search={"source":"${from.iata_code}","destination":"${to.iata_code}"}&day=${days}&sort=${JSON.stringify(sort)}&filter=${JSON.stringify(stop)}`,
           {
            method: "GET",
            headers: { projectID: `${PROJECT_ID}` }
           }
        )
          const data = await response.json()
          setFlight(data?.data?.flights)
      }
      catch(err){
        console.log(err)
      } 
      }
      fetchFlights()

 },[sort,stop])
  

   function handlechecked(e){
    const value = e.target.value
    setStop((prevState) =>{
      const updateStops = e.target.checked ?
       [...prevState.stops,value]:
       prevState.stops.filter((stopValue)=> stopValue !== value)
       return{...prevState.stops, stops:updateStops}
   })
   }
   console.log(stop)
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
      <div className="flightSort">
          <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChange}
             aria-label="Sorting"
          >
              <ToggleButton value="CHEAPEST"
                onClick={()=> setSort({"ticketPrice":1})}
                className={`toggleButton ${alignment === 'CHEAPEST' ? 'selected' : ''}`}
              >
                <CurrencyRupeeIcon />
                <p>CHEAPEST</p>
                
              </ToggleButton>
              <ToggleButton value="NON STOP FIRST"
                  onClick={()=>setSort({"stops":1})}
                  className={`toggleButton ${alignment === 'NON STOP FIRST' ? 'selected' : ''}`}>
                   <FlashOnIcon/>
                   <p>NON STOP FIRST</p>
              </ToggleButton>   
          </ToggleButtonGroup>
      </div>
       <div className="flightCards">
              {
                flight.map((flightDetails)=>
                  <>
                     
                      <div key={flightDetails._id} >
                        <div className="flightSection">

                            <span className="flightLogo">
                                  {handleFlightLogo(flightDetails.flightID.substring(0,2))}  

                            </span>  

                            <div className="flightAirline">
                                <p>
                                    {handleAirline(flightDetails.flightID.substring(0,2))}
                                </p>
                                <p style={{fontSize:"small",color:"#878787"}}>
                                    {flightDetails.flightID.substring(0,2)}
                                    {flightDetails.flightID.substring(13,16)}

                                </p>
                            </div>

                            <div className="flightFrom">
                                <p>
                                    {flightDetails.departureTime}
                                </p>
                                <p style={{fontSize:"small",fontWeight:"400"}}>
                                    {from.city}
                                </p>

                            </div>
                            <div className="flightDuration">
                              <p>
                                  {flightDetails.duration}hr
                              </p>
                              <div
                              style={{width:"50px",height:"2.5px",backgroundColor:"rgb(81,226,196"}}
                              >
                              </div >
                                <p style={{fontSize:"smaller"}}>
                                  {flightDetails.stops === 0?"Non stop": `${flightDetails.stops} Stop`} 
                                </p>
                            </div>

                            <div className="flightTo">
                              <p>
                                  {flightDetails.arrivalTime}
                              </p>
                              <p style={{fontSize:"small",fontWeight:"400"}}>
                                  {to.city}
                              </p>

                            </div>

                            <div className="flightPrice">
                                <p>
                                  ₹ {flightDetails.ticketPrice}
                                </p>
                                <p style={{fontSize:'small',fontWeight:"400"}}>
                                    per adult
                                </p>
                            </div>
                            <div className="priceModal">
                               <Button onClick={handleOpen} style={{fontSize:"small",fontWeight:"600"}}>VIEW PRICES</Button>
                                <Modal
                                  open={open}
                                  onClose={handleClose}
                                  aria-labelledby="modal-modal-title"
                                  aria-describedby="modal-modal-description"
                                >
                                  <Box sx={style}>
                                  </Box>
                                </Modal>
                            </div>
                        </div>
                      </div>
                  </>
                )
              }
       </div>
       <div className="flightFilter">
          <h4 style={{padding:"10px 10px"}}>Popular Filter</h4>
            <div className="priceSlider">
                <h4>One Way Price</h4>
                <Box sx={{ width: 230 }}>
                  <Slider min={2000} max={2500} aria-label="medium" valueLabelDisplay="auto" />
                </Box>
                <p>₹ 2,000</p>
                <p style={{position:"absolute",left:"196px",top:"118px"}}>₹ 2,493</p>
            </div>
            <div className="flightChecked">
              <h4>Stops from {from.city}</h4>
                <FormGroup>
                  <FormControlLabel  control={<Checkbox value="0" onChange={handlechecked}/>}label="Non Stop"/>
                  <FormControlLabel  control={<Checkbox value="1" onChange={handlechecked}/>}label="1 Stop"/>
                </FormGroup>
            </div>
            <h4 style={{paddingLeft:"20px"}}>Departure From {from.city}</h4>
            <div className="filterDeparture">
                <button 
                  name="Before 6AM"
                  value={dTime}
                  onClick={() => setDTime({"departureTime":{"$lt":"06:00"}})}>
                    <WbTwilightIcon/>
                    <p>Before 6AM</p>
                </button>   
                <button className={"6AM-12PM?"?"active":""}>
                    <LightModeIcon/>
                    <p>6AM-12PM</p>
                </button>
                <button>
                    <CloudIcon/>
                    <p>12PM-6PM</p>
                </button>
                <button>
                    <NightsStayIcon/>
                    <p>After 6PM</p>
                </button>
            </div>
            <h4 style={{paddingLeft:"20px"}}>Arrival at {to.city}</h4>
            <div>
            <div className="filterArrival">
                <button className={`arrivalBtn{}`}>
                    <WbTwilightIcon/>
                    <p>Before 6AM</p>
                </button> 
                <button className={"6AM-12PM?"?"active":""}>
                    <LightModeIcon/>
                    <p>6AM-12PM</p>
                </button>
                <button>
                    <CloudIcon/>
                    <p>12PM-6PM</p>
                </button>
                <button>
                    <NightsStayIcon/>
                    <p>After 6PM</p>
                </button>
            </div>
            </div>
              <h4 style={{paddingLeft:"20px"}}>Airlines</h4>
            <div className="filterAirlines">

              <span>
                  <input type="checkbox" className="filterCheckBox"/>
                  <label>
                      <img src="https://play-lh.googleusercontent.com/BMIZX4wV8t3ZbgDaPwPNXgzsSWrmu9c-aMIBPknr9MttjL05SsHRPJ7shNy4D-bA6y5U"/>
                      Air India
                  </label>
               </span>

               <span>
                  <input type="checkbox" className="filterCheckBox"/>
                  <label>
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM70hjiFpo1RsYbkeTAJqH9n4DFH6u9bjadQ&s"/>
                      Air India Exprress
                  </label>
               </span>

               <span>
                  <input type="checkbox" className="filterCheckBox"/>
                  <label>
                      <img src="https://logos-world.net/wp-content/uploads/2022/01/Akasa-Air-Emblem.png"/>
                      Akasa Air
                  </label>
               </span>

              <span>
                   <input type="checkbox" className="filterCheckBox"/>
                  <label>
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMcUMH0VxUTElD1tjWO8iLs_8mN7Lm2l0HEw&s"/>
                      IndiGo
                  </label>
              </span>  

              <span>
                  <input type="checkbox" className="filterCheckBox"/>
                  <label>
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-HlmvzR5LoJ-ME_f5OcL2OBYYj7l8YKfiEqiqg8U7JIOmLLuIuJiBroO9mZDtm1MDwVM&usqp=CAU"/>
                      SpiceJet
                  </label>
              </span>

              <span>   
                    <input type="checkbox" className="filterCheckBox"/> 
                  <label>
                      <img src="https://play-lh.googleusercontent.com/E_SwrB7iPlTB53XBwlrgNsWPM_JhJ8DPK60Ht_RDHLkim_FIGF558LPA7QXw4ksWYEU"/>
                      Vistara
                  </label>
              </span>
             </div>
       </div>
    </>
  ) 
}

export default FlightResult;

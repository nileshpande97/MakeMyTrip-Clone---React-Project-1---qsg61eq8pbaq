  import React,{useEffect, useState} from 'react'
  import  "./flight.css"
  import { useNavigate } from 'react-router-dom';
  import TextField from '@mui/material/TextField';
  import Autocomplete from '@mui/material/Autocomplete';
  import {Box,Button,Modal, Typography, formControlClasses} from "@mui/material";
  import DatePicker from "react-datepicker";
  import "react-datepicker/dist/react-datepicker.module.css"
import { counter } from '@fortawesome/fontawesome-svg-core';
  
  
  export default function Flight() {
    const [fromDestination,setFromDestination] = useState({
      coordinates: {
        latitude: 19.0896,
        longitude: 72.8656,
      },
      additional_info: {
        timezone: "IST",
        elevation: 14,
      },
      _id: "6514309e348f6fafa1b86608",
      name: "Chhatrapati Shivaji Maharaj International Airport",
      city: "Mumbai",
      country: "India",
      iata_code: "BOM",
      icao_code: "VABB",
      __v: 0,
	  });

    const [toDestination,setTodestination] = useState({
      coordinates: {
        latitude: 19.0896,
        longitude: 72.8656,
      },
      additional_info: {
        timezone: "IST",
        elevation: 14,
      },
      _id: "6514309e348f6fafa1b86608",
      name: "Chhatrapati Shivaji Maharaj International Airport",
      city: "Mumbai",
      country: "India",
      iata_code: "BOM",
      icao_code: "VABB",
      __v: 0,

    });
    const [departureDate,setDepartureDate] = useState(new Date());
    const [travellerClass,setTravelarClass] = useState("Economy/Premium Economy");
    const [selecteAdults,setSelectAdults] = useState(1)
    const [selectChild,setSelectChild] = useState(0)
    const [airportName,setAirportsName] = useState([])
    const [error,setError] = useState(false)
    const APP_API = "https://academics.newtonschool.co/api/v1/bookingportals";
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate()
  
      
    



      

      useEffect(() => {
          // searchAirportName();
          fetch(`${APP_API}/airport?limit=50`, {
            method: "GET",
            headers: { projectID: "f104bi07c490" },
          })
            .then((res) => res.json())
            .then((data) => {
              //console.log(data?.data?.airports);
              setAirportsName(data?.data?.airports);
            });

            if(fromDestination && toDestination && fromDestination.iata_code === toDestination.iata_code){
              setError(true)
            }else{
                  setError(false)
            } 
        }, [fromDestination, toDestination]);

     

      
      
      function handleDateChange(date){
        setDepartureDate(date)
      }
       
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


      function handleFlightSearch(e){
        e.preventDefault()
      
        let cabinClass = "";
        if(travellerClass === "Economy"){
          cabinClass = "E"
        }
        if(travellerClass === "Premium Economy"){
          cabinClass = "P"
        }
        else if(travellerClass === "Business"){
          cabinClass = "B"
        }
        const itinerary = `${fromDestination.iata_code}-${toDestination.iata_code}-${departureDate.toISOString().split('T')[0]}`;
        const tripType = "O"; // Assuming one-way trip
        const paxType = `A-${selecteAdults}_C-${selectChild}_I-0`;
        const intl = "false"; // Assuming domestic flight
        const ccde = "IN"; // Assuming country code is IN
        const lang = "eng"; //

        if(error){
          alert("From and To airport cannot be the same")
        }else{
            navigate(`/flight/search?itinerary=${itinerary}&tripType=${tripType}&paxType=${paxType}&intl=${intl}&cabinClass=${cabinClass}&ccde=${ccde}&lang=${lang}`,
              {state:{
                fromDestination:fromDestination,
                toDestination:toDestination,
                departureDate:departureDate,
                Adults:selecteAdults,
                Child:selectChild,
                class:travellerClass,
                airportName:airportName
              }}
            )
        }
        
      }

    

      return (
        <>
          
          <div className='flightContainer'>
            <Autocomplete
                value={fromDestination}
                // value => state control
                autoComplete={true}
                clearOnEscape={true}
                id="fromDestination"
                options={airportName}
                size="medium"
                sx={{ width: 300,marginLeft:5}}
                autoHighlight
                onChange={(event, newValue) => {
                // if event is not passed as first argument i.e. (newValue) then JS treats the name newValue as event itself
                // in order to pass the selection airport-object we need to pass in event as a first argument and then the newer value
                  setFromDestination(newValue);
                }}
                getOptionLabel={(option) => `${option.iata_code},${option.city},${option.name}`}
                isOptionEqualToValue={(option, value) => {
                  return option.city === value.city;
                }}
                renderOption={(props, option) => (
                  <Box
                    className="airportsSelection"
                    component="li"
                    sx={{
                        display:"flex",
                        flexDirection:"column",
                        alignItems:"flex-start"
                        }}
                    {...props}
                  >
                    <div><b>{option.city}, {option.country}</b></div>
                    <div>
                      <span>{option.iata_code}</span>
                      <span> - </span>
                      <span>{option.name}</span>
                    </div>  
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    required
                    sx={{ backgroundColor: "transparent" }}
                    className="airportsSelection"
                    {...params}
                    label="From"
                    inputProps={{
                    ...params.inputProps,
                    // autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                  />
                )}
				    />
  
             <Autocomplete
                  value={toDestination}
                  autoComplete={true}
                  clearOnEscape={true}
                  id='toDestination'
                  options={airportName}
                  size='medium'
                  sx={{ width: 300,height:400}}
                  autoHighlight
                  onChange={(event,newValue)=>{
                    setTodestination(newValue)
                  }}
                  getOptionLabel={(option)=>`${option.iata_code} ${option.city} ${option.name}`}
                  isOptionEqualToValue={(option, value) => {
                    return option.city === value.city;
                  }}
                  renderOption={(props, option) => (
                    <Box
                      className="airportsSelection"
                      component="li"
                      sx={{
                          display:"flex",
                          flexDirection:"column",
                          alignItems:"flex-start"
                          }}
                      {...props}
                    >
                      <div><b>{option.city}, {option.country}</b></div>
                      <div>
                        <span>{option.iata_code}</span>
                        <span> - </span>
                        <span>{option.name}</span>
                      </div> 
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      required
                      sx={{ backgroundColor: "transparent" }}
                      className="airportsSelection"
                      {...params}
                      label="To"
                      error={error}
                        helperText={error && "From and To airport cannot be the same"}
                    />
                  )}
            />
           
          <div>
              <DatePicker
                className='departureDate'
                selected={departureDate}
                onChange={handleDateChange}
                minDate={new Date()}
                dateFormat="dd MMM yyyy, EEE"
              />
              
          </div>
          <div className='modal'>
            <div>
              <Button onClick={handleOpen} style={{color:"black",display:"flex", flexDirection:"column", alignItems:"flex-start"}}>
                  <div style={{display:"block"}} >Traveller & Class</div>
                  <div style={{display:"block"}}>{(selecteAdults + selectChild)} Travellar</div>
                  <div style={{display:"block"}}>{travellerClass}</div>
              </Button>
              <Modal
                open={open}
              >
              <Box sx={style}>
              <div>
                      <div className='adultContainer'>
                        <p>ADULTS(12y+)</p>
                        <ul className='adults'>
                          {[1,2,3,4,5,6,7,8,9,"+9"].map((num)=>(
                          <li
                            key={num}
                            className={selecteAdults === num?"num active":"num"}
                            onClick={()=>setSelectAdults(num)}
                          >{num}</li>
                          ))}
                        </ul>
                      </div>
                      <div className='childContainer'>
                        <p>CHILDREN(2-12y)</p>
                        <ul className='children'>
                          {[0,1,2,3,4,5,6,"+6"].map((num)=>(
                          <li
                            key={{num}}
                            className={selectChild === num?"num active":"num"}
                            onClick={()=>setSelectChild(num)}
                          >{num}</li>
                        ))}
                        </ul>
                      </div>
                      <div >
                        <p>CHOOSE TRAVEL CLASS</p>
                        <ul className='class'>
                          {["Economy","Premium Economy","Business"].map((tClass)=>(
                          <li
                            key={tClass}
                            className={travellerClass === tClass?"tclass active":"tclass"}
                            onClick={()=>setTravelarClass(tClass)}
                          >{tClass}</li>
                        ))}
                        </ul>
                      </div>
                    </div>
                    <div >
                      <button className='applyBtn' onClick={handleClose}>Apply</button>
                    </div>
                  </Box>
                </Modal>
              </div>

            </div>


          <button className='searchBtn' onClick={handleFlightSearch}>SEARCH</button>

        </div>
         
        
      </>
      
    )
  }

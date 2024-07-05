import React, { useEffect,useState } from 'react'
import "../Hotel/Hotel.css"
import {TextField,Autocomplete,Box} from '@mui/material'
import DatePicker from "react-datepicker";






export default function Hotel() {
  const API_ENDPOINT = "https://academics.newtonschool.co/api/v1/bookingportals"
  const PROJECT_ID = "f104bi07c490"
  const [city,setCity] = useState([])
  const [checkIn,setCheckIn] = useState(new Date())
  const [checkOut,setCheckOut] = useState(new Date())
  const [location,setLocaton] = useState({
        "_id": "65292ae86ea9a006f4ad6855",
        "cityState": "Mumbai, Maharashtra",
        "__v": 0
  })


  async function handleHotelLocation(){
    try{  
        const response = await fetch(`${API_ENDPOINT}/city`,
         {
          method:"GET",
          headers:{projectID: {PROJECT_ID} }
         }
      )
        if(!response.ok){
          throw new Error("something went wrong")
        }
        const data = await response.json()
        setCity(data?.data?.cities)
    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleHotelLocation()
   
  },[])

  function handlecheckIn (date){
    setCheckIn(date)
  }

  return (
    <>
        <div className='hotelContainer'>  
            <Autocomplete
              value={location}
              autoComplete={true}
              clearOnEscape={true}
              id='location'
              options={city}
              size='medium'
              sx={{width:400,marginLeft:5}}
              autoHighlight
              onChange={(event ,newValue)=>
                setLocaton(newValue)
              }
              getOptionLabel={(option) =>`${option.cityState}`}
              isOptionEqualToValue={(option,value) =>{
                return option.cityState === option.value
              }}
              renderOption={(props ,option) =>(
                <Box
                  className="locationSelection"
                  component="li"
                  sx={{
                    display:"flex",
                    flexDirection:"column",
                    alignItems:"flex-start"
                  }}
                  {...props}
                >
                    {option.cityState}
                </Box>
              ) }
              renderInput={(params) => (
                <TextField
                  required
                  sx={{ backgroundColor: "transparent" }}
                  className="locationSelection"
                  {...params}
                  label="City Property Name Or Location"
                  inputProps={{
                  ...params.inputProps,
                  }}
                />
              )}
                 
            />

            <div >
              <DatePicker
                label="Check-In"
                className='checkIn'
                selected={checkIn}
                onChange={handlecheckIn}
                minDate={new Date()}
                dateFormat="dd MMM yy,EEE"
                renderInput = {(params) => <TextField {...params}/>}
              />
             </div>
        </div>
    </>
  )
}

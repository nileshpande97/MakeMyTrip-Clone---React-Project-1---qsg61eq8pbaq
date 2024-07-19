import React, { useEffect,useState } from 'react'
import "../Hotel/Hotel.css"
import {TextField,Autocomplete,Box} from '@mui/material'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import {Button,Modal,} from "@mui/material";
import { useNavigate } from 'react-router-dom';





export default function Hotel() {
  const API_ENDPOINT = "https://academics.newtonschool.co/api/v1/bookingportals"
  const PROJECT_ID = "f104bi07c490"
  const [city,setCity] = useState([])
  const [checkIn,setCheckIn] = useState(dayjs)
  const [checkOut,setCheckOut] = useState(dayjs().add(2,'day'))
  const [location,setLocaton] = useState({
        _id: "65292ae86ea9a006f4ad6855",
        cityState: "Mumbai, Maharashtra",
        __v: 0
  })
  const [room,setRoom] = useState(0)
  const [adult,setAdult] = useState(2)
  const [child,setChild] = useState(0)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate()



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

  

  const style = {
    position: 'absolute',
    top: '40%',
    left: '70%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height:300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  

  function handleHotelSearch(){
    const cityParam = location.cityState
    const checkInParam = checkIn.format("YYYY-MM-DD")
    const checkOutParam = checkOut.format("YYYY-MM-DD")

    navigate(`/hotel/search?checkin=${checkInParam}&city=${JSON.stringify(cityParam)}&checkout=${JSON.stringify(checkOutParam)}&roomStayQualifier${adult}&locusId=${cityParam}&contryIN`,
     {
      state:{
          city,
          checkIn:checkIn.toISOString(),
          checkOut:checkOut.toISOString(),
          location,
          room,
          adult,
          child
     }} 
  )
  }

  const formatDate = (date) => dayjs(date).format('ddd, DD MMM YYYY');

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
              sx={{width:400,marginLeft:5,marginTop:1}}
              autoHighlight
              onChange={(event ,newValue)=>
                setLocaton(newValue)
              }
              getOptionLabel={(option) =>`${option.cityState}`}
              isOptionEqualToValue = {(option,value) =>{
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
              <div id='checkIn'>
                <Box sx={{width:200,height:'150px'}} >
                  <LocalizationProvider dateAdapter={AdapterDayjs} >
                      <DemoContainer components={['DatePicker', 'DatePicker']}>
                        <DatePicker
                          label="Check-In"
                          defaultValue={checkIn}
                          onChange={(newValue) => setCheckIn(newValue)}
                        />
                      </DemoContainer>
                  </LocalizationProvider>
                </Box>
              </div>
              <div>
                <Box sx={{width:200}}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker', 'DatePicker']}>
                          <DatePicker
                            label="Check-Out"
                            value={checkOut}
                            onChange={(newValue) => setCheckOut(newValue)}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                value={checkOut ? formatDate(checkOut) : ''}
                                onChange={(e) => setCheckOut(dayjs(e.target.value))}
                              />
                            )}
                          />
                        </DemoContainer>
                    </LocalizationProvider>
                  </Box>
              </div>
              <div>
                  <div className='Modal'>
                    <Button onClick={handleOpen}>
                        <div >
                            <div style={{color:"black",fontSize:"xSmall"}}> 
                              Rooms & Guests
                            </div>
                            <div className='hotelModal'> 
                            {room} <p>Room</p> {adult + child} <p>Adults</p>
                            </div>
                            
                        </div>
                    </Button>
                    <Modal
                      open={open} onClose={handleClose}
                    >
                        <Box sx={style}>
                          <div className='rooms'>
                            <h4>Rooms</h4>
                            <input value={room} onChange={(e)=>setRoom(e.target.value)}/>
                          </div>
                          <div className='hAdult'>
                            <h4>Adults</h4>
                            <input value={adult} onChange={(e)=>setAdult(e.target.value)}/>
                          </div>
                          <div className='hChild'>
                            <span>
                            <h4>Children</h4>
                            <p>0-17Years Old</p>
                            </span>
                            <input value={child} onChange={(e)=>setChild(e.target.value)}/>
                          </div>
                          <p style={{fontSize:"small",color:"#9b9b9b"}}>Please provide right number of children along with their right age for best options and prices.</p>
                          <div >
                              <button className='applyBtn' onClick={handleClose}>Apply</button>
                          </div>
                        </Box>
                    </Modal>
                </div>
              </div>

              <button className='searchBtn' onClick={handleHotelSearch}>SEARCH</button>

        </div>
    </>
  )
}

import React, { useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box } from "@mui/material";
import MyContextStore from '../Flight/MycontexStore';
import {Button,Modal,} from "@mui/material";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export default function Inpute() {
  const contextState = useContext(MyContextStore)
  const [child,setChild] = useState(0)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
    
   
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


    return (
      <>  
          <div className='inputBox'>
          <Autocomplete
                value={contextState.property}
                autoComplete={true}
                clearOnEscape={true}
                id='location'
                options={contextState.city}
                size='small'
                sx={{ width: 250, marginLeft: 10, marginTop: 2, height: 50 }}
                autoHighlight
                onChange={(event, newValue) => contextState.setProperty(newValue)}
                getOptionLabel={(option) => `${option.cityState}`}
                isOptionEqualToValue={(option, value) => option.cityState === option.value}
                renderOption={(props, option) => (
                  <Box
                    className="locationSelection"
                    component="li"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start"
                    }}
                    {...props}
                  >
                      {option.cityState}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                      required
                      sx={{
                        backgroundColor: 'hsla(0, 0%, 100%, .2)',
                        '& .MuiInputLabel-root': {
                          color: '#008CFF',
                          fontWeight: "700"
                        },
                        '& .MuiInputBase-input': {
                            color: 'white'
                        }
                      }}
                      {...params}
                      label="City Property Name Or Location"
                      inputProps={{
                        ...params.inputProps,
                      }}
                  />
                )}
                    
              />
                
          </div>
          <div className='hCheckIn'>
            <Box >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker', 'DatePicker']}>
                  <DatePicker
                    label="Check-In"
                    value={contextState.hCheckIn}
                    onChange={(newValue) => contextState.setHCheckIn(newValue)}
                    sx={{
                        '& .MuiInputBase-input': {
                           color: 'white',
                           height:"2rem",
                           backgroundColor:"hsla(0, 0%, 100%, .2)"
                         },
                         '& .MuiInputLabel-root': {
                          color: 'rgb(72, 201, 249)',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgb(72, 201, 249)',
                        },
                        '& .MuiPickersDay-root': {
                          color: 'white',
                        },
                       }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
          </div>
          <div className='hCheckOut'>
            <Box >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker', 'DatePicker']}>
                  <DatePicker
                    label="Check-In"
                    value={contextState.hCheckOut}
                    onChange={(newValue) => contextState.setHCheckOut(newValue)}
                    sx={{
                        '& .MuiInputBase-input': {
                           color: 'white',
                           height:"2rem",
                           backgroundColor:"hsla(0, 0%, 100%, .2)"
                         },
                         '& .MuiInputLabel-root': {
                          color: 'rgb(72, 201, 249)',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgb(72, 201, 249)',
                        },
                        '& .MuiPickersDay-root': {
                          color: 'white',
                        },
                       }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
          </div>
          <div>
          <div className='hModal'>
                    <Button onClick={handleOpen}>
                        <div >
                            <div style={{color:"black",color: 'rgb(72, 201, 249)',fontSize:"small"}}> 
                              Rooms & Guests
                            </div>
                            <div className='hHotelModal'> 
                            {contextState.hRoom} <p>Room</p>,  {contextState.hAdult + contextState.hChild} <p>Adults</p>
                            </div>
                            
                        </div>
                    </Button>
                    <Modal
                      open={open} onClose={handleClose}
                    >
                        <Box sx={style}>
                          <div className='hRooms'>
                            <h4>Rooms</h4>
                            <input value={contextState.hRoom} onChange={(e)=>contextState.setHRoom(e.target.value)}/>
                          </div>
                          <div className='hHAdult'>
                            <h4>Adults</h4>
                            <input value={contextState.hAdult} onChange={(e)=>contextState.setHAdult(e.target.value)}/>
                          </div>
                          <div className='hHChild'>
                            <span>
                            <h4>Children</h4>
                            <p>0-17Years Old</p>
                            </span>
                            <input value={contextState.hChild} onChange={(e)=>contextState.setHChild(e.target.value)}/>
                          </div>
                          <p style={{fontSize:"small",color:"#9b9b9b"}}>Please provide right number of children along with their right age for best options and prices.</p>
                          <div >
                              <button className='applyBtn' onClick={handleClose}>Apply</button>
                          </div>
                        </Box>
                    </Modal>
                </div>
          </div>
          <div>
            <button className='flightSearchBtn'>SEARCH</button>
          </div>
  
      </>
    )
  }

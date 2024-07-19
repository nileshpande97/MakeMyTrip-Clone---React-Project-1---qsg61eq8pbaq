import React,{useState,useContext} from 'react'
import "../flightresult.css"
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {Box,Button,Modal,} from "@mui/material";
import MyContextStore from '../MycontexStore';
import DatePicker from "react-datepicker";


export default function Inpute() {
    const contextSatate = useContext(MyContextStore)
    const [open, setOpen] = useState(false);


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //  console.log(contextSatate.adult)


    function handleDateChange(date){
      contextSatate.setDate(date)
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

    

  return (
    <>  
        <div className='inputBox'>
        <Autocomplete
            value={contextSatate.from}
            autoComplete={true}
            clearOnEscape={true}
            id="from"
            options={contextSatate.airport}
            size='medium'
            sx={{ width: 200, marginLeft:10,paddingTop:2}}
            autoHighlight
            onChange={(event,newValue)=>{
              contextSatate.setFrom(newValue)
            }}
            getOptionLabel={(option)=>`${option.city},${option.country}`}
            isOptionEqualToValue={(option, value)=>{
              return option.city === value.city
            }}
            renderOption={(props, option) =>(
                  <Box
                    className="citySelection"
                    component="li"
                    sx={{
                      display:"flex",
                      flexDirection:"column",
                      alignItems:"flex-start"
                    }}
                    {...props}
                  >
                    <div>{option.city}, {option.country}</div>
                  </Box>
              )}
              renderInput = {(params)=>(
                <TextField
                  required
                  sx={{backgroundColor:'hsla(0, 0%, 100%, .2)',
                    '& .MuiInputLabel-root': {
                      color: '#008CFF' ,
                      fontWeight:"700"},
                    '& .MuiInputBase-input': {
                        color: 'white'}
                  }}
                    {...params}
                    label="From"
                    inputProps={{
                      ...params.inputProps,
                    }}
                />
              )}
         />

        <Autocomplete
            value={contextSatate.to}
            autoComplete={true}
            clearOnEscape={true}
            id="To"
            options={contextSatate.airport}
            size='medium'
            sx={{ width: 200, marginLeft:10,paddingTop:2}}
            autoHighlight
            onChange={(event,newValue)=>{
              contextSatate.setTo(newValue)
            }}
            getOptionLabel={(option)=>`${option.city},${option.country}`}
            isOptionEqualToValue={(option, value)=>{
              return option.city === value.city
            }}
            renderOption={(props, option) =>(
                  <Box
                    className="citySelection"
                    component="li"
                    sx={{
                      display:"flex",
                      flexDirection:"column",
                      alignItems:"flex-start"
                    }}
                    {...props}
                  >
                    <div>{option.city}, {option.country}</div>
                  </Box>
              )}
              renderInput = {(params)=>(
                <TextField
                  required
                  sx={{backgroundColor:"hsla(0, 0%, 100%, .2)",
                     '& .MuiInputBase-input': {
                    color: 'white'},
                     '& .MuiInputLabel-root': {
                    color: '#008CFF',
                    fontWeight:"700"    
                    }
                  }}
                    {...params}
                    label="To"
                    inputProps={{
                      ...params.inputProps,
                    }}
                />
              )}
        />
          <div>
              <DatePicker
                label="DEPART"
                className='Date'
                selected={contextSatate.date}
                onChange={handleDateChange}
                minDate={new Date()}
                dateFormat="dd MMM yyyy, EEE"
              />
              
          </div>
          <div className='resultModal'>
            <div style={{color:"#008CFF",fontSize:"small",fontWeight:"600"}}>PASSENGERS & CLASS</div>
            <div>
                <Button onClick={handleOpen}>
                    <div style={{color:"white",fontSize:"small",fontWeight:"600"}}>
                      {
                          contextSatate.children> 0 ?
                         <> {contextSatate.children + contextSatate.adult} Travellers, {contextSatate.Class}</>
                          :
                         <> {contextSatate.adult} Adults,{contextSatate.Class}</>
                      }
                    </div>
                </Button>
                <Modal
                  open={open} onClose={handleClose}
                >
                    <Box sx={style}>
                      <div>
                        <div className='flightAdultContainer'>
                          <p>ADULTS(12y+)</p>
                          <ul className='flightAdults'>
                              {[1,2,3,4,5,6,7,8,9,"+9"].map((num)=>(
                              <li
                              key={num}
                              className={contextSatate.adult === num?"flightNum active":"flightNum"}
                              onClick={()=>contextSatate.setAdult(num)}
                             >
                              {num}
                            </li>
                            ))}
                          </ul>
                        </div>
                        <div className='flightChildContainer'>
                          <p>CHILDREN(2-12y)</p>
                          <ul className='flightChildren'>
                            {[0,1,2,3,4,5,6,"+6"].map((num)=>(
                            <li
                              key={num}
                              className={contextSatate.children === num?"flightNum active":"flightNum"}
                              onClick={()=>contextSatate.setChildren(num)}
                            >
                              {num}
                            </li>
                            ))}
                          </ul>
                        </div>
                        <div >
                          <p>CHOOSE TRAVEL CLASS</p>
                          <ul className='flightClass'>
                            {["Economy","Premium Economy","Business"].map((tClass)=>(
                            <li
                              key={tClass}
                              className={contextSatate.Class === tClass?"flightTclass active":"flightTclass"}
                              onClick={()=>contextSatate.setClass(tClass)}
                            >
                              {tClass}
                            </li>
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
                
          <div>
              <button className='flightSearchBtn' >SEARCH</button>
          </div>

        </div>
    </>
  )
}

import React from "react"
import "./flightresult.css"
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { grey,blue } from "@mui/material/colors";

function FlightResult() {
  return (
    <>
      <div>
        <div className="flightLogo">
            <h4 style={{fontSize:"20px",color:"blue"}}>make <span style={{color:"red"}}>my</span> trip</h4>
        </div>
        <div className="bgColor">
            <div>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    //options={}
                    sx={{ width: 200,        '& .MuiOutlinedInput-root': {
                      backgroundColor: grey[700],
                      color: 'blue',
                      '& fieldset': {
                        borderColor: 'white',
                      },
                      }}}
                    renderInput={(params) => <TextField {...params} label="From" 
                      InputLabelProps={{style:{color:blue[500]}}}
                    />}
                  />
            </div>
            <div>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    //options={}
                    sx={{ width: 200,        '& .MuiOutlinedInput-root': {
                      backgroundColor: grey[700],
                      color: 'blue',
                      '& fieldset': {
                        borderColor: 'white',
                      },
                      }}}
                    renderInput={(params) => <TextField {...params} label="From" 
                      InputLabelProps={{style:{color:blue[500]}}}
                    />}
                  />
            </div>
        </div>
      </div>
       
    </>
  )
}

export default FlightResult;

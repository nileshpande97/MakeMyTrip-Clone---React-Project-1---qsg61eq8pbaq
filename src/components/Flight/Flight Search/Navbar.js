import React from 'react'
import "../flightresult.css"
import { NavLink } from 'react-router-dom';
import Flight from '../Flight';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import HotelIcon from '@mui/icons-material/Hotel'
import FlightIcon from '@mui/icons-material/Flight';
import TrainIcon from '@mui/icons-material/Train';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import { TabContext, TabPanel } from '@mui/lab';




export default function Navbar() {

    const [value, setValue] = React.useState(0);

    const handleChange = () => {
        setValue(newValue);
    };

    const handleNavLinkClick = (newValue) => {
        setValue(newValue);
    };

  return (
    <>
        <div className="navbar">
            <h4 style={{fontSize:"20px",color:"blue"}}>make <span style={{color:"white",backgroundColor:"red",paddingBottom:"5px",borderRadius:"5px"}}>my</span> trip</h4>

        <TabContext  value={value}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="icon position tabs example"
            sx={{
                height:"60px",
                '.MuiTab-root':{
                    height:"10px",
                    fontSize:"10px",
                    padding:"0 0px",
                    overflow:"hidden",
                    textOverflow:"ellipsis"                
                }
            }}
          > 
          
          <NavLink to="/flight" className="link" onClick={()=>handleNavLinkClick(0)} ><Tab icon={<FlightIcon/>} label="Flight"  /></NavLink>
          <NavLink to="/hotel" className="link" onClick={()=>handleNavLinkClick(1)}><Tab icon={<HotelIcon/>} label="Hotel"/></NavLink>
          <NavLink to="/railways" className='link'onClick={()=>handleNavLinkClick(4)}><Tab icon={<TrainIcon/>} label="Trains"/></NavLink>
          <NavLink to="/bus-tickets" className='link' onClick={()=>handleNavLinkClick(5)}><Tab icon={<DirectionsBusIcon/>} label="Buses" /></NavLink>
          </Tabs>
          <TabPanel value="0">
            <Flight/>
          </TabPanel>
          

        </TabContext>

        <button className='login-btn'>
            <h5 style={{display:"inline"}}>Login or</h5>
            <h5> Create Account</h5>
        </button>
        </div>
    </>
  )
}

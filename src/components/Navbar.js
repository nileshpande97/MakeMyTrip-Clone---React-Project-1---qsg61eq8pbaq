import * as React from 'react';
import {NavLink} from "react-router-dom"
import "../styles/Navbar.css"

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import HotelIcon from '@mui/icons-material/Hotel'
import VillaIcon from '@mui/icons-material/Deck';
import FlightIcon from '@mui/icons-material/Flight';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import TrainIcon from '@mui/icons-material/Train';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import SecurityIcon from '@mui/icons-material/Security';
import ForexIcon from '@mui/icons-material/AttachMoney';
import { TabContext, TabPanel } from '@mui/lab';
import Flight from './Flight/Flight';



export default function Navbar() {
  const [value, setValue] = React.useState(0);

  const handleChange = () => {
    setValue(newValue);
  };

  const handleNavLinkClick = (newValue) => {
    setValue(newValue);
  };
  return (

    
    <div className='container'>
      <div>
      <h4 style={{color:"white"}}>make <span style={{color:"white",backgroundColor:"red",paddingBottom:"5px",borderRadius:"5px"}}>my</span> trip</h4>
      </div>
      <div className='label'>
        <TabContext >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="icon position tabs example"
          > 
          
          <NavLink to="/flight" className="link" onClick={()=>handleNavLinkClick(0)} ><Tab icon={<FlightIcon/>} label="Flight"  /></NavLink>
          <NavLink to="/hotel" className="link" onClick={()=>handleNavLinkClick(1)}><Tab icon={<HotelIcon/>} label="Hotel"/></NavLink>
          <NavLink to="/homestays" className='link' onClick={()=>handleNavLinkClick(2)}><Tab icon={<VillaIcon/>}  label="Homestays & villas" /></NavLink>
          <NavLink to="/holidays-india" className='link'onClick={()=>handleNavLinkClick(3)}> <Tab icon={<BeachAccessIcon/>} label="Holiday Pacages" /></NavLink>
          <NavLink to="/railways" className='link'onClick={()=>handleNavLinkClick(4)}><Tab icon={<TrainIcon/>} label="Trains"/></NavLink>
          <NavLink to="/bus-tickets" className='link' onClick={()=>handleNavLinkClick(5)}><Tab icon={<DirectionsBusIcon/>} label="Buses" /></NavLink>
          <NavLink to="/cabs" className='link' onClick={()=>handleNavLinkClick(6)}><Tab icon={<LocalTaxiIcon/>} label="Cabs"/></NavLink>
          <NavLink to="/forex" className='link' onClick={()=>handleNavLinkClick(7)}><Tab icon={<ForexIcon/>}  label="Forex Card & Currency"/></NavLink>
          <NavLink to="/insurance" className="link" onClick={()=>handleNavLinkClick(8)}><Tab icon={<SecurityIcon/>} label="Travel Insurannce" /></NavLink>
          </Tabs>
          <TabPanel value="0">
            <Flight/>
          </TabPanel>
          

        </TabContext>
      </div>
            
    </div>

  );
}

import "../styles/App.css";
import {Routes,Route,useLocation} from "react-router-dom"


import Flight from "./Flight/Flight";
import Hotel from "./Hotel/Hotel";
import HomeStaysnVilas from "./HomeStays-Vilas/HomeStaysnVilas";
import Navbar from "./Navbar";
import Trains from "./Trains/Trains";
import Buses from "./Buses/Buses"
import Cabs from "./Cabs/Cabs"
import HolidayPackages from "./Holiday-packages/HolidayPackages";
import Forex from "./ForecCard&Currency/Forex";
import Insurance from "./Insurance/Insurance"
import OfferSection from "./Offersection";
import FlightResult from "./Flight/FlightResult";
import Hotelresult from "./Hotel/Hotelresult";


function App() {
  const Location = useLocation()
  const isFlightPath = Location.pathname === "/flight/search" 
  const isHotelPath = Location.pathname === "/hotel/search"
  
  return (
    <>
      {!isFlightPath && !isHotelPath && <Navbar/>}

      <div>
        <Routes>
          <Route path="/flight">
              <Route index element={<Flight/>}/>
              <Route path="search" element={<FlightResult/>}/>
          </Route>
          <Route path="/hotel" >
                <Route index element={<Hotel/>}/>
                <Route path="search" element={<Hotelresult/>}/>
          </Route>
          <Route path="/homestays" element={<HomeStaysnVilas/>}/>
          <Route path="/holidays-india" element={<HolidayPackages/>}/>
          <Route path="/railways" element={<Trains/>}/>
          <Route path="/bus-tickets" element={<Buses/>}/>
          <Route path="/cabs" element={<Cabs/>}/>
          <Route path="/forex" element={<Forex/>}/>
          <Route path="/insurance" element={<Insurance/>}/>
        </Routes>  
      </div>
      {!isFlightPath && !isHotelPath && <OfferSection/>}
    </>
    )
}

export default App;

import "../styles/App.css";
import {Routes,Route} from "react-router-dom"


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


function App() {
  return (
    <>
      <Navbar/>
      <diV>
        <Routes>
          <Route path="/flight" element={<Flight/>}>
            <Route path="/flight"/>
          </Route>
          <Route path="/hotel" element={<Hotel/>}/>
          <Route path="/homestays" element={<HomeStaysnVilas/>}/>
          <Route path="/holidays-india" element={<HolidayPackages/>}/>
          <Route path="/railways" element={<Trains/>}/>
          <Route path="/bus-tickets" element={<Buses/>}/>
          <Route path="/cabs" element={<Cabs/>}/>
          <Route path="/forex" element={<Forex/>}/>
          <Route path="/insurance" element={<Insurance/>}/>
        </Routes>
      </diV>

    </>
    )
}

export default App;

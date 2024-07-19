import React, { useEffect, useState } from 'react'
import  "./hotelresult.css"

import dayjs from 'dayjs';
import { useLocation } from 'react-router-dom'
import Navbar from "./Navbar"
import Input from "./Input"
import MyContextStore from '../Flight/MycontexStore'



export default function Hotelreslts() {
  const locat = useLocation()
  const {checkIn,checkOut,location,room,adult,child,city} = locat.state || {}
  const [property,setProperty] = useState(location)
  const [hCheckIn,setHCheckIn] = useState(checkIn? dayjs(checkIn):null)
  const [hCheckOut,setHCheckOut] = useState(checkOut? dayjs(checkOut):null)
  const [hRoom,setHRoom] = useState(room)
  const [hAdult,setHAdult] = useState(adult)
  const [hChild,setHChild] = useState(child)
  const [hotels,setHotels] = useState([])
  const API_ENDPOINT = "https://academics.newtonschool.co/api/v1/bookingportals"
  const PROJECT_ID = "f104bi07c490"

  

  async function handleHotels(){
      const response = await fetch(`${API_ENDPOINT}/hotel?search={"location":"${property.cityState}"}`,{
        
          method:"GET",
          headers:{projectID: {PROJECT_ID} }
         
      })
      if(!response.ok){
        throw new Error("Something went wrong")
      }
      const data = await response.json()
      setHotels(data?.data?.hotels)
      console.log(data)
  }
    
  useEffect(()=>{
    handleHotels()
  },[])

  return (
    <>
      <MyContextStore.Provider value={{
          property,setProperty,
          hCheckIn,setHCheckIn,
          hCheckOut,setHCheckOut,
          hRoom,setHRoom,
          hAdult,setHAdult,
          hChild,setHChild,
          city
      }}
      >
        <div>
          <Navbar/>
          <div className='bgColor'>
            <Input/>
          </div>
        </div>
        </MyContextStore.Provider>

      <div className='hotelCards'>  
        {
          hotels.map((hotelRoom)=>
            <>
              <div>
                  <div>
                      {hotelRoom.name}
                  </div>
              </div>
            </>
          )
        }
      </div>

    </>
  )
}

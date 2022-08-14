import React, { useContext } from 'react'
import { Roomcontext } from '../context'
import Loading from './loading'
import RoomFilter from "./RoomFilter"
import RoomList from "./RoomList"

export default function RoomContainer() {
const value =  useContext(Roomcontext)
const {loading,rooms,storedRooms} = value

if(loading){
  return <Loading/>
}

  return (

    <>
      <RoomFilter rooms={rooms} />
      <RoomList rooms={storedRooms} />
    </>
  )
}

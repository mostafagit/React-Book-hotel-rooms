import React from 'react'
import loadingGif from "../images/gif/loading-arrow.gif"
export default function Loading() {
  return (
    <div className='loading'>
    <div>loading</div>
    <img src={loadingGif} alt="" />
    </div>
  )
}

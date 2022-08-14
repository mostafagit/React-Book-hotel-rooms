import React, { useContext, useEffect, useState } from "react";
import { Roomcontext } from "../context";
import { useParams } from "react-router-dom";
import defaultBcg from "../images/room-1.jpeg";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import StyleHero from "../components/styleHero";

const SingleRoom = () => {
  const { getRoom } = useContext(Roomcontext);
  const [params] = useState(useParams());
  const [dfBackG] = useState(defaultBcg);
  const room = getRoom(params.slug);

if(!room){
   return(
   <div className="error">
        <h1>no such room could be found...</h1>
        <Link to={"/rooms"} className="btn-primary" >back to rooms</Link>
    </div>
   ) 
}
    const {name,description,capacity,size,price,extras,breakfast,pets,images} = room
    const [mainImg,...restImg] = images
  return(
      <>
      <StyleHero img={mainImg || dfBackG}>
        <Banner title={`${name} room`}>
            <Link to="/rooms" className="btn-primary" >
                back to rooms
            </Link>
        </Banner>
      </StyleHero>
      <section className="single-room">
    <div className="single-room-images">
      {restImg.map((item,index)=>(<img key={index} src={item} alt={name} />))}
    </div>
    <div className="single-room-info">
      <article className="desc">
        <h3 >details</h3>
       <p>{description}</p>
      </article>
      <article className="info">
    <h3>info</h3>
    <h6>price : ${price}</h6>
    <h6>size : {size} SQFT</h6>
    <h6>max capacity : {capacity} {capacity > 1 ? "people" : "person"}</h6>
    <h6>{pets ? "pets allowed" : "no pets allowed" }</h6>
    <h6>{breakfast && "free breakfast included"}</h6>
      </article>
    </div>
      </section>
      <section className="room-extras">
        <h6>extras</h6>
        <ul className="extras">
          {extras.map((item,index)=>(<li key={index}>- {item}</li>))}
        </ul>
      </section>
      </>
    
    )
    
};

export default SingleRoom;

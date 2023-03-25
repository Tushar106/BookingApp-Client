import React, { useContext } from "react";
import "./hotel.css"
import Navbar from "../../components/navbar/Navbar"
import Header from "../../components/header/header"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faArrowLeft, faArrowRight, faClose, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../components/context/SearchContext";
import { AuthContext } from "../../components/context/AuthContext";
import Reserve from "../../components/reserve/Reserve";
function Hotel() {
    const location=useLocation();
    const id=location.pathname.split("/")[2]
    const [slideNumber,setSlideNumber]=React.useState(0);
    const [open,setOpen]=React.useState(false)
    const [openModel,setModel]=React.useState(false)

    const {user}=useContext(AuthContext);
    const {data,loading,error}=useFetch(`/hotels/find/${id}`)
    const navigate=useNavigate();

    function handleOpen(i){
        // console.log(i)
        setSlideNumber(i);
        setOpen(true);
    }


    function handleClick(){
        if(user){
            setModel(true);
        }
        else{
            navigate("/login"); 
        }

    }
     
    const {date,options}=useContext(SearchContext);


    function diff(date1,date2){
        const timeDiff=Math.abs(date2.getTime()-date1.getTime());
        const diffdays=Math.ceil(timeDiff/(1000*60*60*24));
        return diffdays
    }
    const days=diff(date[0].endDate,date[0].startDate)+1;
    
    
    return (
        <div className="">
            <Navbar />
            <Header type="List" />
            <div className="hotelContainer">
            {loading?"loading":<div className="hotelWrapper ">
                 
                    {open&&
                    <div className="slider">
                        <div className="sliderWrapper">
                        <FontAwesomeIcon icon={faClose} className="close"onClick={()=>{setOpen(false)}}/>
                        <FontAwesomeIcon icon={faArrowLeft} className="arrow" onClick={()=>{
                            if(slideNumber-1===-1){
                                setSlideNumber(data.photos.length-1);
                            }
                            else
                            setSlideNumber(slideNumber-1)}}/>
                        <img className="sliderImg" src={data.photos[slideNumber]} alt="" />
                        <FontAwesomeIcon icon={faArrowRight} className="arrow" onClick={()=>{
                            if(slideNumber+1===data.photos.length){
                                setSlideNumber(0)
                            }
                            else
                            setSlideNumber(slideNumber+1)}}/>
                        </div>
                    </div>}
                    <h1 className="hotelTitle">{data.name}</h1>
                    <div className="hotelAddress">
                        <FontAwesomeIcon icon={faLocationDot} />
                        <span>{data.address}</span>
                    </div>
                    <span className="hotelDistance">
                        Excellent location -{data.distance} m from center
                    </span>
                    <span className="hotelPriceHighlight">
                        Book a stay over ${data.CheapestPrice} at this property<button>Reserve now</button>
                    </span>
                    
                    <div className=" parent">
                        {data.photos?.map((photo, index) => {
                            return (
                                <div key={index} className={"div"+index}>
                                    <img src={photo} onClick={()=>handleOpen(index)} className="hotelImg" alt="" />
                                </div>)
                        })}
                    </div>
                    <div className="hotelDetails">
                        <div className="hotelDetailsText">
                            <h1 className="hotelTitle">Stay in the heart of {data.city} ❤</h1>
                            <p className="hotelDesc">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, rem tenetur ullam delectus enim totam cumque officiis repellat, veritatis cupiditate et laborum quos modi maxime culpa ad unde ut molestias eveniet autem incidunt molestiae animi alias assumenda! Culpa natus eum esse autem, eaque voluptatibus sit! Dolore voluptatum fugiat ex ducimus.  Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, repudiandae. Modi, nesciunt! Impedit numquam saepe voluptate facilis sed officia vitae nesciunt quibusdam pariatur ex, veritatis possimus voluptas odit, deserunt unde?
                            </p>
                        </div>
                        <div className="hotelPrice">
                            <div className="card" style={{width: "18rem"}}>
                                <div className="card-body">
                                    <h5 className="card-title">Perfect for {days||1} night stay</h5>
                                    <span>
                                        Location in the heart of {data.city}, this property has excellent location score of  {data.rating||9.8}.
                                    </span>
                                    <h2><b>${data.CheapestPrice*days*options.room||data.CheapestPrice}</b>({days||1} night)</h2>
                                    <button className="priceButton"  data-bs-toggle="modal" data-bs-target="#staticBackdrop">Reserve now</button>
                                    <Reserve hotelId={id}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
            <MailList/>
            <Footer/>
            {/* {openModel && <Reserve setOpen={setModel} hotelId={data._id}/>} */}

        </div>
    )
}
export default Hotel
import React, { useContext } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBed, faCab, faCalendarDays, faPerson, faPlane, faTaxi } from '@fortawesome/free-solid-svg-icons'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { useState } from 'react'
import {useNavigate} from "react-router-dom"
import {format} from'date-fns'
import { SearchContext } from "../context/SearchContext";
import { AuthContext } from "../context/AuthContext";
import "./header.css"




function Header(props) {
    const navigate = useNavigate();
    const[destination,setDestination]=useState("")
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    const [openDate,setopenDate]=useState(false)
    // const [openOptions,setopenOptions]=useState(false)
    const [options,setOptions]=useState({
        adult:1,
        children:0,
        room:1
    })
    function handleChange(event){
        const {name,value}=event.target
        // console.log(event.target)
        setOptions((prev)=>{
            return{
                ...prev,
                [name]:value
            }
        })
    }
    function set(e){
        const value=e.target.value.toLowerCase();
        const x=value.charAt(0).toUpperCase()+value.slice(1);
        setDestination(x);
    }
    const {user}=useContext(AuthContext);


    const {dispatch}=useContext(SearchContext)
    function handleSubmit(){
        dispatch({type:"NEW_SEARCH",payload:{destination,date,options}})
        navigate("/hotels",{state:{destination,date,options}})
    }
    function login(){
        navigate("/login");
    }

    

  

    // console.log(date[0])
    return (
        <div className="header">
            <div className="headerContainer" style={{margin:props.type==="List" ? "22px": "0"}}>
                <div className="headerList">
                    <div className="headerListItem active">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Stays</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faPlane} />
                        <span>Flight</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faCab} />
                        <span>Car</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faTaxi} />
                        <span>Taxi</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Attractions</span>
                    </div>
                    
                </div>
                {props.type!=="List"&&<>
                <h1 className="headerTitle">A lifeTime of discount! Yes, it's genius.</h1>
                <p className="headerDesc">Get 10% instant discount on every booking till <u>20th Feb.</u></p>
                {!user&&<button className="headerbtn" style={{marginBottom:"10px"}} onClick={login}>Sign-in/Register</button>}
                <div className="headerSearch">
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faBed} className="headerIcon" />
                        <input type="text" name="" id="" placeholder="Where Are you Going" className="headerSearchInput" onChange={set}/>
                    </div>
                    <div className="headerSearchItem containDate">
                        
                        <span onClick={()=>setopenDate(!openDate)} className="headerSearchText"><FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />{format(date[0].startDate,"dd/MM/yyyy")}  to {format(date[0].endDate,"dd/MM/yyyy")}</span>
                        {openDate&&<DateRange
                            editableDateInputs={true}
                            onChange={item => {setDate([item.selection]);setopenDate(!openDate)}}
                            moveRangeOnFirstSelection={false}
                            ranges={date}
                            minDate={new Date()}
                            className="date"
                        />}
                    </div>
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                        <span className="headerSearchText">`Adult <input type="Number" min="0" name="adult"style={{"width":"30px"}}
                        value={options.adult}onChange={handleChange}
                        ></input>  Children-<input min="0" name="children"type="Number" style={{"width":"30px"}}
                        value={options.children} onChange={handleChange}></input> Rooms-<input name="room" min="1"type="Number" max="5" style={{"width":"30px"}}
                        value={options.room}
                        onChange={handleChange}
                        ></input>`</span>
                    </div>
                    <div className="headerSearchItem">
                        <button className="headerbtn" onClick={handleSubmit}>Search</button>
                    </div>
                </div>
                </>}
            </div>
            
        </div>
    )
}
export default Header
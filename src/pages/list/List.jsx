import React, { useState } from "react";
import Header from "../../components/header/header";
import Navbar from "../../components/navbar/Navbar";
import { useLocation } from "react-router-dom";
import "./list.css"
import { format } from 'date-fns'
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/searchItem";
import useFetch from "../../hooks/useFetch";
function List() {
    const location = useLocation();
    // console.log(location)
    const [destination, setDestination] = useState(location.state.destination)
    const [date, setDate] = useState(location.state.date)
    const [openDate, setOpenDate] = useState(false)
    const [max, setmax] = useState(undefined)
    const [min, setmin] = useState(undefined)




    const [options, setOptions] = useState(location.state.options)
    // console.log(date)

    function handleChange(e){
        const{name,value}=e.target;
        setOptions((prev)=>{
            return{
            ...prev,
            [name]:value
            }
        })
    }
    const{data , loading,error,reFetchDate}=useFetch(`/hotels?city=${destination}&min=${min||1}&max=${max||10000}`);

    function handleClick(){
        reFetchDate();
    }
    function set(e){
        const value=e.target.value.toLowerCase();
        const x=value.charAt(0).toUpperCase()+value.slice(1);
        setDestination(x);
    }




    return (<div>

        <Navbar />
        <Header type="List" />

        <div className="listContainer">
            <div className="listWrapper">
                <div className="listSearch">
                    <h1 className="lsTitle">Search</h1>
                    <div className="lsItem">
                        <label htmlFor="">Destination</label>
                        <input type="text" name="" id="" value={destination} onChange={set} />
                    </div>
                    <div className="lsItem">
                        <label htmlFor="">Check-in Date-</label>
                     <span onClick={()=>{setOpenDate(!openDate)}} >{format(date[0].startDate,"dd/MM/yyyy")} to {format(date[0].endDate,"dd/MM/yyyy")}</span>
                      {openDate && <DateRange onChange={item => setDate([item.selection])} 
                     minDate={new Date()}
                     ranges={date}
                     editableDateInputs={true}
                     moveRangeOnFirstSelection={false}/>}
                    </div>
                    
                    <div className="lsItem collapse-options">
                        <label htmlFor="">Options:-</label>
                        <div className="lsOptions">
                        <div className="lsOptionItem">
                            <span className="isOptionText">Min price <small>per night</small></span>
                            <input type="text" className="isOptionInput" onChange={(e)=>{setmin(e.target.value)}} />
                        </div>
                        <div className="lsOptionItem">
                            <span className="isOptionText">Max price <small>per night</small></span>
                            <input type="text" className="isOptionInput" onChange={(e)=>{setmax(e.target.value)}} />
                        </div>
                        <div className="lsOptionItem">
                            <span className="isOptionText">Adult:</span>
                            <input type="text" className="isOptionInput" placeholder={options.adult} value={options.adult} name="adult" onChange={handleChange}/>
                        </div>
                        <div className="lsOptionItem">
                            <span className="isOptionText">Children:</span>
                            <input type="text" className="isOptionInput" placeholder={options.children} value={options.children}name="children" onChange={handleChange}/>
                        </div>
                        <div className="lsOptionItem">
                            <span className="isOptionText">Rooms:</span>
                            <input type="text" className="isOptionInput" placeholder={options.room} value={options.room} name="room" onChange={handleChange}/>
                        </div>
                        </div>

                    </div>
                    
                    <button onClick={handleClick}>Search</button>
                </div>
                <div className="listResult">
                    {loading?"Loading":<>
                        {data.map((item)=>
                        (<SearchItem key={item._id} item={item}/>))}
                        </>
                        }
                    
                </div>
            </div>
        </div>

    </div>)
}
export default List
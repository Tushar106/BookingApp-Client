import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../context/SearchContext";
import "./reserve.css"

function Reserve({ hotelId }) {
    const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`)

    
    const [select, setSelect] = useState([]);
    const {date}=useContext(SearchContext);
    const navigate=useNavigate();

    const getDatesInRange=(startDate,endDate)=>{
        const start=new Date(startDate);
        const end=new Date(endDate)
        start.setHours(0, 0, 0, 0)
        end.setHours(0, 0, 0, 0)
        const date=new Date(start.getTime());
        let list=[];
        while(date<=endDate){
            list.push(new Date(date).getTime());
            date.setDate(date.getDate()+1);
        }
        return list
    }
    const allDates=getDatesInRange(date[0].startDate,date[0].endDate);
    const isAvailable=(roomNumber)=>{
        const isFound=roomNumber.unavailableDates.some((date)=>{
             return allDates.includes(new Date(date).getTime());
        })  
        return !isFound
    }


    const handleSelect = (e) => {

        const checked = e.target.checked
        const value = e.target.value
        setSelect(checked ? [...select, value] : select.filter(item => item !== value))
    }
    const saveChange = async(e) => {
        try {
            await Promise.all(select.map((roomId)=>{
                const res=axios.put(`/rooms/availability/${roomId}`,{dates:allDates});
                return res.data
            })
            )
            // cart bna sekte
            setTimeout(navigate("/"),2000);
              
        } catch (error) {

        }
        
    }

    return (
        <div className="reserve">
            <div className="rcontainer">
                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="staticBackdropLabel">Select your rooms:</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            {loading ? "loading" : <div className="modal-body">
                                {data.map((item,index )=> (
                                    <div className="container" key={index}>
                                        <div className="container1">
                                        <div className="rtitle">{item.title}</div>
                                        <div className="rdesc">{item.desc}</div>
                                        <div className="rmax">Max People-{item.maxPeople}</div>
                                        <div className="rprice">$
                                        {item.price}</div>
                                        </div>
                                        <div className="container2">
                                        {item.roomNumbers.map((r,i) => (
                        
                                            <div className="room"key={i}>
                                                <input type="checkbox" value={r._id} onChange={handleSelect} disabled={!isAvailable(r)} />
                                                <label htmlFor="">{r.number}</label>
                                            </div>
                                        ))}
                                        </div>
                                    </div>

                                ))}
                            </div>}
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={saveChange}>Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Reserve;


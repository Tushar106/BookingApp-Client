import React from "react";
import useFetch from "../../hooks/useFetch";
import "./featured.css"
function Featured(){

    const {data,loading,error}=useFetch("/hotels/countByCity?cities=Berlin,Banaras,Varanasi")
    

    return(
        <div className="featured">
            {loading?("please Wait"):(<><div className="featuredItem">
                <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8aG90ZWx8ZW58MHx8MHx8&w=1000&q=80" alt="" className="featuredImg" />
                <div className="featuredTitle">
                    <h1>Berlin</h1>
                    <h2>{data[0]} properties</h2>
                </div>
            </div>
            <div className="featuredItem">
                <img src="https://thumbs.dreamstime.com/b/hotel-bed-room-21064950.jpg" alt="" className="featuredImg" />
                <div className="featuredTitle">
                    <h1>Banaras</h1>
                    <h2>{data[1]} properties</h2>
                </div>
            </div>
            <div className="featuredItem">
                <img src="https://cdn.pixabay.com/photo/2021/12/11/07/59/hotel-6862159__340.jpg" alt="" className="featuredImg" />
                <div className="featuredTitle">
                    <h1>Varanasi</h1>
                    <h2>{data[2]} properties</h2>
                </div>
            </div></>)}
        </div>
    )
}
export default Featured
import React from "react";
import useFetch from "../../hooks/useFetch";
import "./property.css"

function  PropertyList() {
    const { data, loading, error } =  useFetch("/hotels/countByType")
    

    const images = [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80", "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80",
        "https://images.unsplash.com/photo-1455587734955-081b22074882?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80", "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80", "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    ]

    return (
        <div className="pList">

            {loading ? "loading" : <>
                {  data.length!==0 ?
                    images.map((img, i) => {
                        return <div className="plistItem" key={i} >
                            <img src={img} alt="" className="pListImg" />
                            <div className="pListTitles">
                                <h1>{data[i].type}</h1>
                                <h2>{data[i].count} {data[i].type}</h2>
                            </div>
                        </div>
                    }):"loading"
                }
            </>}
        </div>
    )
}
export default PropertyList
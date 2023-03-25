import React from "react";
import useFetch from "../../hooks/useFetch";
import"./featuredprop.css"
function FeaturedProp(){

    const {data,loading,error}=useFetch("/hotels?featured=true&limit=4")
    return(
        <div className="fp">
            {loading?"Loading" :<>

                {data.map((item)=>(

                    <div className="fpItem" key={item._id}>
                <img src={item.photos[0]} alt="" className="fpImg" />
                <span className="fpName">{item.name}</span><br/>
                <span className="fpCity">{item.city}</span><br/>
                <span className="fpPrice">Starting price-{item.CheapestPrice}</span><br/>
                {item.rating &&<div className="fpRating">
                    <button>{item.rating}</button>
                    <span>Excelent</span>
                </div>}
            </div>
                ))
            }
            </>}
        </div>
    )
}
export default FeaturedProp


{/* <div className="fpItem">
<img src="https://images.unsplash.com/photo-1589923158776-cb4485d99fd6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80" alt="" className="fpImg" />
<span className="fpName">Tushar</span><br/>
<span className="fpCity">Varanasi</span><br/>
<span className="fpPrice">Starting price-200rs</span><br/>
<div className="fpRating">
    <button>8.9</button>
    <span>Excelent</span>
</div>
</div>
<div className="fpItem">
<img src="https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" className="fpImg" />
<span className="fpName">Tushar</span><br/>
<span className="fpCity">Varanasi</span><br/>
<span className="fpPrice">Starting price-200rs</span><br/>
<div className="fpRating">
    <button>8.9</button>
    <span>Excelent</span>
</div>
</div>
<div className="fpItem">
<img src="https://images.unsplash.com/photo-1615460549969-36fa19521a4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" alt="" className="fpImg" />
<span className="fpName">Tushar</span><br/>
<span className="fpCity">Varanasi</span><br/>
<span className="fpPrice">Starting price-200rs</span><br/>
<div className="fpRating">
    <button>8.9</button>
    <span>Excelent</span>
</div>
</div> */}
import "./searchItem.css"
import React from "react"
import { Link } from "react-router-dom"

function SearchItem({item}) {
    return (
        <div className="card mb-3" style={{ maxWidth: "89%", margin: "auto", padding: "10px" }}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={item.photos[0]} className="img-fluid rounded-start" style={{ height: "100%" }} alt="..." />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <div className="header-Hotel">
                            <h5 className="card-title">{item.name} </h5>
                            {item.rating&&<div className="rating">
                                <p className="ratingText">Excellent</p>
                                <div className="ratingNo">{item.rating}</div>
                            </div>}
                        </div>
                        <p className="distance">{item.distance}m from center</p>
                        <button className="freeDropText">Free Airport drop</button>
                        <p className="featureTitle">Studio Appartment with Air conditioning</p>
                        <div className="otherFeatures">
                            <ul>
                            <li style={{ listStyle: "none" }}>24hr wifi</li>
                            <li>24hr wifi</li>
                            <li>24hr wifi</li>
                        </ul>
                        </div>
                        <div className="content">
                        <div className="cancel">
                        <p className="cancellationText">Free cancellation</p>
                        <p className="cancelSub">You can cancel latter , so book now</p>
                        </div>
                        <div className="siDetailTexts">
                            <span className="siPrice">${item.CheapestPrice}</span>
                            <span className="siTaxOp">Includes taxes and fees</span>
                            <Link to={`/hotels/${item._id}`}>
                            <button className="siCheckButton">See availability</button>
                            </Link>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}
export default SearchItem
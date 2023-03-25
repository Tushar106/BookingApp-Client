import React from "react";
import "./mailList.css"
function MailList(){
    return(
            <div className="mailContainer">
        <div className="mail">
            <h1 className="mailTitle">Save time,Save money!</h1>
            <span className="mailDesc">Sign up and we'll send the best deals to you.</span>
            <div className="mailInputContainer">
                <input type="text" placeholder="Your email" />
                <button className="btn btn-light">Subscribe</button>
            </div>
            </div>

        </div>
    )
}
export default MailList
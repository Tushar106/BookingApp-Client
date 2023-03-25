import React from "react";
import Featured from "../../components/featured/Featured";
import FeaturedProp from "../../components/featuredProperty/FeaturedProp";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";

import "../home/home.css"
function Home(){
    return(<div>
        <Navbar/>
        <Header/>
        <div className="homeContainer">     
            <Featured/>
            <h1 className="homeTitle">Browse by property type.</h1>
            <PropertyList/>
            <h1 className="homeTitle">Home guest Love.</h1>
            <FeaturedProp/>
            <MailList/>
            <Footer/>
        </div>

    </div>)
}
export default Home
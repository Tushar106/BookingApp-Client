import axios from "axios";
import React, { useContext, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./register.css"

function Register(){
    const {loading,dispatch}=useContext(AuthContext);
    const [credentials, setCred] = useState({
        username: undefined,
        password: undefined,
        email:undefined
    })

    const [error,setError]=useState(null);
    function handleChange(e){
        const {name,value}=e.target;
        setCred((prev)=>{
            return{
                ...prev,
                [name]:value
            }
        })
}
const navigate=useNavigate();
 const handleClick=async()=>{
    
    try {
        const res=await axios.post("/auth/register",credentials);
        navigate("/login");
    } catch (error) {
        // dispatch({type:"LOGIN_FAILURE",payload:error.response.})  
        setError(error.response.data);
    }
}
    return(<div>
        <section className="vh-100">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                className="img-fluid" alt="Sample image" />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1" style={{
                            border: "1px solid lightgrey",
                            padding: "16px",
                            borderRadius: "9px"
                        }}>
                            <form>
                                <div className="form-outline mb-4">
                                    <label className="form-label" >Enter the username</label>
                                    <input type="text" id="form3Example3" className="form-control form-control-lg"
                                        placeholder="Enter a valid Name" name="username"onChange={handleChange}  />
                                {error  &&error['username']&& <div className="error">User Already exist</div>}
                                </div>


                                <div className="form-outline mb-3">
                                    <label className="form-label" >Enter the Password</label>
                                    <input type="password"  className="form-control form-control-lg"
                                        placeholder="Enter password" name="password" onChange={handleChange}/>
                                </div>
                                <div className="form-outline mb-3">
                                    <label className="form-label" >Enter your Email</label>
                                    <input type="email"  className="form-control form-control-lg"
                                        placeholder="Enter Email" name="email" onChange={handleChange}/>
                                         {error  &&error['email']&& <div className="error">Emailx`` Already exist</div>}
                                </div>
                                <div className="text-center text-lg-start mt-4 pt-2">
                                     <button type="button" className="btn btn-primary btn-lg"
                                        style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }} onClick={handleClick}>Register</button>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                
                <div
                    className="d-flex flex-column flex-md-row text-center  justify-content-center py-4 px-4 px-xl-5 bg-primary">
                    <div className="text-white mb-3 mb-md-0">
                        Copyright © 2020. All rights reserved.
                    </div>
                </div>
            </section>
    </div>)
}
export default Register;
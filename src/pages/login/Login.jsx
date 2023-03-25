import axios, { Axios } from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/context/AuthContext";
import "./login.css"

const Login = () => {
    const [credentials, setCred] = useState({
        username: undefined,
        password: undefined
    })

    const navigate=useNavigate();

    const { loading, error, dispatch } = useContext(AuthContext);

    function handleChange(e){
            const {name,value}=e.target;
            setCred((prev)=>{
                return{
                    ...prev,
                    [name]:value
                }
            })
    }
    const handleClick=async (event)=>{
        
        dispatch({type:"LOGIN_START"});
        try {
            const res= await axios.post("/auth/login",credentials);
            dispatch({type:"LOGIN_SUCCESS",payload:res.data})
            navigate("/");
        } catch (error) {
            dispatch({type:"LOGIN_FAILURE",payload:error.response.data})  
        }
        event.preventDefault();
    }
    function register(){
        navigate("/register")
    }
    return (
        <div>
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
                                    <label className="form-label" >Username</label>
                                    <input type="text" id="form3Example3" className="form-control form-control-lg"
                                        placeholder="Enter a valid Name" name="username"onChange={handleChange}  />
                                    {error && error.meassage==="User not found" && <div className="error">{error.meassage}</div>}
                                </div>


                                <div className="form-outline mb-3">
                                    <label className="form-label" >Password</label>
                                    <input type="password" id="form3Example4" className="form-control form-control-lg"
                                        placeholder="Enter password" name="password" onChange={handleChange}/>
                                    {error && error.meassage==="Wrong Password" && <div className="error">{error.meassage}</div>}
                                </div>
                                <div className="text-center text-lg-start mt-4 pt-2">
                                    {!loading&&<button type="button" className="btn btn-primary btn-lg"
                                        style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }} onClick={handleClick}>Login</button>}
                                    
                                    <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="#!"
                                        className="link-danger" onClick={register}>Register</a></p>
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
        </div>
    )
}
export default Login
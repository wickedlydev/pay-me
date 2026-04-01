import { Button } from "../component/Button";
import { Bottomwarning } from "../component/Bottom"
import {Heading} from "../component/Heading"
import { SubHeading } from "../component/Subheading"
import { Inputbox } from "../component/Input"
import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
export const Signup = () =>{
    const[firstname,setFirstname]= useState("")
    const[lastname,setlastname]=useState("")
    const[username,setusername]=useState("")
    const[password,setpassword]=useState("")
    const [message, setMessage] = useState("")
    const navigate = useNavigate()
    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <Inputbox onChange = {(e)=>{
            setFirstname(e.target.value)
        }} placeholder="Enter your name" label={"First Name"} />
        <Inputbox  onChange = {(e)=>{
            setlastname(e.target.value)
        }}placeholder="Enter your surname" label={"Last Name"} />
        <Inputbox onChange = {(e)=>{
            setusername(e.target.value)
        }} placeholder="enter your gmail" label={"Email"} />
        <Inputbox onChange ={(e)=>{
            setpassword(e.target.value)
        }} placeholder="enter any password " 
        type="password"
        label={"Password"} />
        <div className="pt-4">
          <Button  onClick = {async()=>{
            try{
                if (!username || !firstname || !lastname || !password) {
                setMessage("All fields are required");
                return;
        }
            const response = await axios.post("https://paytm-clone-nu.vercel.app/api/v1/user/signup",{
                 username,
                 firstname,
                 lastname,
                 password
            });
            localStorage.setItem("token",response.data.token)
            setMessage("signup successful");
            setTimeout(() => navigate("/dashboard"), 1000);
            }catch(err){
                console.log(err)
                const errorMsg = err.response?.data?.message || "signup failed";
                 console.error("Signup Error:", err.response?.data);
                setMessage(errorMsg);
                
            }
          }}label={"Sign up"} />
        </div>
        {message && (
                <div className={`text-sm font-semibold p-2 rounded mt-4 text-center ${
                    message.includes("successful") 
                    ? "bg-green-100 text-green-700" 
                    : "bg-red-100 text-red-700"
                }`}>
                    {message}
                </div>
            )}
        <Bottomwarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
            </div>
        </div>
    )
}
import { Button } from "../component/Button";
import { Bottomwarning } from "../component/Bottom"
import {Heading} from "../component/Heading"
import { SubHeading } from "../component/Subheading"
import { Inputbox } from "../component/Input"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";


export const Signin = () => {
  const[username,setusername]=useState()
  const[message,setMessage]=useState()
  const[password,setpassword]=useState()
  const navigate = useNavigate()
    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <Inputbox 
        onChange={(e)=>setusername(e.target.value)}
        placeholder="enter your email" 
        label={"Email"}
         />
        <Inputbox
        onChange={(e)=>setpassword(e.target.value)}
        type = "password"
         placeholder="enter your password" 
         label = {"Password"} />
        <div className="pt-4">
          <Button onClick={async()=>{
            try{
              const respone = await axios.post("https://paytm-clone-nu.vercel.app/api/v1/user/signin",{
                username,
                password
              });
              localStorage.setItem("token",respone.data.token)
              navigate("/dashboard");
            }catch(err){
              setMessage("Invalid email or password")
            }
          }}label={"signin"}>
          </Button>
          
          
        </div>
        {message && (
          <div className="text-sm font-semibold p-2 mt-2 rounded bg-red-100 text-red-700">
                            {message}
                        </div>
        )}
        <Bottomwarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}
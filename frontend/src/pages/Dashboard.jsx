import { Appbar } from "../component/Appbar"
import { Users } from "../component/User"
import { Balance } from "../component/Balance"
import axios from "axios"
import { useEffect, useState } from "react"


export const Dashboard = () => {
    const[balance,setbalance]=useState(0)
    useEffect(()=>{
        axios.get("https://paytm-clone-nu.vercel.app/api/v1/account/balance",{
            headers:{
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then(response =>{
            setbalance(response.data.balance)
        })
        .catch(err=>{
            console.error("Error fetching balance:", err);
        })
    },[])
    return <div>
        <Appbar />
        <div className="m-8">
            <Balance value={balance.toLocaleString()} />
            <Users />
        </div>
    </div>
}
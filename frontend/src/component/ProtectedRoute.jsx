import { Navigate } from "react-router-dom";

export const ProtectRoute = ({children}) =>{
    const token = localStorage.getItem("token")
    if(!token){
        return <Navigate to = "/" />
    }
    return children
}
export const AuthRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    
    if (token) {
        return (
            <div>
                <Navigate to="/dashboard" />
                
            </div>
        )
        

        
    }
    return children;
};
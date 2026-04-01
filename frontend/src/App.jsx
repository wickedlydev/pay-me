import {BrowserRouter,Route,Routes} from "react-router-dom"
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin"
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";
import { Landing } from "./pages/Landing";
import { ProtectRoute,AuthRoute } from "./component/ProtectedRoute";
function App(){
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path = "/" element={<Landing />}></Route>

        <Route path="/signup" element={
          <AuthRoute>
          <Signup />
          </AuthRoute>
          }></Route>

        <Route path = "/signin" element={
          <AuthRoute>
          < Signin />
          </AuthRoute>
          }></Route>

         <Route path="/dashboard" element={
          <ProtectRoute>
          <Dashboard />
          </ProtectRoute>
          } />


          <Route path="/send" element={
            <ProtectRoute>
            <SendMoney />
            </ProtectRoute>
            } />
      </Routes>
      </BrowserRouter>
    </div>
  )

}
export default App
import SignUp from "./components/SignUP"
import {Routes,Route} from 'react-router-dom'
import LogIn from "./components/Login"
export default function App() {
  return (
    <>

      <Routes>
        <Route path='/signup' element={<SignUp/>} ></Route>
        <Route path='/login' element={<LogIn/>} ></Route>
      </Routes>

     
    </>
  )
}


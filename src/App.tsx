import './App.css'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Home from './pages/home/Home';
import ProtectedRoute from './utils/protectedRoutes';
import AuthRoute from './utils/AuthRoutes';


const router=createBrowserRouter(
   createRoutesFromElements(
    <Route path="/" >
      <Route element={<ProtectedRoute/>}>
           <Route index path='/' element={<Home/>}  />    
      </Route>
      <Route element={<AuthRoute/>}>
        <Route path="login" element={<SignIn/>}/>
        <Route path="signup" element={<SignUp/>}/>
      </Route> 
    </Route>
   )
)

function App({}) {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App

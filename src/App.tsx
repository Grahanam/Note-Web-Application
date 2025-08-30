import './App.css'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Home from './pages/home/Home';


const router=createBrowserRouter(
   createRoutesFromElements(
    <Route path="/" >
      <Route index element={<Home/>}/>
      <Route path="login" element={<SignIn/>}/>
      <Route path="signup" element={<SignUp/>}/>
    </Route>
   )
)

function App({}) {

  return (
    <>
      <RouterProvider router={router}/>
      {/* <div className='h-full'>
        <SignUp />
      </div> */}
    </>
  )
}

export default App

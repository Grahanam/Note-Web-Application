import { useNavigate, useNavigation } from "react-router-dom";
import Logoicon from "../../components/icons/Logoicon";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';



function Home() {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const navigate=useNavigate()
  const signOut=()=>{
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      navigate('/login')
  }
  return (
    <div className="md:flex md:h-full p-3">
      <div className="h-full p-4">
        <div className="logo flex place-items-center justify-between">
          <div className="flex place-items-center">
            <Logoicon />
            <div className="text-[20px] md:text-[24px] font-[500] md:font-[600] pl-10">
              Dashboard
            </div>
          </div>
          <div className="text-[14px] md:text-[16px] font-[500] md:font-[600] text-[#367AFF] underline" onClick={signOut}>
            Sign Out
          </div>
        </div>
        <div className="md:flex w-full md:justify-center md:items-center">
          <div className="w-full px-4">
            <div className="border-1 rounded-2xl border-gray-200 p-4 flex flex-col items-start justify-center my-12 shadow-xl ">

              <div className="text-[22px] font-[700] md:text-[32px] text-[#232323]">Welcome, User</div>

              <div className="text-[18px] md:text-[22px] font-[400] text-[#969696] py-4">Email: test@gmail.com</div>
            </div>
            
              <div className="mt-10">
                <button
                  className="w-full rounded-md bg-[#367AFF] py-2 px-4 border border-transparent text-center text-[16px] md:text-[18px] text-white font-[600] transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                >Create Note </button>
              </div>
              <div className="my-8">
                <div className="text-[20px] md:text-[25px] font-[400] text-left mb-3">Notes</div>
                <div>
                  <div className="border-1 rounded-2xl border-gray-200 p-4 flex items-start justify-between shadow-xl mb-2">
                     <h3 className="text-[16px] md:text-[20px] font-[400] ">Note 1</h3>
                     <div>
                      <DeleteOutlineOutlinedIcon/>
                     </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Home
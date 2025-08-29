import {  TextField } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import { useState } from "react"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import bgImg from '../../assets/backgroundImg.jpg'



function SignUp() {
    const [dob, setDob] = useState(null);
    return (
        <div className="md:flex md:h-full p-3">
            <div className="md:w-[40%] h-full p-4">
                <div className="logo md:h-[5%] flex justify-center place-items-center md:justify-start">
                    <div className="icon"><svg viewBox="0 0 100 100" width="32" height="32">
                        {[...Array(12)].map((_, i) => {
                            const angle = i * 30;
                            return (
                                <rect
                                    key={i}
                                    x="45"
                                    y={70}
                                    width="10"
                                    height="20"
                                    transform={`rotate(${angle} 50 50)`}
                                    fill="#367AFF"

                                />
                            );
                        })}
                    </svg></div>
                    <div className="text-[24px] font-[600]">
                        HD
                    </div>

                </div>
                <div className="md:flex w-full md:h-[95%] md:justify-center md:items-center ">
                    <div className="w-full px-4">
                    <div>
                        <div className="pt-4">
                            <div className="text-[32px] font-[700] md:text-[40px] text-[#232323]">Sign up</div>
                        </div>

                        <div className="text-[16px] md:text-[18px] font-[400] text-[#969696] py-4">Sign up to enjoy the feature of HD</div>
                    </div>
                    <div>
                        <form className="py-1">
                            <div className="pt-1 pb-3"> <TextField id="name" label="Your Name" variant="outlined" className="w-full" /></div>
                            <div className="pt-1 pb-3"><LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    className="w-full"
                                    label="Date of Birth"
                                    value={dob}
                                //   onChange={(newValue) => setDob(newValue)}
                                />
                            </LocalizationProvider></div>
                            <div className="pt-1 pb-3"><TextField id="email" label="Email" variant="outlined" className="w-full" /></div>

                            <div className="pt-1 pb-3">
                                {/* <button className="bg-[#367AFF] p-3">Get OTP</button> */}
                                <button className="w-full rounded-md bg-[#367AFF] py-2 px-4 border border-transparent text-center text-[16px] md:text-[18px]  text-white font-[600] transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                                    Get OTP
                                </button>
                            </div>

                        </form>
                        <div>
                            <span className="text-[14px] md:text-[18px] font-[400]">Already have a account? </span> 
                            <span className="text-[14px] md:text-[18px]  font-[400] text-[#367AFF]">sign in</span> 
                        </div>

                    </div>
                    </div>
                </div>
            </div>
            <div className="hidden md:flex md:w-[60%] md:h-full"  >
                <div className="w-full h-full bg-cover bg-center rounded-xl" style={{backgroundImage:`url(${bgImg})`}}>
                   
                </div>
            </div>
        </div>
    )
}


export default SignUp
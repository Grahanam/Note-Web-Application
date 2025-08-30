import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material"

import { useState } from "react"

import bgImg from '../../assets/backgroundImg.jpg'
import Logoicon from "../../components/icons/Logoicon";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";



function SignIn() {
    const [dob, setDob] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };



    return (
        <div className="md:flex md:h-full p-3">
            <div className="md:w-[40%] h-full p-4">
                <div className="logo md:h-[5%] flex justify-center place-items-center md:justify-start">
                    <Logoicon />
                    <div className="text-[24px] font-[600]">
                        HD
                    </div>
                </div>
                <div className="md:flex w-full md:h-[95%] md:justify-center md:items-center ">
                    <div className="w-full px-4">
                        <div>
                            <div className="pt-4">
                                <div className="text-[32px] font-[700] md:text-[40px] text-[#232323]">Sign In</div>
                            </div>

                            <div className="text-[16px] md:text-[18px] font-[400] text-[#969696] py-4">Please login to continue to your account.</div>
                        </div>
                        <div>
                            <form className="py-1">

                                <div className="pt-1 pb-3"><TextField
                                    // sx={{
                                    //     "& .MuiOutlinedInput-root": {
                                    //         borderRadius: "1rem", // rounded-2xl (~16px)

                                    //     },
                                    // }} 
                                    id="email" label="Email" variant="outlined" className="w-full" /></div>
                                <div className="pt-1 pb-3">
                                    <FormControl className="w-full" variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-password">OTP</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            type={showPassword ? 'text' : 'password'}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label={showPassword ? 'hide the password' : 'display the password'}
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="OTP"
                                        />
                                    </FormControl>
                                </div>
                                <div className="pt-1 pb-3">
                                    <button className="w-full rounded-md bg-[#367AFF] py-2 px-4 border border-transparent text-center text-[16px] md:text-[18px]  text-white font-[600] transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                                        Get OTP
                                    </button>
                                </div>
                            </form>
                            <div>
                                <span className="text-[14px] md:text-[18px] font-[400]">Need an account? </span>
                                <span className="text-[14px] md:text-[18px]  font-[400] text-[#367AFF]"><Link to='/signup'>Create one</Link> </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden md:flex md:w-[60%] md:h-full">
                <div className="w-full h-full bg-cover bg-center rounded-xl" style={{ backgroundImage: `url(${bgImg})` }}>
                </div>
            </div>
        </div>
    )
}


export default SignIn
import { useState, type FC } from "react";
import { Link, useNavigate } from "react-router";
import authStore from "../stores/auth.store";


const Navbar: FC = () => {
    const navigate = useNavigate()



    return (
        <>
            <div className="flex flex-row h-[104px] justify-between pt-[20px] pr-[32px] pb-[20px] pl-[32px] items-center">

                {authStore.user ? (
                    <div className="flex w-[347px] h-[64px] gap-[32px]">
                        <Link to="/">
                            <div className="w-[64px] h-[64px] gap-[32px]">
                                <img className="w-[64px] h-[64px]" src="logotypes/logo.png" alt="Logotip" />
                            </div>
                        </Link>
                        <div className="flex w-[251px] h-[64px] rounded-[32px] p-[4px] gap-[8px]">
                            <div className="flex w-[126px] h-[56px] rounded-[32px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[4px] justify-center items-center">
                                <img className="w-[24px] h-[24px]" src="icons/Home.svg" alt="Home" />
                                <p className="font-[400] text-[16px] leading-[120%]">Auctions</p>
                            </div>
                            <div className="flex w-[109px] h-[56px] rounded-[32px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[4px] bg-[#272D2D] justify-center items-center">
                                <div className="flex h-[24px] w-[24px] items-center justify-center text-center">
                                    <img className="" src="icons/Person.svg" alt="Person" />
                                </div>
                                <p className="text-white font-[400] text-[16px] leading-[120%]">Profile</p>
                            </div>
                        </div>
                    </div>

                    

                ) : (
                    <>
                     <div className="flex flex-row gap-[8px] h-[40px] w-[172px] items-center">
                        <Link to="/login">
                            <p className="font-bold">Log in</p>
                        </Link>
                        <p> or </p>
                        <Link to="/signin">
                            <button className="rounded-[16px] bg-[#272D2D] text-white py-2 px-4">Sign Up</button>
                        </Link>
                    </div>
                    </>     
                )}
            </div>
        </>
    )
}

export default Navbar
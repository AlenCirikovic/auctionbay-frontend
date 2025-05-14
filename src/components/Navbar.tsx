import type { FC } from "react";
import { Link} from "react-router";


const Navbar: FC = () => {
    
    return (
        <>
            <div className="flex flex-row h-[104px] justify-between pt-[20px] pr-[32px] pb-[20px] pl-[32px] items-center">
                <div>
                    <Link to="/">
                        <div className="w-[64px] h-[64px] gap-[32px]">
                            <img className="w-[64px] h-[64px]" src="logotypes/logo.png" alt="Logotip" />
                        </div>
                    </Link>
                </div>
                <div className="flex flex-row gap-[8px] h-[40px] w-[172px] items-center">
                    <Link to="/login">
                        <p className="font-bold">Log in</p>
                    </Link>
                    <p> or </p>
                    <Link to="/signin">
                        <button className="rounded-[16px] bg-[#272D2D] text-white py-2 px-4">Sign Up</button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Navbar
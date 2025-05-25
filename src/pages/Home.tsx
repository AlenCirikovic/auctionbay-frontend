import type { FC } from "react";
import { Link } from "react-router";

const Home: FC = () => {
    return (
        <>
            <div className="flex flex-col w-full h-full justify-center items-center text-center p-[32px] gap-[32px]">

                <div className="flex flex-col justify-center items-center text-center w-[715px] h-[133px] gap-[8px]">
                    <h1 className="text-[64px] font-bold leading-[120%]">E-auctions made easy!</h1>
                    <p className="font-light leading-[24px] text-[16px] text-center">Simple way for selling your unused products, or getting a deal on product you want!</p>
                </div>


                <Link to='signin'>
                    <button className="rounded-[16px] bg-[#F4FF47] font-medium text-[#071015] pt-[8px] pl-[16px] pr-[16px] pb-[8px] py-2 px-4 gap-[8px]">Start bidding</button>
                </Link>

                <div className="w-[1144px] h-[812.39px] rounded-[32px] border-[#272D2D] border-[8px]">
                    <img className="h-fit w-fit rounded-[32px]" src="images/Auctions.png" alt="Auctions iamge" />
                </div>

            </div>
        </>
    )
}


export default Home
import { useEffect, useState } from "react"
import authStore from "../stores/auth.store"
import axios from "axios"


const Auctions = () => {
    const [value, setValue] = useState(0)
       
    
    
    return (
        <>
            <div className="w-full h-fit pr-[32px] pl-[32px] gap-[8px]">
                <h1 className="font-bold text-[32px] leading-[120%]">Hello {`${authStore.user?.name}  ${authStore.user?.surname}`} !</h1>
            </div>
            
            <div  className="flex w-fill h-fit justify-center pr-[32px] pl-[32px]">
                <div className="w-fit h-fit rounded-[16px] p-[4px] gap-[8px] bg-[#EDF4F2]">
                    <button onClick={() => {setValue(1)}} className={`${value === 1 ? 'w-[126px] h-fit min-h-[40px] rounded-[16px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[8px] bg-[#272D2D] text-white' : 'w-[126px] h-fit min-h-[40px] rounded-[16px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[8px] bg-[#EDF4F2]'}`}>
                        <p className="font-medium text-[16px] leading-[24px]">My auctions</p>
                    </button>
                    <button onClick={() => {setValue(2)}} className={`${value === 2 ? 'w-[126px] h-fit min-h-[40px] rounded-[16px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[8px] bg-[#272D2D] text-white' : 'w-[126px] h-fit min-h-[40px] rounded-[16px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[8px] bg-[#EDF4F2]'}`}>
                        <p className="font-medium text-[16px] leading-[24px]">Bidding</p>
                    </button>
                    <button onClick={() => {setValue(3)}} className={`${value === 3 ? 'w-[126px] h-fit min-h-[40px] rounded-[16px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[8px] bg-[#272D2D] text-white' : 'w-[126px] h-fit min-h-[40px] rounded-[16px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[8px] bg-[#EDF4F2]'}`}>
                        <p className="font-medium text-[16px] leading-[24px]">Won</p>
                    </button>
                </div>
            </div>
        </>

    )
}

export default Auctions
import axios from "axios"
import type { AuctionType } from "../../models/auction"
import type { BidType } from "../../models/bid"
import { useState } from "react"

type AuctionDetailProps = {
    tag: string
    time_left: string
    auction: AuctionType | null
}


const AuctionDetail = ({ tag, time_left, auction}: AuctionDetailProps) => {
    const [bid, setBid] = useState<BidType | null>()

    const handleSubmit = async (data: BidType) => {
        const response = await axios.post(`http://localhost:3000/bid/auctions/${auction?.id}/bid`,data)
        setBid(response.data)

        console.log(response.data)
    }




    return (
        <div className="w-full h-full pr-[32px] pb-[32px] pl-[32px] gap-[8px]">
            <div className="flex w-full h-full gap-[16px]">
                <img className="w-[680px] h-[888px] rounded-[16px]" src={`http://localhost:3000/files/${auction?.image}`} alt="Auction Image" />
                <div className="flex flex-col w-full h-full">
                    <div className="w-full h-fit rounded-[16px] p-[16px] gap-[16px]">
                        <div className="flex flex-col w-full h-fit gap-[16px]">

                            <div className="flex justify-between w-full h-fit">
                                <span className="text-xs font-medium px-2 py-1 bg-gray-200 rounded-full">
                                    {tag}
                                </span>
                                <span className="text-xs font-light text-gray-600">
                                    {time_left}
                                </span>
                            </div>

                            <h1 className="font-bold text-[32px] leading-[120%]">{auction?.title}</h1>
                            <p className="font-light text-[16px] leading-[24px]">{auction?.description}</p>

                            <div className="flex justify-end items-center w-full h-[41px] gap-[8px]">
                                {/* <form onSubmit={handleSubmit}>
                                    <label className="font-light text-[16px] leading-[24px]" htmlFor="bid_offer">Bid:</label>
                                    <input className="w-[83px] h-[40px] gap-[8px]" name="bid_offer" type="text" />
                                    <button className="w-fit h-fit min-h-[40px] rounded-[16px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[8px] bg-[#F4FF47]">
                                        <p className="font-medium text-[16px] leading-[24px]">Place bid</p>
                                    </button>
                                </form> */}

                            </div>

                        </div>

                    </div>
                        <div className="flex flex-col w-full h-full rounded-[16px] p-[16px] gap-[16px]">
                            <div className="flex justify-start items-center w-fill h-fit gap-[16px]">
                                <h1 className="w-full h-fit font-bold text-[23px] leading-[120%]">Bidding history ()</h1>
                            </div>

                        </div>

                </div>
            </div>
        </div>
    )
}

export default AuctionDetail
import axios from "axios"
import type { AuctionType } from "../../models/auction"
import type { BidType } from "../../models/bid"
import { useState } from "react"
import { useBidForm, type BidFormFields } from "../../hooks/react-hook-form/useBid"
import authStore from "../../stores/auth.store"
import { Controller } from "react-hook-form"

type AuctionDetailProps = {
    tag: string
    time_left: number
    auction: AuctionType | null
}



const AuctionDetail = ({ tag, time_left, auction }: AuctionDetailProps) => {
    const { handleSubmit, errors, control } = useBidForm()
    const [apiError, setApiError] = useState('')
    const [showError, setShowError] = useState(false)
    const [bid, setBid] = useState<BidType | null>()


    const onSubmit = async (data: BidFormFields) => {
        try {
            const response = await axios.post(`http://localhost:3000/bid/auctions/${auction?.id}/bid`, data, {
                withCredentials: true
            })
            if (response.data?.statusCode === 400) {
                setApiError(response.data.message)
                setShowError(true)
            } else if (response.data?.statusCode === 500) {
                setApiError(response.data.message)
                setShowError(true)
            } else {
                setBid(response.data)
                console.log(bid)
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setApiError(error.response?.data?.message || 'Login failed')
                setShowError(true)
            } else {
                setApiError('An unexpected error occurred')
                setShowError(true)
            }
        }
    }




    return (
        <div className="w-full h-full pr-[32px] pb-[32px] pl-[32px] gap-[8px]">
            <div className="flex w-full h-full gap-[16px]">
                <img className="w-[680px] h-[888px] rounded-[16px]" src={`http://localhost:3000/files/${auction?.image}`} alt="Auction Image" />
                <div className="flex flex-col w-full h-full">
                    <div className="w-full h-fit rounded-[16px] p-[16px] gap-[16px]">
                        <div className="flex flex-col w-full h-fit gap-[16px]">

                            <div className="flex items-center justify-between w-full h-fit">
                                {time_left <= 0 ? (
                                    <>
                                        <span className="w-fit h-fit font-light text-[10px] leading-[12px] text-white bg-[#272D2D] rounded-[8px] pt-[2px] pr-[4px] pb-[2px] pl-[4px] gap-[8px]">
                                            {tag}
                                        </span>
                                    </>
                                ) : (
                                    <>

                                        <div className={`w-fit h-fit rounded-[16px] pt-[2px] pr-[8px] pb-[2px] pl-[8px] gap-[8px] ${tag === "Outbid" ? 'bg-[#FFAA98]' : tag === "Winning" ? 'bg-[#ADFF90]' : 'bg-[#F9FF90]'}`}>
                                            <p className="font-light text-[16px] leading-[24px]">{tag}</p>
                                        </div>

                                        <div className={`flex items-center justify-between w-fit h-fit rounded-[16px] pt-[2px] pr-[8px] pb-[2px] pl-[8px] gap-[4px] ${time_left <= 24 ? ' bg-[#FFAA98]' : 'bg-white'} `}>
                                            <p className="font-light text-[16px] leading-[24px]">{time_left}h</p>
                                            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.62 3.87512C8.035 3.29012 7.27 2.99512 6.5 2.99512V5.99512L4.38 8.11512C5.55 9.28512 7.45 9.28512 8.625 8.11512C9.795 6.94512 9.795 5.04512 8.62 3.87512ZM6.5 0.995117C3.74 0.995117 1.5 3.23512 1.5 5.99512C1.5 8.75512 3.74 10.9951 6.5 10.9951C9.26 10.9951 11.5 8.75512 11.5 5.99512C11.5 3.23512 9.26 0.995117 6.5 0.995117ZM6.5 9.99512C4.29 9.99512 2.5 8.20512 2.5 5.99512C2.5 3.78512 4.29 1.99512 6.5 1.99512C8.71 1.99512 10.5 3.78512 10.5 5.99512C10.5 8.20512 8.71 9.99512 6.5 9.99512Z" fill="#071015" />
                                            </svg>
                                        </div>
                                    </>
                                )}
                            </div>

                            <h1 className="font-bold text-[32px] leading-[120%]">{auction?.title}</h1>
                            <p className="font-light text-[16px] leading-[24px]">{auction?.description}</p>

                            <div className="flex justify-end items-center w-full h-[41px] gap-[8px]">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <label className="font-light text-[16px] leading-[24px]" htmlFor="offer">Bid:</label>
                                    <Controller
                                        name='offer'
                                        control={control}
                                        render={({ field }) => (
                                            <input {...field} className="w-[83px] h-[40px] min-h-[40px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[8px] rounded-[16px] border border-[#DDE9E6]" name="offer" type="number" />
                                        )}

                                    />
                                    {errors.offer && <p className="text-red-500 text-xs">{errors.offer.message}</p>}
                                    <button type="submit" className="w-fit h-fit min-h-[40px] rounded-[16px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[8px] bg-[#F4FF47]">
                                        <p className="font-medium text-[16px] leading-[24px]">Place bid</p>
                                    </button>
                                </form>

                            </div>

                        </div>

                    </div>
                    <div className="flex flex-col w-full h-full rounded-[16px] p-[16px] gap-[16px]">
                        <div className="flex justify-start items-center w-fill h-fit gap-[16px]">
                            <h1 className="w-full h-fit font-bold text-[23px] leading-[120%]">Bidding history ({auction?.bids.length})</h1>
                        </div>

                        <div className="flex flex-col w-full h-fit">
                            {auction?.bids && auction.bids.length > 0 ? (
                                auction.bids.map((bid) => (
                                    <div key={bid.id} className="flex items-center w-full h-hug border-b border-[#EDF4F2] pt-[8px] pb-[8px] gap-[32px]">
                                        <div className="flex w-full h-fit gap-[16px]">
                                            <img
                                                className="w-[32px] h-[32px] rounded-[100px]"
                                                src={`http://localhost:3000/files/${bid.author.avatar}`}
                                                alt="user_avatar"
                                            />
                                            <p className="font-light text-[16px] leading-[24px]">{`${bid.author.name} ${bid.author.surname}`}</p>
                                        </div>
                                        <p className="font-light text-[16px] leading-[24px]">{new Date(bid.published_on).toLocaleString()}</p>
                                        <div className="flex h-fit w-fit rounded-[16px] pt-[6px] pr-[16px] pb-[6px] pl-[16px] gap-[4px] bg-[#F4FF47]">
                                            <p className="font-semibold text-[16px] leading-[120%]">{bid.offer}</p>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12.5 15.4167C10.4083 15.4167 8.6 14.2333 7.7 12.5H12.5V10.8333H7.15C7.10833 10.5583 7.08333 10.2833 7.08333 10C7.08333 9.71667 7.10833 9.44167 7.15 9.16667H12.5V7.5H7.7C8.6 5.76667 10.4167 4.58333 12.5 4.58333C13.8417 4.58333 15.075 5.075 16.025 5.89167L17.5 4.41667C16.175 3.225 14.4167 2.5 12.5 2.5C9.23333 2.5 6.46667 4.59167 5.43333 7.5H2.5V9.16667H5.05C5.01667 9.44167 5 9.71667 5 10C5 10.2833 5.01667 10.5583 5.05 10.8333H2.5V12.5H5.43333C6.46667 15.4083 9.23333 17.5 12.5 17.5C14.425 17.5 16.175 16.775 17.5 15.5833L16.0167 14.1083C15.075 14.925 13.85 15.4167 12.5 15.4167Z" fill="black" />
                                            </svg>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col justify-center items-center w-full h-[513px] text-center gap-[8px]">
                                    <div className="">
                                        <h1 className="font-semibold text-[18px] leading-[120%]">No bids yet!</h1>
                                        <p className="font-light text-[16px] leading-[24px] text-[#74817F]">Place your bid to have a chance to get this item.</p>
                                    </div>
                                </div>
                            )}
                        </div>


                    </div>

                </div>
            </div>
        </div>
    )
}

export default AuctionDetail
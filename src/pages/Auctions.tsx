import { useEffect, useState } from "react"
import authStore from "../stores/auth.store"
import axios from "axios"
import { useNavigate } from "react-router"
import type { AuctionType } from "../models/auction"
import AuctionCard from "../components/cards/AuctionCard"


const Auctions = () => {

    const navigate = useNavigate()
    const [value, setValue] = useState(0)
    const [tag, setTag] = useState('')
    const [ac, setAc] = useState<AuctionType[]>([]);

    const getHoursLeft = (endDate: Date) => {
        const now = new Date()
        const end = new Date(endDate)
        const diffMs = end.getTime() - now.getTime()
        const diffHours = Math.ceil(diffMs / (1000 * 60 * 60))
        return Math.max(diffHours, 0) // Avoid negative time
    }

    const getAuctionStatus = (auction: AuctionType): 'Done' | 'In Progress' | 'Winning' | 'Outbid' => {
        const myId = authStore.user?.id;
        const now = new Date();
        const isDone = new Date(auction.end_date) <= now;

        if (isDone) return 'Done';

        const hasBids = auction.bids.length > 0;

        if (!hasBids) return 'In Progress';


        const myHighestBid = Math.max(
            ...auction.bids
                .filter(bid => bid.authorId === myId)
                .map(bid => bid.offer),
            -Infinity
        );


        const highestOverall = Math.max(...auction.bids.map(bid => bid.offer));
        return myHighestBid >= highestOverall ? 'Winning' : 'Outbid';
    };



    useEffect(() => {
        const fetchAuctions = async () => {
            try {
                const res = await axios.get('http://localhost:3000/auction/others', {
                    withCredentials: true
                });

                setAc(res.data);



                console.log(res.data)
            } catch (error) {
                console.error("Failed to fetch auctions:", error);
            }
        };

        fetchAuctions();
    }, []);

    return (
        <>
            <div className="flex flex-col w-full h-full pt-[16px] gap-[16px]">
                <div className="flex justify-start items-center w-full h-fit pr-[32px] pl-[32px] gap-[8px]">
                    <h1 className="font-bold text-[32px] leading-[120%]">Auctions</h1>
                </div>
                {ac.length <= 0 ? (
                    <>
                        <div className="flex flex-col justify-center items-center w-fit h-fit gap-[8px]">
                            <h1 className="font-bold text-[26px] leading-[120%]">Oh no, no auctions yet!</h1>
                            <p className="font-light text-[16px] text-center leading-[24px]">
                                To add new auction click "+" button in the navigation bar or wait for other users to add new auctions
                            </p>

                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex w-full h-fit pr-[32px] pb-[32px] pl-[32px] gap-[16px]">
                            {ac.map(auction => {
                                const hoursLeft = getHoursLeft(auction.end_date)
                                const tag = getAuctionStatus(auction)
                                return (
                                    <AuctionCard
                                        onDelete={() => null}
                                        onEdit={() => null}
                                        key={auction.id}
                                        onClickNavigate={() => navigate(`/auction/${auction.id}`)}
                                        auction={auction}
                                        tag={tag}
                                        timeLeft={hoursLeft}
                                    />
                                )
                            })}
                        </div>
                    </>
                )}

            </div>
        </>
    )
}

export default Auctions
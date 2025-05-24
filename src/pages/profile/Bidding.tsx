import { useEffect, useState } from "react";
import type { AuctionType } from "../../models/auction";
import { useNavigate } from "react-router";
import authStore from "../../stores/auth.store";
import axios from "axios";
import AuctionCard from "../../components/cards/AuctionCard";

const Bidding = () => {
    const [ac, setAc] = useState<AuctionType[]>([]);
    const navigate = useNavigate()

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
        const fetchWonAuctions = async () => {
            try {
                const res = await axios.get('http://localhost:3000/auction/bidded', {
                    withCredentials: true,
                });

                setAc(res.data);
            } catch (error) {
                console.error("Failed to fetch won auctions:", error);
            }
        };

        fetchWonAuctions();
    }, []);


    return (
        <>
            {ac.length <= 0 ? (
                <>
                    <div className="flex justify-center items-center w-full h-[786px] pr-[32px] pb-[32px] pl-[32px] gap-[16px]">
                        <div className="flex flex-col text-center justify-center items-center w-[295px] h-[87px] gap-[8px]">
                            <h1 className="font-bold text-[26px] leading-[120%]">No bidding in progress!</h1>
                            <p className="text-[#74817F] font-light text-[16px] text-center leading-[24px]">
                                Start bidding by finding new items you like on "Auctions" page!
                            </p>

                        </div>
                    </div>

                </>
            ) : (
                <>
                    <div className="flex w-full h-full pr-[32px] pb-[32px] pl-[32px] gap-[16px]">
                        {ac.map(auction => {
                            const hoursLeft = getHoursLeft(auction.end_date)
                            const tag = getAuctionStatus(auction)
                            return (
                                <AuctionCard
                                    onDelete={()=>null}
                                    onEdit={()=>null}
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
        </>
    )
}

export default Bidding
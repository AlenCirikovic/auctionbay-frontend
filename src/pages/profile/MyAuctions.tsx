import { useEffect, useState } from "react"
import authStore from "../../stores/auth.store"
import AuctionCard from "../../components/cards/AuctionCard"
import axios from "axios"
import type { AuctionType } from "../../models/auction"
import { useNavigate } from "react-router"

const MyAuctions = () => {

    const navigate = useNavigate()

    // function getAuctionTag(auction: AuctionType, currentUserId: string) {
    //     const isAuthor = auction.authorId === currentUserId;
    //     const now = new Date();
    //     const hasEnded = new Date(auction.end_date) < now;

    //     if (hasEnded) return 'Done';
    //     if (isAuthor) return 'In Progress';

    //     const sortedBids = [...auction.bids].sort((a, b) => b.offer - a.offer);
    //     const userBidIndex = sortedBids.findIndex(bid => bid.authorId === currentUserId);

    //     if (userBidIndex === -1) return 'In Progress';
    //     return userBidIndex === 0 ? 'Winning' : 'Outbid';
    // }
 
    const [value, setValue] = useState(0)
    const [ac, setAc] = useState<AuctionType[]>([]);

    const handleOnClick = () => {
        navigate('/auction_detail')
    }


    useEffect(() => {
    const fetchAuctions = async () => {
        try {
            const res = await axios.get('http://localhost:3000/auction/me', {
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
            <div className="w-full h-full pr-[32px] pb-[32px] pl-[32px] gap-[16px]">
                {ac.map(auction => (
                    <AuctionCard onClickNavigate={() => navigate(`/auction/${auction.id}`)} auction={auction} tag={'In progress'} timeLeft={4} />

                ))}
            </div>
        </>

    )
}

export default MyAuctions
import { useEffect, useState } from "react"
import authStore from "../../stores/auth.store"
import AuctionCard from "../../components/cards/AuctionCard"
import axios from "axios"
import type { AuctionType } from "../../models/auction"
import { useNavigate } from "react-router"
import EditAuction from "../../components/popups/auction_modals/EditAuction"

const MyAuctions = () => {

    const navigate = useNavigate()
    const [ac, setAc] = useState<AuctionType[]>([]);
    const [showEditAuction, setShowEditAuction] = useState(false)
    const [selectedAuction, setSelectedAuction] = useState<AuctionType | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const getHoursLeft = (endDate: Date) => {
        const now = new Date()
        const end = new Date(endDate)
        const diffMs = end.getTime() - now.getTime()
        const diffHours = Math.ceil(diffMs / (1000 * 60 * 60))
        return Math.max(diffHours, 0)
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

    const fetchAuctions = async () => {
        try {
            setIsLoading(true)
            const res = await axios.get('http://localhost:3000/auction/me', {
                withCredentials: true
            });
            setAc(res.data);
            console.log(res.data)
        } catch (error) {
            console.error("Failed to fetch auctions:", error);
            setError("Failed to fetch auctions")
        } finally {
            setIsLoading(false)
        }
    };

    const handleEditAuction = (auction: AuctionType) => {
        setSelectedAuction(auction)
        setShowEditAuction(true)
    }

    const handleDeleteAuction = async (auctionId: string, auctionTitle: string) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete the auction "${auctionTitle}"? This action cannot be undone.`
        );

        if (!confirmed) return;

        try {
            setIsLoading(true)
            await axios.delete(`http://localhost:3000/auction/${auctionId}/force`, {
                withCredentials: true
            });

            setAc(prevAuctions => prevAuctions.filter(auction => auction.id !== auctionId));

            console.log('Auction deleted successfully');
        } catch (error) {
            console.error("Failed to delete auction:", error);
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.message || 'Failed to delete auction';
                setError(errorMessage);
                alert(`Error: ${errorMessage}`);
            } else {
                setError('An unexpected error occurred');
                alert('An unexpected error occurred while deleting the auction');
            }
        } finally {
            setIsLoading(false)
        }
    }

    const handleCloseEditModal = () => {
        setShowEditAuction(false)
        setSelectedAuction(null)
    }

    const handleAuctionUpdated = () => {
        fetchAuctions()
    }

    useEffect(() => {
        fetchAuctions();
    }, []);


    return (
        <>
            {ac.length <= 0 ? (
                <>
                    <div className="flex justify-center items-center w-full h-[786px] pr-[32px] pb-[32px] pl-[32px] gap-[16px]">
                        <div className="flex flex-col text-center justify-center items-center w-[331px] h-[111px] gap-[8px]">
                            <h1 className="font-bold text-[26px] leading-[120%]">Oh no, no auctions yet!</h1>
                            <p className="text-[#74817F] font-light text-[16px] text-center leading-[24px]">
                                To add new auction click "+" button in the navigation bar or wait for other users to add new auctions
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
                                    onDelete={() => handleDeleteAuction(auction.id, auction.title)}
                                    onEdit={() => handleEditAuction(auction)}
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
            {showEditAuction && selectedAuction && (
                <div
                    className="fixed inset-0 flex items-center justify-center z-50"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
                >
                    <EditAuction
                        onClose={handleCloseEditModal}
                        onAuctionUpdated={handleAuctionUpdated}
                        auction={selectedAuction}
                    />
                </div>
            )}
        </>

    )
}

export default MyAuctions
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import type { AuctionType } from '../models/auction'
import AuctionDetail from '../components/cards/AuctionDetail'
import axios from 'axios'
import authStore from '../stores/auth.store'

function AuctionPage() {
  const { id } = useParams<{ id: string }>()
  const [auction, setAuction] = useState<AuctionType | null>(null)


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

    if (!myId) return 'In Progress';

    const myHighestBid = Math.max(
      ...auction.bids
        .filter(bid => bid.authorId === myId)
        .map(bid => bid.offer),
      -Infinity
    );

    if (myHighestBid === -Infinity) return 'In Progress';

    const highestOverall = Math.max(...auction.bids.map(bid => bid.offer));
    return myHighestBid >= highestOverall ? 'Winning' : 'Outbid';
  };

  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/auction/${id}`)
        setAuction(res.data)
      } catch (error) {
        console.error("Failed to load auction:", error)
      }
    }

    if (id) {
      fetchAuction()
    }
  }, [id])

return (
  <>
    {auction ? (
      <AuctionDetail
        tag={getAuctionStatus(auction)}
        time_left={auction.end_date ? getHoursLeft(auction.end_date) : 0}
        auction={auction}
      />
    ) : (
      <p>Loading...</p>
    )}
  </>
)
}

export default AuctionPage
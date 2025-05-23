import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import type { AuctionType } from '../models/auction'
import AuctionDetail from '../components/cards/AuctionDetail'
import axios from 'axios'

function AuctionPage() {
      const { id } = useParams<{ id: string }>()
      const [auction, setAuction] = useState<AuctionType | null>(null)

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
    <AuctionDetail
    tag={"bla"}
    time_left='bla'
    auction={auction}
    />
  )
}

export default AuctionPage
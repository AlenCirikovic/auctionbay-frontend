import type { AuctionType } from "./auction"
import type { UserType } from "./auth"

export type BidType = {
    id:string
    offer: number
    published_on: Date
    authorId: string
    auctionId: string
    author: UserType
    auction: AuctionType
}
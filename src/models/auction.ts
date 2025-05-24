import type { UserType } from "./auth"
import type { BidType } from "./bid"

export type AuctionType = {
    id: string
    title: string
    description: string
    image: string
    starting_price: number
    published_on: Date
    end_date: Date
    active: boolean
    authorId: string
    author: UserType
    bids: BidType[]   

}
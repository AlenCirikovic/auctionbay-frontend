import type { AuctionType } from "../../models/auction"
import authStore from "../../stores/auth.store"

type AuctionCardType = {
    auction: AuctionType
    tag: string
    timeLeft: number
    onClickNavigate: () => void
    onEdit: () => void
    onDelete: () => void
}

const AuctionCard = ({ onClickNavigate, auction, tag, timeLeft, onEdit, onDelete }: AuctionCardType) => {
    
    const handleEditClick = (e: React.MouseEvent) => {
        e.stopPropagation(); 
        onEdit();
    };

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation(); 
        onDelete();
    };

    return (
        <>
            {
                authStore.user && auction.author.id === authStore.user.id && auction.bids.length <= 0 ? (
                    <>
                        <div onClick={onClickNavigate} className="flex flex-col h-[298px] w-[216px] min-h-[250px] min-w-[216px] bg-[#FFFFFF] top-[17px] left-[200px] rounded-[16px] cursor-pointer">
                            <div className="flex flex-col w-full h-fit pt-[8px] pr-[8px] pb-[4px] pl-[8px] gap-[8px]">
                                <div className="flex justify-between items-center w-full h-fit gap-[8px]">
                                    {timeLeft <= 0 ? (
                                        <>
                                            <span className="w-fit h-fit font-light text-[10px] leading-[12px] text-white bg-[#272D2D] rounded-[8px] pt-[2px] pr-[4px] pb-[2px] pl-[4px] gap-[8px]">
                                                {tag}
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <div className={`w-fit h-fit rounded-[8px] pt-[2px] pr-[4px] pb-[2px] pl-[4px] gap-[8px] ${tag === "Outbid" ? 'bg-[#FFAA98]' : tag === "Winning" ? 'bg-[#ADFF90]' : 'bg-[#F9FF90]'}`}>
                                                <p className="font-light text-[10px] leading-[12px]">{tag}</p>
                                            </div>

                                            <div className={`flex items-center justify-between w-fit h-fit ${timeLeft <= 24 ? 'rounded-[8px] pt-[2px] pr-[4px] pb-[2px] pl-[4px] gap-[4px] bg-[#FFAA98]' : 'rounded-[8px] pt-[2px] pr-[4px] pb-[2px] pl-[4px] gap-[4px]'} `}>
                                                <p className="font-light text-[10px] leading-[12px]">{timeLeft}h</p>
                                                <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M8.62 3.87512C8.035 3.29012 7.27 2.99512 6.5 2.99512V5.99512L4.38 8.11512C5.55 9.28512 7.45 9.28512 8.625 8.11512C9.795 6.94512 9.795 5.04512 8.62 3.87512ZM6.5 0.995117C3.74 0.995117 1.5 3.23512 1.5 5.99512C1.5 8.75512 3.74 10.9951 6.5 10.9951C9.26 10.9951 11.5 8.75512 11.5 5.99512C11.5 3.23512 9.26 0.995117 6.5 0.995117ZM6.5 9.99512C4.29 9.99512 2.5 8.20512 2.5 5.99512C2.5 3.78512 4.29 1.99512 6.5 1.99512C8.71 1.99512 10.5 3.78512 10.5 5.99512C10.5 8.20512 8.71 9.99512 6.5 9.99512Z" fill="#071015" />
                                                </svg>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className="flex w-full h-fit">
                                    <p className="font-light text-[16px] leading-[24px]">{auction.title}</p>
                                </div>
                                <div className="flex w-[36px] h-[24px]">
                                    <p className="font-medium text-[16px] leading-[24px]">{auction.starting_price}</p>
                                </div>
                            </div>
                            <div className="w-full h-full p-[4px] gap-[8px]">
                                <img className="rounded-[12px] w-[208px] h-[150px]" src={`http://localhost:3000/files/${auction.image}`} alt="auction_image" />

                                <div className="flex justify-between w-full h-fit items-center gap-[4px]">
                                    <button 
                                        onClick={handleDeleteClick} 
                                        className="flex justify-center items-center w-fit h-fit min-h-[40px] rounded-[16px] border border-[#272D2D] pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[8px] hover:bg-gray-50 transition-colors"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4.00016 12.6667C4.00016 13.4 4.60016 14 5.3335 14H10.6668C11.4002 14 12.0002 13.4 12.0002 12.6667V4.66667H4.00016V12.6667ZM5.3335 6H10.6668V12.6667H5.3335V6ZM10.3335 2.66667L9.66683 2H6.3335L5.66683 2.66667H3.3335V4H12.6668V2.66667H10.3335Z" fill="#071015" />
                                        </svg>
                                    </button>

                                    <button 
                                        onClick={handleEditClick} 
                                        className="flex justify-center items-center w-full h-fit min-h-[40px] rounded-[16px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[8px] bg-[#272D2D] hover:bg-[#1a1e1e] transition-colors"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.37333 6.01333L9.98667 6.62667L3.94667 12.6667H3.33333V12.0533L9.37333 6.01333ZM11.7733 2C11.6067 2 11.4333 2.06667 11.3067 2.19333L10.0867 3.41333L12.5867 5.91333L13.8067 4.69333C14.0667 4.43333 14.0667 4.01333 13.8067 3.75333L12.2467 2.19333C12.1133 2.06 11.9467 2 11.7733 2ZM9.37333 4.12667L2 11.5V14H4.5L11.8733 6.62667L9.37333 4.12667Z" fill="white" />
                                        </svg>
                                        <p className="font-medium text-[16px] leading-[24px] text-white">Edit</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div onClick={onClickNavigate} className="flex flex-col h-[250px] w-[216px] min-h-[250px] min-w-[216px] bg-[#FFFFFF] rounded-[16px] cursor-pointer">
                        <div className="flex flex-col w-full h-fit pt-[8px] pr-[8px] pb-[4px] pl-[8px] gap-[8px]">
                            <div className="flex justify-between items-center w-full h-fit gap-[8px]">
                                {timeLeft <= 0 ? (
                                    <>
                                        <span className="w-fit h-fit font-light text-[10px] leading-[12px] text-white bg-[#272D2D] rounded-[8px] pt-[2px] pr-[4px] pb-[2px] pl-[4px] gap-[8px]">
                                            {tag}
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <div className={`w-fit h-fit rounded-[8px] pt-[2px] pr-[4px] pb-[2px] pl-[4px] gap-[8px] ${tag === "Outbid" ? 'bg-[#FFAA98]' : tag === "Winning" ? 'bg-[#ADFF90]' : 'bg-[#F9FF90]'}`}>
                                            <p className="font-light text-[10px] leading-[12px]">{tag}</p>
                                        </div>

                                        <div className={`flex items-center justify-between w-fit h-fit ${timeLeft <= 24 ? 'rounded-[8px] pt-[2px] pr-[4px] pb-[2px] pl-[4px] gap-[4px] bg-[#FFAA98]' : 'rounded-[8px] pt-[2px] pr-[4px] pb-[2px] pl-[4px] gap-[4px]'} `}>
                                            <p className="font-light text-[10px] leading-[12px]">{timeLeft}h</p>
                                            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.62 3.87512C8.035 3.29012 7.27 2.99512 6.5 2.99512V5.99512L4.38 8.11512C5.55 9.28512 7.45 9.28512 8.625 8.11512C9.795 6.94512 9.795 5.04512 8.62 3.87512ZM6.5 0.995117C3.74 0.995117 1.5 3.23512 1.5 5.99512C1.5 8.75512 3.74 10.9951 6.5 10.9951C9.26 10.9951 11.5 8.75512 11.5 5.99512C11.5 3.23512 9.26 0.995117 6.5 0.995117ZM6.5 9.99512C4.29 9.99512 2.5 8.20512 2.5 5.99512C2.5 3.78512 4.29 1.99512 6.5 1.99512C8.71 1.99512 10.5 3.78512 10.5 5.99512C 10.5 8.20512 8.71 9.99512 6.5 9.99512Z" fill="#071015" />
                                            </svg>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="flex w-full h-fit">
                                <p className="font-light text-[16px] leading-[24px]">{auction.title}</p>
                            </div>
                            <div className="flex w-[36px] h-[24px]">
                                <p className="font-medium text-[16px] leading-[24px]">{auction.starting_price}</p>
                            </div>
                        </div>
                        <div className="w-full h-full p-4 gap-[8px]">
                            <img className="rounded-[12px] w-[208px] h-[150px]" src={`http://localhost:3000/files/${auction.image}`} alt="auction_image" />
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default AuctionCard
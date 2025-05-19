const AuctionCard = () => {


    return (
        <>

            <div className="flex flex-col h-[250px] w-[216px] min-h-[250px] min-w-[216px] bg-[#FFFFFF] rounded-[16px]">
                <div className="flex flex-col w-full h-fit pt-[8px] pr-[8px] pb-[4px] pl-[8px] gap-[8px]">
                    <div className="flex justify-between w-full h-fit gap-[8px]">
                        Tag goes here
                    </div>
                    <div className="flex w-full h-fit">
                        <p className="font-light text-[16px] leading-[24px]">Testing</p>
                    </div>
                    <div className="flex w-[36px] h-[24px]">
                        <p className="font-medium text-[16px] leading-[24px]">60</p>
                    </div>
                </div>

                <div className="w-full h-full p-4 gap-[8px]">
                    <img className="rounded-[12px] w-full h-full" src="logotypes/logo.png" alt="auction_image" />
                </div>


            </div>

        </>
    )
}

export default AuctionCard
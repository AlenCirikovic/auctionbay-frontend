import authStore from "../stores/auth.store"


const Auctions = () => {
    return (
        <>
            <div className="w-full h-fit pr-[32px] pl-[32px] gap-[8px]">
                <h1 className="font-bold text-[32px] leading-[120%]">Hello {`${authStore.user?.name}  ${authStore.user?.surname}`} !</h1>
            </div>
            
            <div className="flex w-fill h-fit justify-between pr-[32px] pl-[32px]">
                <div className="w-fit h-fit rounded-[16px] p-[4px] gap-[8px] bg-[#EDF4F2]">
                    <button className="">My auctions</button>
                    <button className="">Bidding</button>
                    <button className="">Won</button>
                </div>
            </div>
        </>

    )
}

export default Auctions
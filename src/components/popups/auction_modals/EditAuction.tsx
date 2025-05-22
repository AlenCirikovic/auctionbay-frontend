type EditAuctionProps = {
    onClose: () => void;
}


const EditAuction = ({onClose} : EditAuctionProps) => { 
 return (
        <>
            <form className="flex flex-col w-[533px] h-fit p-[16px] rounded-[16px] gap-[16px] bg-white">
                <div className="flex justify-start items-center w-full h-fit gap-[16px]">
                    <h1 className="font-bold text-[23px] leading-[120%]">Add auction</h1>
                </div>

                <div className="flex justify-center items-center w-full h-[168px] rounded-[16px] p-[32px] gap-[8px]">
                    <button className="w-fit h-fit max-h-[40px] rounded-[16px] border-2 pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[8px]">
                        <p className="font-medium text-[16px] leading-[24px]">Add image</p>
                    </button>
                </div>

                <div className="flex flex-col w-full h-fit gap-[16px]">
                    <div className="flex flex-col w-[501px] h-[72px] gap-[8px]">
                        <label className="h-[24px] font-light text-[16px] leading-[24px]" htmlFor="title">Title</label>
                        <input className="pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[8px] font-light text-[16px] leading-[24px] h-[40px] w-full rounded-[16px] border-[1px] border-[#DDE9E6] " type="text" name="title" placeholder="Write item name here" />
                    </div>
                    <div className="flex flex-col w-full h-[155px] gap-[8px]">
                        <label className="h-[24px] font-light text-[16px] leading-[24px]" htmlFor="description">Description</label>
                        <input className="pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[8px] font-light text-[16px] leading-[24px] h-full w-full rounded-[16px] border-[1px] border-[#DDE9E6] " type="text" name="description" placeholder="Placeholder" />
                    </div>
                </div>


                <div className="flex w-full h-fit gap-[18px]">
                    <div className="flex flex-col w-full h-fit gap-[8px]">
                        <label className="h-[24px] font-light text-[16px] leading-[24px]" htmlFor="starting_price">Starting price</label>
                        <input className="pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[8px] font-light text-[16px] leading-[24px] h-[40px] w-full rounded-[16px] border-[1px] border-[#DDE9E6] " type="text" name="starting_price" placeholder="Price" />
                    </div>
                    <div className="flex flex-col w-full h-fit gap-[8px]">
                        <label className="h-[24px] font-light text-[16px] leading-[24px]" htmlFor="end_date">End date</label>
                        <input className="pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[8px] font-light text-[16px] leading-[24px] h-[40px] w-full rounded-[16px] border-[1px] border-[#DDE9E6] " type="date" name="end_date" placeholder="dd.mm.yyy" />
                    </div>
                </div>

                <div className="flex justify-end items-center w-full h-[40px] gap-[16px]">
                    <div className="w-[85px] h-[40px] min-[40px] rounded-[16px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[8px] bg-[#EDF4F2]">
                        <button onClick={onClose} className="font-medium text-[16px] leading-[24px]">Discard changes</button>
                    </div>
                    <div className="w-[139px] h-[40px] min-[40px] rounded-[16px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[8px] bg-[#272D2D]">
                        <button className="font-medium text-[16px] text-white leading-[24px]">Edit auction</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default EditAuction
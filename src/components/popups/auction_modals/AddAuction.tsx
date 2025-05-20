
const AddAuction = () => {
    return (
        <>
            <form className="flex flex-col w-[533px] h-fit p-[16px] rounded-[16px] gap-[16px] bg-white">
                <div className="flex justify-start items-center w-full h-fit gap-[16px]">
                    <h1 className="font-bold text-[23px] leading-[120%]">Add auction</h1>
                </div>
                
                <div className="w-full h-[168px] rounded-[16px] p-[32px] gap-[8px]">
                    <button className="w-fit h-fit max-h-[40px] rounded-[16px] border-2 pt-[8] pr-[16] pb-[8] pl-[16] gap-[8 ]">
                        <p>Add image</p>
                    </button>
                </div>

            </form>
        </>
    )
}

export default AddAuction
type ChangeAvatarProps = {
    onClose: () => void;
}


const ChangeAvatar = ({ onClose }: ChangeAvatarProps) => {


    return (
        <>
            <div className="flex flex-col relative bg-white w-[533px] h-hug rounded-[16px] p-[16px] gap-[32px]">

                <header>
                    <div className="flex w-full gap-[16px] h-[28px]">
                        <h4 className="font-bold text-[23px] leading-[120%]">Change password</h4>
                    </div>
                </header>

                <div className="flex flex-col w-full h-full justify-center items-center gap-[16px]">
                    <div

                        className="w-[56px] h-[56px] rounded-[100px] overflow-hidden focus:outline-none"
                    >
                        <img className="w-full h-full object-cover" src="icons/avatar.png" alt="avatar" />
                    </div>

                    <div className="flex text-center w-[181px] h-[40px] min-h-[40px] rounded-[16px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[8px] border-[#272D2D] border-2">
                        <button className="w-[149px] h-[24px] font-medium text-[16px] leading-[24px]">
                           Upload new picture
                        </button>
                    </div>

                </div>

                <div className="flex justify-end items-center w-full h-fit gap-[16px]">
                    <div className="w-[85px] h-[40px] min-[40px] rounded-[16px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[8px] bg-[#EDF4F2]">
                        <button onClick={onClose} className="font-medium text-[16px] leading-[24px]">Cancel</button>
                    </div>
                    <div className="w-[139px] h-[40px] min-[40px] rounded-[16px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[8px] bg-[#F4FF47]">
                        <button className="font-medium text-[16px] leading-[24px]">Save changes</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChangeAvatar
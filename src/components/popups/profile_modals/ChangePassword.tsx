type ChangePasswordProps = {
    onClose: () => void;
};



const ChangePassword = ({ onClose }: ChangePasswordProps) => {
    return (
        <>
            <div className="flex flex-col relative bg-white w-[533px] h-fit rounded-[16px] p-[18px] gap-[32px]">

                <header>
                    <div className="flex w-full gap-[16px] h-[28px]">
                        <h4 className="font-bold text-[23px] leading-[120%]">Change password</h4>
                    </div>
                </header>


                <form className="flex flex-col w-[501px] h-[250px] gap-[17px]">
                    <div className="flex flex-col w-[501px] h-[72px] gap-[8px]">
                        <label className="h-[24px] font-light text-[16px] leading-[24px]" htmlFor="email">Current password</label>
                        <input className="pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[8px] font-light text-[16px] leading-[24px] h-[40px] w-full rounded-[16px] border-[1px] border-[#DDE9E6] " type="email" name="email" placeholder="Placeholder" />
                    </div>

                    <div className="flex flex-col w-[501px] h-[72px] gap-[8px]">
                        <label className="h-[24px] font-light text-[16px] leading-[24px]" htmlFor="email">New password</label>
                        <input className="pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[8px] font-light text-[16px] leading-[24px] h-[40px] w-full rounded-[16px] border-[1px] border-[#DDE9E6] " type="email" name="email" placeholder="Placeholder" />
                    </div>

                    <div className="flex flex-col w-[501px] h-[72px] gap-[8px]">
                        <label className="h-[24px] font-light text-[16px] leading-[24px]" htmlFor="email">Repeat new password</label>
                        <input className="pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[8px] font-light text-[16px] leading-[24px] h-[40px] w-full rounded-[16px] border-[1px] border-[#DDE9E6] " type="email" name="email" placeholder="Placeholder" />
                    </div>

                </form>

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

export default ChangePassword
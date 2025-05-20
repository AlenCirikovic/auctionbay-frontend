type ProfileSettingsProps = {
    onClose: () => void;
    onChangePassword: () => void;
    onChangeAvatar: () => void;
};



const ProfileSettings = ({ onClose, onChangePassword,onChangeAvatar }: ProfileSettingsProps) => {
       return (
        <div className="flex flex-col bg-white w-[533px] h-[404px] rounded-[16px] p-[16px] gap-[32px] shadow-xl">
            <header>
                <div className="flex w-full gap-[16px] h-[28px]">
                    <h4 className="font-bold text-[23px] leading-[120%]">Profile settings</h4>
                </div>
            </header>
            <form className="flex flex-col w-[501px] h-[240px] gap-[16px]">
                <div className="flex w-[501px] h-[72px] gap-[17px]">
                    <div className="flex flex-col w-[242px] h-[72px] gap-[8px]">
                        <label className="w-[184px] h-[24px] font-light text-[16px] leading-[24px]" htmlFor="name">Name</label>
                        <input className="pt-[16px] pr-[8px] pb-[16px] pl-[8px] gap-[8px] font-light text-[16px] leading-[24px] h-[40px] w-[242px] rounded-[16px] border-[1px] border-[#DDE9E6] " type="text" name="name" placeholder="Placeholder" />
                    </div>
                    <div className="flex flex-col w-[242px] h-[72px] gap-[8px]">
                        <label className="w-[184px] h-[24px] font-light text-[16px] leading-[24px]" htmlFor="surname">Surname</label>
                        <input className="pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[8px] font-light text-[16px] leading-[24px] h-[40px] w-[242px] rounded-[16px] border-[1px] border-[#DDE9E6] " type="text" name="surname" placeholder="Placeholder" />
                    </div>
                </div>
                <div className="flex flex-col w-[501px] h-[72px] gap-[8px]">
                    <label className="h-[24px] font-light text-[16px] leading-[24px]" htmlFor="email">Email</label>
                    <input className="pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[8px] font-light text-[16px] leading-[24px] h-[40px] w-full rounded-[16px] border-[1px] border-[#DDE9E6] " type="email" name="email" placeholder="Placeholder" />
                </div>
                <button onClick={onChangePassword} className="text-left" type="button">Change password</button>  {/* On click modal opens for change password */}
                <button onClick={onChangeAvatar} className="text-left" type="button">Change profile picture</button> {/* On click modal opens for change profile picture */}
            </form>
            <div className="flex justify-end items-center w-full h-[40px] gap-[16px]">
                <div className="w-[85px] h-[40px] min-[40px] rounded-[16px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[8px] bg-[#EDF4F2]">
                    <button onClick={onClose} className="font-medium text-[16px] leading-[24px]">Cancel</button>
                </div>
                <div className="w-[139px] h-[40px] min-[40px] rounded-[16px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[8px] bg-[#F4FF47]">
                    <button className="font-medium text-[16px] leading-[24px]">Save changes</button>
                </div>
            </div>
        </div>
    )
}

export default ProfileSettings
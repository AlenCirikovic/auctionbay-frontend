import { useState, type FC } from "react";
import { Link, useNavigate } from "react-router";
import authStore from "../stores/auth.store";
import ProfileDropdown from "./popups/profile_modals/ProfileDropdown";
import axios from "axios";
import ProfileSettings from "./popups/profile_modals/ProfileSettings";
import ChangePassword from "./popups/profile_modals/ChangePassword";
import ChangeAvatar from "./popups/profile_modals/ChangeAvatar";
import AddAuction from "./popups/auction_modals/AddAuction";

const Navbar: FC = () => {
    const navigate = useNavigate();
    const [activeDiv, setActiveDiv] = useState(0);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [apiError, setApiError] = useState('')
    const [showError, setShowError] = useState(false)
    const [showProfileSettings, setShowProfileSettings] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [showChangeAvatar, setShowChangeAvatar] = useState(false);
    const [showAddAuction, setShowAddAuction] = useState(false);

    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:3000/auth/signout')
            if (response.data?.statusCode === 400) {
                setApiError(response.data.message)
                setShowError(true)
            } else if (response.data?.statusCode === 500) {
                setApiError(response.data.message)
                setShowError(true)
            } else {
                authStore.signout()
                navigate('/')
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setApiError(error.response?.data?.message || 'Signout failed')
                setShowError(true)
            } else {
                setApiError('An unexpected error occurred')
                setShowError(true)
            }
        }
    };

    const toggleAddAuction = () => {
        setShowAddAuction(!showAddAuction)
    }

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };



    return (
        <>
            {authStore.user ? (
                <>
                    <div className="flex flex-row h-[104px] justify-between pt-[20px] pr-[32px] pb-[20px] pl-[32px] items-center">
                        <div className="flex w-[347px] h-[64px] gap-[32px]">
                            <Link to="/">
                                <div className="w-[64px] h-[64px] gap-[32px]">
                                    <img className="w-[64px] h-[64px]" src="logotypes/logo.png" alt="Logotip" />
                                </div>
                            </Link>
                            <div className="flex w-[251px] h-[64px] rounded-[32px] p-[4px] gap-[8px]">
                                <div className={`flex w-[126px] h-[56px] rounded-[32px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[4px] justify-center items-center ${activeDiv === 1 ? 'bg-[#272D2D] text-white' : 'bg-white text-black'}`} onClick={() => setActiveDiv(1)}>
                                    <img className="w-[24px] h-[24px]" src="icons/Home.svg" alt="Home" />
                                    <p className="font-[400] text-[16px] leading-[120%]">Auctions</p>
                                </div>
                                <div className={`flex w-[109px] h-[56px] rounded-[32px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[4px] justify-center items-center  ${activeDiv === 2 ? 'bg-[#272D2D] text-black' : activeDiv === 1 ? 'bg-white text-black' : 'bg-[#272D2D] text-black'}`} onClick={() => setActiveDiv(2)} >
                                    <div className="flex h-[24px] w-[24px] items-center justify-center text-center">
                                        <img className="" src="icons/Person.svg" alt="Person" />
                                    </div>
                                    <p className="text-white font-[400] text-[16px] leading-[120%]">Profile</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center items-center w-[192px] h-[64px] rounded-[32xp] p-[4px] gap-[8px]">
                            <div className="w-[56px] h-[56px] bg-[#EDF4F2] p-[16px] rounded-[32px] gap-[4px]">
                                <div className="w-[24px] h-[24px] flex justify-center items-center">
                                    <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 20C9.1 20 10 19.1 10 18H6C6 19.1 6.9 20 8 20ZM14 14V9C14 5.93 12.37 3.36 9.5 2.68V2C9.5 1.17 8.83 0.5 8 0.5C7.17 0.5 6.5 1.17 6.5 2V2.68C3.64 3.36 2 5.92 2 9V14L0 16V17H16V16L14 14ZM12 15H4V9C4 6.52 5.51 4.5 8 4.5C10.49 4.5 12 6.52 12 9V15Z" fill="#071015" />
                                    </svg>
                                </div>
                            </div>
                            <button
                                onClick={toggleAddAuction}
                                className="w-[56px] h-[56px] bg-[#F4FF47] p-[16px] rounded-[32px] gap-[4px]">
                                <div className="w-[24px] h-[24px] flex justify-center items-center">
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="#071015" />
                                    </svg>
                                </div>
                            </button>
                            <button
                                onClick={toggleDropdown}
                                className="w-[56px] h-[56px] rounded-[100px] overflow-hidden focus:outline-none"
                            >
                                <img className="w-full h-full object-cover" src={authStore.user.avatar === null || authStore.user.avatar === '' || authStore.user.avatar === undefined 
                                    ? 'images/default_avatar.jpg' 
                                    : `http://localhost:3000/files/${authStore.user.avatar}`} alt="avatar" />
                            </button>

                            <ProfileDropdown
                                isOpen={isDropdownOpen}
                                onClose={() => setIsDropdownOpen(false)}
                                onLogout={handleLogout}
                                onProfileSettings={() => {
                                    setIsDropdownOpen(false);
                                    setShowProfileSettings(true);
                                }}
                            />
                            {showProfileSettings && (
                                <div
                                    className="fixed inset-0 flex items-center justify-center z-50"
                                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }} // 30% opacity black
                                >
                                    <ProfileSettings onChangeAvatar={() => { setShowChangeAvatar(true); setShowProfileSettings(false); }}
                                        onChangePassword={() => { setShowChangePassword(true); setShowProfileSettings(false); }}
                                        onClose={() => setShowProfileSettings(false)} />
                                </div>
                            )}
                            {showChangeAvatar && (
                                <div>
                                    <div
                                        className="fixed inset-0 flex items-center justify-center z-50"
                                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }} // 30% opacity black
                                    >
                                        <ChangeAvatar onClose={() => setShowChangeAvatar(false)} />
                                    </div>
                                </div>
                            )}

                            {showChangePassword && (
                                <div>
                                    <div
                                        className="fixed inset-0 flex items-center justify-center z-50"
                                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }} // 30% opacity black
                                    >
                                        <ChangePassword onClose={() => setShowChangePassword(false)} />
                                    </div>
                                </div>
                            )}

                            {showAddAuction && (
                                <div>
                                    <div
                                        className="fixed inset-0 flex items-center justify-center z-50"
                                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }} // 30% opacity black
                                    >
                                        <AddAuction onClose={() => setShowAddAuction(false)} />
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="flex flex-row h-[104px] justify-between pt-[20px] pr-[32px] pb-[20px] pl-[32px] items-center">
                        <Link to="/">
                            <div className="w-[64px] h-[64px] gap-[32px]">
                                <img className="w-[64px] h-[64px]" src="logotypes/logo.png" alt="Logotip" />
                            </div>
                        </Link>
                        <div className="flex flex-row gap-[8px] h-[40px] w-[172px] items-center">
                            <Link to="/login">
                                <p className="font-bold">Log in</p>
                            </Link>
                            <p> or </p>
                            <Link to="/signin">
                                <button className="rounded-[16px] bg-[#272D2D] text-white py-2 px-4">Sign Up</button>
                            </Link>
                        </div>
                    </div>
                </>
            )}



        </>
    )
}

export default Navbar
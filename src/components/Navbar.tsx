import { useEffect, useState, type FC } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import authStore from "../stores/auth.store";
import ProfileDropdown from "./popups/profile_modals/ProfileDropdown";
import axios from "axios";
import ProfileSettings from "./popups/profile_modals/ProfileSettings";
import ChangePassword from "./popups/profile_modals/ChangePassword";
import ChangeAvatar from "./popups/profile_modals/ChangeAvatar";
import AddAuction from "./popups/auction_modals/AddAuction";

const Navbar: FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeDiv, setActiveDiv] = useState(0);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [apiError, setApiError] = useState('')
    const [showError, setShowError] = useState(false)
    const [showProfileSettings, setShowProfileSettings] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [showChangeAvatar, setShowChangeAvatar] = useState(false);
    const [showAddAuction, setShowAddAuction] = useState(false);

    useEffect(() => {
        if (location.pathname.startsWith('/auctions')) {
            setActiveDiv(1);
        } else if (location.pathname.startsWith('/profile')) {
            setActiveDiv(2);
        } else {
            setActiveDiv(0);
        }
    }, [location.pathname]);

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
                                {/* Auctions Tab */}
                                <div
                                    onClick={() => navigate("/auctions")}
                                    className={`flex w-[126px] h-[56px] rounded-[32px] px-4 py-2 gap-2 justify-center items-center cursor-pointer ${activeDiv === 1 ? 'bg-[#272D2D] text-white' : 'bg-white text-black'
                                        }`}
                                >
                                    <div className="flex h-6 w-6 items-center justify-center text-center">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M11.9978 5.69L16.9978 10.19V18H14.9978V12H8.9978V18H6.9978V10.19L11.9978 5.69ZM11.9978 3L1.9978 12H4.9978V20H10.9978V14H12.9978V20H18.9978V12H21.9978L11.9978 3Z"
                                                fill={activeDiv === 1 ? 'white' : '#071015'}
                                            />
                                        </svg>
                                    </div>
                                    <p className="font-[400] text-[16px] leading-[120%]">Auctions</p>
                                </div>

                                {/* Profile Tab */}
                                <div
                                    onClick={() => navigate("/profile/my-auctions")}
                                    className={`flex w-[109px] h-[56px] rounded-[32px] px-4 py-2 gap-2 justify-center items-center cursor-pointer ${activeDiv === 2 ? 'bg-[#272D2D] text-white' : 'bg-white text-black'
                                        }`}
                                >
                                    <div className="flex h-6 w-6 items-center justify-center text-center">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M11.9978 6C13.0978 6 13.9978 6.9 13.9978 8C13.9978 9.1 13.0978 10 11.9978 10C10.8978 10 9.9978 9.1 9.9978 8C9.9978 6.9 10.8978 6 11.9978 6ZM11.9978 16C14.6978 16 17.7978 17.29 17.9978 18H5.9978C6.2278 17.28 9.3078 16 11.9978 16ZM11.9978 4C9.7878 4 7.9978 5.79 7.9978 8C7.9978 10.21 9.7878 12 11.9978 12C14.2078 12 15.9978 10.21 15.9978 8C15.9978 5.79 14.2078 4 11.9978 4ZM11.9978 14C9.3278 14 3.9978 15.34 3.9978 18V20H19.9978V18C19.9978 15.34 14.6678 14 11.9978 14Z"
                                                fill={activeDiv === 2 ? 'white' : '#071015'}
                                            />
                                        </svg>
                                    </div>
                                    <p className="font-[400] text-[16px] leading-[120%]">Profile</p>
                                </div>
                            </div>

                        </div>

                        <div className="flex justify-center items-center w-fit h-[64px] rounded-[32xp] p-[4px] gap-[8px]">

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
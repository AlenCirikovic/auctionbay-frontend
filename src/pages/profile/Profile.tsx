import { useLocation, useNavigate } from "react-router-dom"
import authStore from "../../stores/auth.store"
import { Outlet } from "react-router"

const Profile = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const getActiveTab = () => {
        if (location.pathname.includes("bidding")) return 2
        if (location.pathname.includes("won")) return 3
        return 1 
    }

    const activeTab = getActiveTab()

    return (
        <>
            <div className="w-full h-fit pr-[32px] pl-[32px] gap-[8px]">
                <h1 className="font-bold text-[32px] leading-[120%]">
                    Hello {`${authStore.user?.name}  ${authStore.user?.surname}`}!
                </h1>
            </div>

            <div className="flex w-fill h-fit justify-center pr-[32px] pl-[32px]">
                <div className="w-fit h-fit rounded-[16px] p-[4px] gap-[8px] bg-[#EDF4F2]">
                    <button
                        onClick={() => navigate("my-auctions")}
                        className={`${
                            activeTab === 1
                                ? "bg-[#272D2D] text-white"
                                : "bg-[#EDF4F2]"
                        } w-[126px] h-fit min-h-[40px] rounded-[16px] px-[16px] py-[8px]`}
                    >
                        <p className="font-medium text-[16px] leading-[24px]">
                            My auctions
                        </p>
                    </button>
                    <button
                        onClick={() => navigate("bidding")}
                        className={`${
                            activeTab === 2
                                ? "bg-[#272D2D] text-white"
                                : "bg-[#EDF4F2]"
                        } w-[126px] h-fit min-h-[40px] rounded-[16px] px-[16px] py-[8px]`}
                    >
                        <p className="font-medium text-[16px] leading-[24px]">
                            Bidding
                        </p>
                    </button>
                    <button
                        onClick={() => navigate("won")}
                        className={`${
                            activeTab === 3
                                ? "bg-[#272D2D] text-white"
                                : "bg-[#EDF4F2]"
                        } w-[126px] h-fit min-h-[40px] rounded-[16px] px-[16px] py-[8px]`}
                    >
                        <p className="font-medium text-[16px] leading-[24px]">
                            Won
                        </p>
                    </button>
                </div>
            </div>

            <Outlet />
        </>
    )
}

export default Profile

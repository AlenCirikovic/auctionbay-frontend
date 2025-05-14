import type { FC } from "react"
import { Link } from "react-router"

const Register: FC = () => {
    return (
        <>
            <div className="flex flex-row w-[1440px] h-[1024px] top-[1364px] left-[192px] justify-center">


                <img className="w-[968px] h-[1024px]" src="images/register-login-page.png" alt="RegisterPic" />

                <div className="flex flex-col h-[1024px] w-[472px] gap-[8px] pt-[64px] pr-[32px] pb-[64px] pl-[32px] rounded-[32px] justify-between items-center">

                    <div className="w-[64px] h-[64px] gap-[32px]">
                        <img className="w-[64px] h-[64px]" src="logotypes/logo.png" alt="Logotip" />
                    </div>

                    <div className="flex flex-col w-[384px] h-[542px] gap-[64px] items-center justify-center">

                        <div className="w-[185px] h-[70px] text-center">
                            <h1 className="font-bold text-[32px] leading-[120%]">Hello!</h1>
                            <p className="font-light text-[16px] leading-[24px]">Please enter your details</p>
                        </div>


                        <div className="w-[384px] h-[408px] gap-[32px]">
                            <form className="w-[384px] h-[336px] gap-[16px]">

                                <div className="w-[384px] h-[336px] gap-[16px]">

                                    <div className="flex w-[384px] h-[72px] gap-[16px]">
                                        <div className="flex flex-col w-[184px] h-[72px] gap-[8px]">
                                            <label className="w-[184px] h-[24px] font-light text-[16px] leading-[24px]" htmlFor="name">Name</label>
                                            <input className="pt-[16px] pr-[8px] pb-[16px] pl-[8px] gap-[8px] font-light text-[16px] leading-[24px] h-[40px] w-[184px] rounded-[16px] border-[1px] border-[#DDE9E6] " type="text" name="name" placeholder="Placeholder" />

                                        </div>
                                        <div className="flex flex-col w-[184px] h-[72px] gap-[8px]">
                                            <label className="w-[184px] h-[24px] font-light text-[16px] leading-[24px]" htmlFor="surname">Surname</label>
                                            <input className="pt-[16px] pr-[8px] pb-[16px] pl-[8px] gap-[8px] font-light text-[16px] leading-[24px] h-[40px] w-[184px] rounded-[16px] border-[1px] border-[#DDE9E6] " type="text" name="surname" placeholder="Placeholder" />
                                        </div>
                                    </div>

                                    <div className="flex flex-col w-[384px] h-[72px] gap-[8px]">
                                        <label className="h-[24px] font-light text-[16px] leading-[24px]" htmlFor="email">E-mail</label>
                                        <input className="pt-[16px] pr-[8px] pb-[16px] pl-[8px] gap-[8px] font-light text-[16px] leading-[24px] h-[40px] w-[384px] rounded-[16px] border-[1px] border-[#DDE9E6] " type="email" name="email" placeholder="Placeholder" />
                                    </div>

                                    <div className="flex flex-col w-[384px] h-[72px] gap-[8px]">
                                        <label className="h-[24px] font-light text-[16px] leading-[24px]" htmlFor="password">Password</label>
                                        <input className="pt-[16px] pr-[8px] pb-[16px] pl-[8px] gap-[8px] font-light text-[16px] leading-[24px] h-[40px] w-[384px] rounded-[16px] border-[1px] border-[#DDE9E6] " type="password" name="password" placeholder="Placeholder" />
                                    </div>

                                    <div className="flex flex-col w-[384px] h-[72px] gap-[8px]">
                                        <label className="h-[24px] font-light text-[16px] leading-[24px]" htmlFor="repeat-password">Repeat password</label>
                                        <input className="pt-[16px] pr-[8px] pb-[16px] pl-[8px] gap-[8px] font-light text-[16px] leading-[24px] h-[40px] w-[384px] rounded-[16px] border-[1px] border-[#DDE9E6] " type="repeat-password" name="repeat-password" placeholder="Placeholder" />
                                    </div>
                                </div>

                                <div className="w-[384px] h-[40px] rounded-[16px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[8px] bg-[#F4FF47] text-center">
                                    <button className="font-medium leading-[24px] text-[16px]">
                                        Sign up
                                    </button>
                                </div>
                            </form>




                        </div>
                        <div className="h-[24px] w-[245px] text-center">
                            <p className="font-light text-[16px] leading-[24px]">Already have an account? <Link className="font-bold text-[16px] leading-[24px]" to={'/login'}>Log in</Link></p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Register
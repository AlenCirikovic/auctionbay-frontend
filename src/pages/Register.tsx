import type { FC } from "react"

const Register: FC = () => {
    return (
        <>
            <div className="flex flex-row w-[1440px] h-[1024px] justify-center items-center">

                <img className="w-[968px] h-[1024px]" src="images/register-login-page.png" alt="RegisterPic" />
                <div className="flex flex-col h-[1024px] w-[472px] justify-center items-center text-center">
                    <div className="w-[64px] h-[64px] gap-[16px] p-[16px]">
                        <img className="w-[64px] h-[64px]" src="logotypes/logo.png" alt="Logotip" />
                    </div>
                    <div className="w-[384px] h-[542px] gap-[64px] justify-center items-center">
                        <div className="w-[185px] h-[70px] gap-[8px] items-center justify-center text-center">
                            <h1 className="font-bold text-[32px] leading-[120%]">Hello!</h1>
                            <p className="font-light text-[16px] leading-[24px]">Please enter your details</p>
                        </div>
                    </div>
                </div>
            </div>
        </> 
    )
}

export default Register
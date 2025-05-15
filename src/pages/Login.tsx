import { useState, type FC } from "react"
import { Link, useNavigate } from "react-router"
import { useLoginForm, type LoginUserFields } from "../hooks/react-hook-form/useLogin"
import axios from "axios"
import authStore from "../stores/auth.store"
import { Controller } from "react-hook-form"

const Login: FC = () => {
    const navigate = useNavigate()
    const { handleSubmit, errors, control } = useLoginForm()
    const [apiError, setApiError] = useState('')
    const [showError, setShowError] = useState(false)

    const onSubmit = async (data: LoginUserFields) => {
        try {
            const response = await axios.post('http://localhost:3000/auth/login', data)
            if (response.data?.statusCode === 400) {
                setApiError(response.data.message)
                setShowError(true)
            } else if (response.data?.statusCode === 500) {
                setApiError(response.data.message)
                setShowError(true)
            } else {
                authStore.login(response.data)
                navigate('/')
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setApiError(error.response?.data?.message || 'Login failed')
                setShowError(true)
            } else {
                setApiError('An unexpected error occurred')
                setShowError(true)
            }
        }
    }

    return (
        <>
            <div className="flex flex-row w-[1440px] h-[1024px] top-[1364px] left-[192px] justify-center">
                <img className="w-[968px] h-[1024px]" src="images/register-login-page.png" alt="RegisterPic" />

                <div className="flex flex-col h-[1024px] w-[472px] gap-[8px] pt-[64px] pr-[32px] pb-[64px] pl-[32px] rounded-[32px] justify-between items-center">
                    <div className="w-[64px] h-[64px] gap-[32px]">
                        <img className="w-[64px] h-[64px]" src="logotypes/logo.png" alt="Logotip" />
                    </div>

                    <div className="flex flex-col w-[384px] h-[398px] gap-[64px] items-center justify-center">
                        <div className="w-[240px] h-[70px] gap-[8px] text-center">
                            <h1 className="font-bold text-[32px] leading-[120%]">Welcome back!</h1>
                            <p className="font-light text-[16px] leading-[24px]">Please enter your details</p>
                        </div>

                        <div className="w-[384px] h-[264px] gap-[32px]">
                            <form onSubmit={handleSubmit(onSubmit)} className="w-[384px] h-[192px] gap-[16px]">
                                <div className="w-[384px] h-[192px] gap-[16px]">
                                    <div className="flex flex-col w-[384px] h-[72px] gap-[8px]">
                                        <label className="h-[24px] font-light text-[16px] leading-[24px]" htmlFor="email">E-mail</label>
                                        <Controller
                                            name="email"
                                            control={control}
                                            render={({ field }) => (
                                                <input
                                                    {...field}
                                                    className="pt-[16px] pr-[8px] pb-[16px] pl-[8px] gap-[8px] font-light text-[16px] leading-[24px] h-[40px] w-[384px] rounded-[16px] border-[1px] border-[#DDE9E6]"
                                                    type="email"
                                                    placeholder="Enter your email"
                                                />
                                            )}
                                        />
                                        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                                    </div>

                                    <div className="flex flex-col w-[384px] h-[72px] gap-[8px]">
                                        <label className="h-[24px] font-light text-[16px] leading-[24px]" htmlFor="password">Password</label>
                                        <Controller
                                            name="password"
                                            control={control}
                                            render={({ field }) => (
                                                <input
                                                    {...field}
                                                    className="pt-[16px] pr-[8px] pb-[16px] pl-[8px] gap-[8px] font-light text-[16px] leading-[24px] h-[40px] w-[384px] rounded-[16px] border-[1px] border-[#DDE9E6]"
                                                    type="password"
                                                    placeholder="Enter your password"
                                                />
                                            )}
                                        />
                                        {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                                    </div>

                                    <div className="flex justify-end w-full">
                                        <p className="text-[12px] leading-[16px] font-light text-[#74817F] gap-[8px]">Forgot password</p>
                                    </div>
                                </div>

                                {showError && (
                                    <div className="mb-2 text-red-500 text-sm">
                                        {apiError}
                                    </div>
                                )}

                                <div className="w-[384px] h-[40px] rounded-[16px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[8px] bg-[#F4FF47] text-center">
                                    <button 
                                        type="submit" 
                                        className="font-medium leading-[24px] text-[16px] w-full"
                                    >
                                        Login
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="h-[24px] w-[245px] text-center">
                            <p className="font-light text-[16px] leading-[24px]">Don't have an account? <Link className="font-bold text-[16px] leading-[24px]" to={'/signin'}>Sign Up</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
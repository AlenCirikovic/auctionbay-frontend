import { useState, type FC } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import { useRegisterForm, type RegisterUserFields } from "../hooks/react-hook-form/useRegister"
import axios from "axios"
import { Controller } from "react-hook-form"

const Register: FC = () => {
  const navigate = useNavigate()
  const { handleSubmit, errors, control } = useRegisterForm()
  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)

  const submitHandler = handleSubmit(async (data: RegisterUserFields) => {
    console.log(`Form submitted: ${data}`)
    try {
      const response = await axios.post('http://localhost:3000/auth/register', data)
      console.log(`Response: ${response}`)
      console.log('Registration response:', response)
      if (response.status >= 200 && response.status < 300) {
        console.log('test')
        navigate('/login')
      } else {
        setApiError('Registration failed')
        setShowError(true)
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setApiError(error.response?.data?.message || 'Register failed')
      } else {
        setApiError('An unexpected error occurred')
      }
      setShowError(true)
    }
  })

  return (
    <>
      <div className="flex flex-row w-[1440px] h-[1024px] top-[1364px] left-[192px] justify-center">
        <img className="w-[968px] h-[1024px]" src="images/register-login-page.png" alt="RegisterPic" />

        <div className="flex flex-col h-[1024px] w-[472px] gap-[8px] pt-[64px] pr-[32px] pb-[64px] pl-[32px] rounded-[32px] justify-center items-center">
          <div className="w-[64px] h-[64px] gap-[32px] mb-[100px]">
            <img className="w-[64px] h-[64px]" src="logotypes/logo.png" alt="Logotip" />
          </div>

          <div className="flex flex-col w-[384px] h-[542px] gap-[64px] items-center justify-center">
            <div className="w-[185px] h-[70px] text-center">
              <h1 className="font-bold text-[32px] leading-[120%]">Hello!</h1>
              <p className="font-light text-[16px] leading-[24px]">Please enter your details</p>
            </div>

            <div className="w-[384px] h-[408px] gap-[32px]">
              <form onSubmit={submitHandler} className="w-[384px] h-[336px] gap-[16px]">
                <div className="w-[384px] h-[336px] gap-[16px]">
                  <div className="flex w-[384px] h-[72px] gap-[16px]">
                    <div className="flex flex-col w-[184px] h-[72px] gap-[8px]">
                      <label className="w-[184px] h-[24px] font-light text-[16px] leading-[24px]" htmlFor="name">Name</label>
                      <Controller
                        name="name"
                        control={control}
                        render={({ field }) => {
                          const value = field.value ?? "";
                          return (
                            <input
                              {...field}
                              value={value}
                              className="pt-[16px] pr-[8px] pb-[16px] pl-[8px] gap-[8px] font-light text-[16px] leading-[24px] h-[40px] w-[184px] rounded-[16px] border-[1px] border-[#DDE9E6]"
                              type="text"
                              placeholder="Enter your name"
                            />
                          );
                        }}
                      />
                      {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                    </div>
                    <div className="flex flex-col w-[184px] h-[72px] gap-[8px]">
                      <label className="w-[184px] h-[24px] font-light text-[16px] leading-[24px]" htmlFor="surname">Surname</label>
                      <Controller
                        name="surname"
                        control={control}
                        render={({ field }) => {
                          // Handle null value
                          const value = field.value ?? "";
                          return (
                            <input
                              {...field}
                              value={value}
                              className="pt-[16px] pr-[8px] pb-[16px] pl-[8px] gap-[8px] font-light text-[16px] leading-[24px] h-[40px] w-[184px] rounded-[16px] border-[1px] border-[#DDE9E6]"
                              type="text"
                              placeholder="Enter your surname"
                            />
                          );
                        }}
                      />
                      {errors.surname && <p className="text-red-500 text-xs">{errors.surname.message}</p>}
                    </div>
                  </div>

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

                  <div className="flex flex-col w-[384px] h-[72px] gap-[8px]">
                    <label className="h-[24px] font-light text-[16px] leading-[24px]" htmlFor="confirm_password">Repeat password</label>
                    <Controller
                      name="confirm_password"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          className="pt-[16px] pr-[8px] pb-[16px] pl-[8px] gap-[8px] font-light text-[16px] leading-[24px] h-[40px] w-[384px] rounded-[16px] border-[1px] border-[#DDE9E6]"
                          type="password"
                          placeholder="Confirm your password"
                        />
                      )}
                    />
                    {errors.confirm_password && <p className="text-red-500 text-xs">{errors.confirm_password.message}</p>}
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
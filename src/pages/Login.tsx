import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface Inputs{
email:string;
password:string
}
const Login = () => {
const {register,handleSubmit,formState:{errors}}=useForm<Inputs>()
const [message , setMessage ] = useState<string>("")
const navigate=useNavigate()

const onSubmit:SubmitHandler<Inputs>=async(data)=>
  {
    try {
      const response = await axios.post('http://localhost:3000/login', data);
       const accessToken = response.data.access_token;
      console.log(accessToken);
      navigate('/')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data) {
          console.log(error.response.data.message);
          setMessage(error.response.data.message)
        } else {
          console.log(error.message);
        }
      } else {
        console.log('An unexpected error occurred.');
      }
    }
    
  }
  return (
    <>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        className="mx-auto h-10 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign in to your account
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email address
          </label>
          <div className="mt-2">
            <input
  id="email"
  type="email"
  {...register('email', { 
    required: "Email is required",
    pattern: {
      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      message: 'Invalid email address'
    }
  })}
  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
/>
          </div>
          {errors.email&&<span className="text-red-500 text-s">{errors.email.message}</span>}
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <div className="text-sm">
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </a>
            </div>
          </div>
          <div className="mt-2">
            <input
              id="password"
              type="password"
            {...register("password",{
              required:'The password is required'
            })}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          {errors.password&&<span className="text-red-500 text-s">{errors.password.message}</span>}
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
          {message&& <span className="text-red-500 text-lg">{message}</span>}

        </div>
      </form>


    </div>
  </div>
</>
  );
};

export default Login;

import axios from 'axios';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
interface IFormInputs {
  username: string;
  email: string;
  password: string;
  confirmPassword: string
}
const SignUp = () => {
  const { register, handleSubmit, formState: { errors,isSubmitting } ,getValues} = useForm<IFormInputs>();
const [message , setMessage ] = useState<string>("")
const navigate=useNavigate()
  const onSubmit:SubmitHandler<IFormInputs>= async(data) => {
    try {
      const response = await axios.post('http://localhost:3000/register', data);
      
      // Assuming the access token is in the response data
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
        setMessage('An unexpected error occurred.')
      }
    }
  };
   


  return (
<div className="flex justify-center items-center h-screen ">
<form onSubmit={handleSubmit(onSubmit)} className="p-4 bg-white rounded-lg shadow-md" style={{ width: '400px' }}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">Username</label>
          <input
            id="username"
            {...register('username', {
              required: 'Username is required',
              minLength: {
                value: 3,
                message: 'Username must be at least 3 characters'
              }
            })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.username && <span className="text-red-500 text-sm">{errors.username.message}</span>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            id="email"
            {...register('email', { 
              required: 'Email is required', 
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: 'Invalid email address'
              }
            })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            {...register('password', {
              required: 'Password is required',
            })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}
        </div>
    

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-700">confirm Password</label>
          <input
            id="password"
            type="password"
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate:(value)=>value===getValues('password')||'Passwords do not match',
            })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
        </div>

        <button type="submit" disabled={isSubmitting} className={`w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
        {message&& <span className="text-red-500 text-md">{message}</span>}

      </form>

    </div>
  );
};

export default SignUp;

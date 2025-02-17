import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useToken from '../../hooks/useToken';



const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { loginUser, googleLogin } = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail)
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const googleProvider = new GoogleAuthProvider();

    if (token) {
        navigate(from, { replace: true })
    }
    console.log(loginUserEmail)
    // ---> google login
    const handelGoogleLogin = () => {
        googleLogin(googleProvider)
            .then(res => {
                console.log("login Successfully")
            })
            .catch(err => { console.err(err) })
    }
    // ---> email-pass login
    const loginSubmit = (data) => {
        const email = data.email;
        const password = data.password;
        // ---> login user
        loginUser(email, password)
            .then(result => {
                setLoginUserEmail(email)
                setLoginError('');
            })
            .catch(err => {
                console.error(err)
                setLoginError(err.message)
            })
    }


    return (
        <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
            <h1 className="text-4xl font-medium">Login</h1>
            <div className="my-5">
                <button
                    onClick={handelGoogleLogin}
                    className="w-full text-center py-3 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-emerald-500 hover:shadow transition duration-150">
                    <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-6 h-6" alt="" /> <span>Login with Google</span>
                </button>
            </div>
            <form className="my-10" onSubmit={handleSubmit(loginSubmit)}>
                <div className="flex flex-col space-y-5">
                    <label htmlFor="email">
                        <p className="font-medium text-slate-700 pb-2">Email address</p>
                        <input  {...register("email", { required: "Email is required" })} type="email" className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-emerald-500 hover:shadow" placeholder="Enter email address" />
                        {errors.email && <p className='text-red-500' role="alert">{errors.email?.message}</p>}
                    </label>
                    <label htmlFor="password">
                        <p className="font-medium text-slate-700 pb-2">Password</p>
                        <input
                            {...register("password",
                                {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be 6 character"
                                    }
                                })}
                            type="password" className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-emerald-500 hover:shadow" placeholder="Enter your password" />
                        {errors.password && <p className='text-red-500' role="alert">{errors.password?.message}</p>}
                    </label>
                    <div className="flex flex-row justify-between">
                        <div>
                            <label htmlFor="remember" className="">
                                <input type="checkbox" id="remember" className="w-4 h-4 border-slate-200 focus:bg-emerald-400" />
                                Remember me
                            </label>
                        </div>
                        <div>
                            <Link to="/" className="font-medium text-emerald-400">Forgot Password?</Link>
                        </div>
                    </div>
                    <p className='text-red-400 text-center'>{loginError}</p>
                    <button type='submit' className="w-full py-3 font-medium text-white bg-emerald-400 hover:bg-emerald-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                        <span>Login</span>
                    </button>
                    <div className='flex justify-center'>
                        <p>Not registered yet? </p>
                        <Link to="/registration"
                            className="text-emerald-400 font-medium inline-flex space-x-1 items-center">
                            <span>Register now </span>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
};


export default Login;
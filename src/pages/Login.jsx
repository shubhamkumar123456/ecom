import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setLogin } from '../store/Auth';

const Login = () => {
    let emailRef = useRef();
    let passwordRef = useRef();
    let navigate = useNavigate();
    let dispatch = useDispatch();

    let database = JSON.parse(localStorage.getItem('ecom_redux')) || [];

    const handleSubmit = () => {
        let obj = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        if (!obj.email || !obj.password) {
            alert('Please fill in all fields.');
            return;
        }

        let findUser = database.find((ele) => ele.email === obj.email);

        if (findUser) {
            if (findUser.password === obj.password) {
                localStorage.setItem('ecomLogin', JSON.stringify({ email: obj.email }));
                dispatch(setLogin({ email: obj.email }));
                navigate('/');
            } else {
                alert('Incorrect password.');
            }
        } else {
            alert('User not found. Please sign up!');
        }
    };

    return (
        <div className="font-[sans-serif] ">
            <div className="h-[90vh] flex flex-col items-center justify-center py-6 px-4 bg-gray-100">
                <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
                            Welcome Back to <span className="text-blue-600">ShopEase</span>
                        </h2>
                        <p className="text-gray-700 mt-4 text-sm md:text-base">
                            Log in to your account to access exclusive deals, track your orders, and enjoy a seamless shopping experience.
                        </p>
                        <p className="mt-6 text-gray-700 text-sm md:text-base">
                            Don’t have an account?{' '}
                            <Link to="/register" className="text-blue-600 font-semibold hover:underline">
                                Register here
                            </Link>
                        </p>
                    </div>
                    <form className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
                        <h3 className="text-gray-800 text-3xl font-bold mb-6">Sign in</h3>
                        <div className="space-y-4">
                            <div>
                                <input
                                    ref={emailRef}
                                    type="email"
                                    placeholder="Email Address"
                                    className="w-full px-4 py-3 border rounded-md text-gray-800 focus:ring focus:ring-blue-200"
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    ref={passwordRef}
                                    type="password"
                                    placeholder="Password"
                                    className="w-full px-4 py-3 border rounded-md text-gray-800 focus:ring focus:ring-blue-200"
                                    required
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <input
                                        id="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 text-sm text-gray-800">
                                        Remember me
                                    </label>
                                </div>
                                <a
                                    href="/forgot-password"
                                    className="text-sm text-blue-600 hover:underline font-semibold"
                                >
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="mt-6 w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700"
                        >
                            Log In
                        </button>
                        <div className="mt-4 flex items-center justify-center space-x-4">
                            <hr className="w-1/3 border-gray-300" />
                            <span className="text-sm text-gray-600">or</span>
                            <hr className="w-1/3 border-gray-300" />
                        </div>
                        <div className="mt-6 flex justify-center space-x-6">
                            <button type="button" className="text-blue-600">
                                <i className="fab fa-google text-2xl"></i>
                            </button>
                            <button type="button" className="text-blue-800">
                                <i className="fab fa-facebook text-2xl"></i>
                            </button>
                            <button type="button" className="text-gray-600">
                                <i className="fab fa-apple text-2xl"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;

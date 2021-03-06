import React, { useEffect, useState } from 'react';
// import './signin.css'
import { Link, useNavigate } from "react-router-dom"
import { api } from "../../constants/baseUrl"
import axios from "axios"
import { toast, Toaster } from "react-hot-toast"
import Loader from '../../loader/loader'
require('./signin.css')


function Signin(props) {

    const navigate = useNavigate();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isLoading, setIsLoading] = useState(false)

    const [invalidCredentials, setInvalidCredentials] = useState(false);
    const [requiredError, setrequiredError] = useState(false);


    const login = (e) => {
        e.preventDefault()
        setInvalidCredentials(false)
        setrequiredError(false)
        if (!email || !password) {
            setrequiredError(true)
            return
        }
        setIsLoading(true)
        let payload = {
            email,
            password
        }
        axios.post(`${api}/users/login`, payload)
            .then(function (response) {
                toast.success(response.data.msg)
                localStorage.setItem('user', JSON.stringify(response.data.data))
                navigate('/products')
                setIsLoading(false)
            })
            .catch(function (error) {
                setInvalidCredentials(true)
                toast.error(error.response.data.msg)
                setIsLoading(false)
            });
    }

    useEffect(() => {
    }, [])

    const handleDarkModeClick = () => {
        document.querySelector(".dark-mode-btn").classList.toggle("active");
        document.body.classList.toggle("dark-mode-on");
    }


    return (
        <div className='signin-body'>
            <div><Toaster position="top-right" /></div>

            {!isLoading? 
            <div>
            <div className="wrapper">
                <div className="left">
                    <div className="left-inner">

                        <div className="sign-in-form active">
                            <h1>Sign in to E-commerce</h1>
                            <div className="social-buttons">
                                <a title="Sign in via Google">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#FFC107" />
                                        <path d="M3.15295 7.3455L6.43845 9.755C7.32745 7.554 9.48045 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.15895 2 4.82795 4.1685 3.15295 7.3455Z" fill="#FF3D00" />
                                        <path d="M12 22C14.583 22 16.93 21.0115 18.7045 19.404L15.6095 16.785C14.5718 17.5742 13.3038 18.001 12 18C9.39904 18 7.19053 16.3415 6.35853 14.027L3.09753 16.5395C4.75253 19.778 8.11354 22 12 22Z" fill="#4CAF50" />
                                        <path d="M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 16.7855L15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#1976D2" />
                                    </svg>
                                </a>

                                <a title="Sign in via Apple">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M17.5172 12.5555C17.5078 10.957 18.232 9.75234 19.6945 8.86406C18.8766 7.69219 17.6391 7.04766 16.0078 6.92344C14.4633 6.80156 12.7734 7.82344 12.1547 7.82344C11.5008 7.82344 10.0055 6.96563 8.82891 6.96563C6.40078 7.00313 3.82031 8.90156 3.82031 12.7641C3.82031 13.9055 4.02891 15.0844 4.44609 16.2984C5.00391 17.8969 7.01484 21.8133 9.1125 21.75C10.2094 21.7242 10.9852 20.9719 12.4125 20.9719C13.7977 20.9719 14.5148 21.75 15.7383 21.75C17.8547 21.7195 19.6734 18.1594 20.2031 16.5563C17.3648 15.218 17.5172 12.6375 17.5172 12.5555V12.5555ZM15.0539 5.40703C16.2422 3.99609 16.1344 2.71172 16.0992 2.25C15.0492 2.31094 13.8352 2.96484 13.1437 3.76875C12.382 4.63125 11.9344 5.69766 12.0305 6.9C13.1648 6.98672 14.2008 6.40313 15.0539 5.40703V5.40703Z" fill="#111111" />
                                    </svg>
                                </a>
                                <a title="Sign in via Facebook">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M13.397 20.997V12.801H16.162L16.573 9.59199H13.397V7.54799C13.397 6.62199 13.655 5.98799 14.984 5.98799H16.668V3.12699C15.8487 3.03918 15.0251 2.99678 14.201 2.99999C11.757 2.99999 10.079 4.49199 10.079 7.23099V9.58599H7.33203V12.795H10.085V20.997H13.397Z" fill="#3C5895" />
                                    </svg>
                                </a>
                            </div>

                            <div className="seperator">
                                <span>or do it via E-mail</span>
                            </div>

                            <form>
                                {invalidCredentials ? <div className="error-text">Invalid Credentials</div> : ''}
                                {requiredError ? <div className="error-text">All fields are required</div> : ''}
                                <div className="form-group">
                                    <label htmlFor="">E-mail</label>
                                    <input type="email" placeholder="@mail.com" onChange={e => setEmail(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Password</label>
                                    <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
                                </div>
                                <div className="form-group remember-forgot">
                                    <div className="remember">
                                        <input style={{width:'25px'}} type="checkbox" id="yes" name="bydefault" value="yes" className="form-checkbox" />
                                        <label htmlFor="yes">Remeber me</label>
                                    </div>
                                    <div className="forgot">
                                        <a className="forgot-pass-link">Forgot Password?</a>
                                    </div>
                                </div>
                                <div className="form-group" onClick={login}>
                                    <button>SIGN IN</button>
                                </div>
                                <div className="create-aacount">
                                    Not registered yet? <Link className="text-underline sign-up-form-btn" to="/signup">Create an Account</Link>
                                </div>
                            </form>
                        </div>

                        <div className="forgot-pass-form">
                            <h1>Forgot Password?</h1>

                            <form action="">
                                <div className="form-group">
                                    <label htmlFor="">E-mail</label>
                                    <input type="email" placeholder="@mail.com" />
                                </div>
                                <div className="form-group">
                                    <button>RESET PASSWORD</button>
                                </div>
                                <div className="create-aacount">
                                    <a className="go-to-sign-in">Go Back</a>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
                <div className="right">
                    <div className="right-inner">
                        <h2>Your favorite online store</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi nulla perferendis maiores id, sapiente accusamus quas deserunt eum officia. Mollitia maxime accusamus sapiente vero vel quasi autem ipsa neque numquam?</p>
                    </div>
                </div>
            </div>

            <a className="dark-mode-btn" onClick={handleDarkModeClick} style={{ cursor: 'pointer' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M21.55 1C23.15 3.4 24.1 6.3 24.1 9.4C24.15 17.75 17.3 24.5 8.85 24.5C6 24.5 3.3 23.7 1 22.35C3.6 27.5 8.95 31 15.15 31C23.9 31 31 24 31 15.35C31 8.95 27.1 3.45 21.55 1Z" fill="black" />
                </svg>
            </a>
            </div>
            : <Loader/>}

            
        </div>
    );

}

export default Signin;
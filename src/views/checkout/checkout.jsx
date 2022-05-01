import React, { useState, useEffect } from 'react';
import Header from '../header/header'
import Loader from '../loader/loader'
import './checkout.css'
import axios from "axios"
import { api } from "../constants/baseUrl"
import { toast, Toaster } from "react-hot-toast"
import { usePaystackPayment } from 'react-paystack';
import { useNavigate } from 'react-router-dom';



function Checkout(props) {

    const navigate = useNavigate();

    const [cart, setCart] = useState([])

    const [total, setTotal] = useState(0)

    // const getUser = () => {
    //     axios.get(`${api}/users/626d49665d1caf7e5ac948a5`)
    //         .then(function (response) {
    //             console.log(response.data.data.cart)
    //             setCart(response.data.data.cart)
    //             setTimeout(() => { calculateTotal() }, 100)
    //             calculateTotal()
    //         })
    //         .catch(function (error) {
    //             console.log(error)
    //         });
    // }
    const getCart = () => {
        setCart(JSON.parse(localStorage.getItem('cart')))
    }

    const handleGoBack = () => {
        navigate('/products')
    }

    const calculateTotal = () => {
        let a = 0
        cart.forEach(item => {
            a += item.price * 600
        })
        setTotal(a)
        console.log(a)
    }

    const config = {
        reference: (new Date()).getTime().toString(),
        email: "user@example.com",
        amount: total * 100,
        publicKey: 'pk_test_c2acf3e0b338b249db1a5fc49e96fc56d607a32a',
    };

    const initializePayment = usePaystackPayment(config);


    // you can call this function anything
    const onSuccess = (reference) => {
        // Implementation for whatever you want to do with reference and after success call.
        console.log(reference);
    };

    // you can call this function anything
    const onClose = () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        console.log('closed')
    }


    useEffect(() => {
        // getUser()
        getCart()
    }, [])

    useEffect(() => {
        calculateTotal()
    },[cart])

    return (
        <div>
            <Header />
            {cart.length > 0 ?
                <div className='checkout-body'>
                    <h1 onClick={handleGoBack} style={{cursor:'pointer'}}><i className='fa fa-arrow-left'></i></h1>
                    <header>
                        <h3>Checkout</h3>
                    </header>

                    <main>

                        <section className="checkout-form">
                            <form action="#!" method="get">
                                <h6>Contact information</h6>
                                <div className="form-control">
                                    <label htmlFor="checkout-email">E-mail</label>
                                    <div>
                                        <span className="fa fa-envelope"></span>
                                        <input type="email" id="checkout-email" name="checkout-email" placeholder="Enter your email..." />
                                    </div>
                                </div>
                                <div className="form-control">
                                    <label htmlFor="checkout-phone">Phone</label>
                                    <div>
                                        <span className="fa fa-phone"></span>
                                        <input type="tel" name="checkout-phone" id="checkout-phone" placeholder="Enter you phone..." />
                                    </div>
                                </div>
                                <br />
                                <h6>Shipping address</h6>
                                <div className="form-control">
                                    <label htmlFor="checkout-name">Full name</label>
                                    <div>
                                        <span className="fa fa-user-circle"></span>
                                        <input type="text" id="checkout-name" name="checkout-name" placeholder="Enter you name..." />
                                    </div>
                                </div>
                                <div className="form-control">
                                    <label htmlFor="checkout-address">Address</label>
                                    <div>
                                        <span className="fa fa-home"></span>
                                        <input type="text" name="checkout-address" id="checkout-address" placeholder="Your address..." />
                                    </div>
                                </div>
                                <div className="form-control">
                                    <label htmlFor="checkout-city">City</label>
                                    <div>
                                        <span className="fa fa-building"></span>
                                        <input type="text" name="checkout-city" id="checkout-city" placeholder="Your city..." />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="form-control">
                                        <label htmlFor="checkout-country">Country</label>
                                        <div>
                                            <span className="fa fa-globe"></span>
                                            <input type="text" name="checkout-country" id="checkout-country" placeholder="Your country..." list="country-list" />
                                            <datalist id="country-list">
                                                <option value="Nigeria"></option>
                                                <option value="India"></option>
                                                <option value="USA"></option>
                                                <option value="Russia"></option>
                                                <option value="Japan"></option>
                                                <option value="Egypt"></option>
                                            </datalist>
                                        </div>
                                    </div>
                                    <div className="form-control">
                                        <label htmlFor="checkout-postal">Postal code</label>
                                        <div>
                                            <span className="fa fa-archive"></span>
                                            <input type="numeric" name="checkout-postal" id="checkout-postal" placeholder="Your postal code..." />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-control checkbox-control">
                                    <input type="checkbox" name="checkout-checkbox" id="checkout-checkbox" />
                                    <label htmlFor="checkout-checkbox">Save this information for next time</label>
                                </div>
                                <div className="form-control-btn">
                                    <button onClick={() => { initializePayment(onSuccess, onClose) }}>Proceed to payment</button>
                                </div>
                            </form>
                        </section>

                        <section className="checkout-details">
                            <div className="checkout-details-inner">
                                <div className="checkout-lists">
                                    {cart.map(item => {
                                        return (
                                            <div key={item._id} className="card">
                                                <div className="card-image"><img src={item.image} alt="" /></div>
                                                <div className="card-details">
                                                    <div className="card-name">{item.title}</div>
                                                    <div className="card-price">₦{item.price * 600}</div>
                                                    <div className="card-wheel">
                                                        <button>-</button>
                                                        <span>1</span>
                                                        <button>+</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="checkout-shipping">
                                    <h6>Shipping</h6>
                                    <p>₦{Math.round(total / 15)}</p>
                                </div>
                                <div className="checkout-total">
                                    <h6>Total</h6>
                                    <p>₦{Math.round(total)}</p>
                                </div>
                            </div>
                        </section>

                    </main>

                </div>
                : <Loader />}


        </div>
    );
}

export default Checkout;
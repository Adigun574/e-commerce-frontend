import React, { useEffect, useState } from 'react';
// import './products.css';
import Header from '../header/header'
import Loader from '../loader/loader'
import axios from "axios"
import { api } from "../constants/baseUrl"
import { toast, Toaster } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
require('./products.css')

function Products(props) {

    const navigate = useNavigate();

    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const getProducts = () => {
        axios.get(`${api}/products`)
            .then(function (response) {
                setProducts(response.data.data)
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    const handleAddTocart = (product, i) => {
        setCart([...cart, product])
        toast.success(`${product.title} added to cart`)
    }

    const handleCheckout = () => {
        // console.log(cart)
        if(cart.length < 1){
            return
        }
        setIsLoading(true)
        axios.post(`${api}/products/add-to-cart/${user._id}`, cart)
            .then(function (response) {
                console.log(response)
                setIsLoading(false)
                localStorage.setItem('cart', JSON.stringify(cart))
                navigate('/checkout')
            })
            .catch(function (error) {
                console.log(error)
                toast.error(error.response.data.msg)
                setIsLoading(false)
            });
    }

    const handleRouteToDetails = (product) => {
        navigate(`/products/${product._id}`)
    }

    const getUserFromLocalStorage = () => {
       setUser(JSON.parse(localStorage.getItem('user')))
    }

    const getUser = () => {
        axios.get(`${api}/users/${user._id}`)
            .then(function (response) {
                console.log(response)
                // console.log(response.data.data.cart)
                setCart(response.data.data.cart)

            })
            .catch(function (error) {
                console.log(error)
            });
    }

    useEffect(() => {
        getProducts()
    }, [])

    useEffect(() => {
        getUserFromLocalStorage()
    }, [])

    useEffect(() => {
        if(user){
            getUser()
        }
    }, [user])


    return (
        <div>
            <Header />
            {isLoading ? <Loader/> : ''}
            <div className='products-body'>
                <div><Toaster position="top-right" /></div>
                <div className="products-body">
                    <ul className="mystyle-products">
                        {
                            products.length > 0 ?
                                products.map((product, i) => {
                                    return (
                                        <li key={product._id} className="product" style={{ marginLeft: '20px' }}>
                                            <a>
                                                <span className="onsale">Sale!</span>
                                                <div style={{ maxHeight: '200px', overflowY: 'hidden' }}>
                                                    <img alt="" className="attachment-shop_catalog " src={product.image} />
                                                </div>
                                                <h3>{product.title}</h3>
                                                <h3>{product.category}</h3>
                                                <span className="price">
                                                    <ins> <span className="amount">₦{product.price * 600}</span> </ins>
                                                </span>
                                            </a>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <p style={{ color: '#f6b01e', cursor: 'pointer' }}>
                                                    <i className='fa fa-star'></i>
                                                    <i className='fa fa-star'></i>
                                                    <i className='fa fa-star'></i>
                                                    <i className='fa fa-star'></i>
                                                    <i className='fa fa-star'></i>
                                                </p>
                                                <h2 onClick={e => handleAddTocart(product, i)}><i
                                                    style={{ color: 'white', backgroundColor: '#1e3069', borderRadius: '50%', padding: '10px', cursor: 'pointer' }}
                                                    className='fa fa-plus'></i>
                                                </h2>
                                            </div>
                                            <div style={{ borderTop: '1px solid #eee', paddingTop: '10px' }}>
                                                <small style={{ fontSize: '11px' }}>{product.description.substr(0, 100)}...</small>
                                                <p onClick={e => {handleRouteToDetails(product)}} style={{fontSize:'12px', backgroundColor:'#1e3069', color:'white', padding:'5px', width:'50px', borderRadius:'5px', marginLeft:'auto', cursor:'pointer'}}>Details</p>
                                            </div>

                                        </li>
                                    )
                                })
                                : <Loader />
                        }

                    </ul>

                    <div onClick={handleCheckout} style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: '10', cursor: 'pointer' }}>
                        <h1><i style={{ color: '#1e3069', fontSize: '50px' }} className='fa fa-shopping-cart'></i></h1>
                        <h5 style={{ position: 'absolute', top: '-15px', right: '-10px' }}><span style={{ color: 'white', backgroundColor: '#1e3069', borderRadius: '50%', padding: '5px' }}>{cart.length}</span></h5>
                    </div>
                </div>


            </div>
        </div>

    )
}

export default Products;
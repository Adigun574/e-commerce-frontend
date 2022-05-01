import React, { useEffect } from 'react';
import Header from '../header/header'
import { Link, useNavigate } from "react-router-dom"



function ProductDetail(props) {

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/products')
    }

    

    return (
        <div>
            <Header />
            <div style={{padding:'50px'}}>
                <button onClick={handleGoBack}><i className='fa fa-arrow-left'></i> Back</button>
                <h1>Product Details</h1>
            </div>
            
        </div>
    );
}

export default ProductDetail;
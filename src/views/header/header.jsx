import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom'

function Header(props) {

    const navigate = useNavigate();

    const [user, setUser] = useState({})

    const handleLogout = () => {
        localStorage.clear()
        navigate('/')
    }

    const getUserFromLocalStorage = () => {
        setUser(JSON.parse(localStorage.getItem('user')))
    }

    useEffect(()=>{
        getUserFromLocalStorage()
    },[])

    return (
        <div style={{height:'80px', width:'100%', backgroundColor:'#1e306a', color:'white', padding:'0 50px', marginBottom:'30px'}}>
            <div style={{display:'flex', justifyContent:'space-between', paddingTop:'25px'}}>
                <h3>E-commerce</h3>
                <div>
                    <div style={{display:'flex'}}>
                        <h3 style={{marginRight:'10px'}}><i className='fa fa-user'></i></h3>
                        <h3 style={{textTransform:'capitalize'}}>{user.name}</h3>
                        <h3 onClick={handleLogout} style={{marginLeft:'10px', cursor:'pointer'}}><i className='fa fa-sign-out'></i></h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
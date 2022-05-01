import logo from './logo.svg';
import './App.css';
import Signin from './views/auth/signin/signin';
import Signup from './views/auth/signup/signup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Products from './views/products/products';
import ProductDetail from './views/product-details.jsx/productDetail';
import Checkout from './views/checkout/checkout';

function App() {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Signin/>}/>
          <Route exact path="/signup" element={<Signup/>}/>
          <Route exact path="/products" element={<Products/>}/>
          <Route exact path="/products/:id" element={<ProductDetail/>}/>
          <Route exact path="/checkout" element={<Checkout/>}/>
        </Routes>
    </Router>
  );
}

export default App;

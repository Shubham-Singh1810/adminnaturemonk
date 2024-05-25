import React from 'react'
import {Route, Routes} from "react-router-dom"
import AddProduct from "../pages/AddProduct"
import ProductList from '../pages/ProductList'
import Dashboard from '../pages/Dashboard'
import AddProductStep2 from '../pages/AddProductStep2'
import BannerList from '../pages/BannerList'
import AddBanner from '../pages/AddBanner'
import UserList from '../pages/UserList'
import ActiveOrder from '../pages/ActiveOrder'
import DeliveredOrder from '../pages/DeliveredOrder'
function AllRoute() {
  return (
    <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/addProduct" element={<AddProduct/>}/>
        <Route path="/addProduct/:id" element={<AddProduct/>}/>
        <Route path="/addProductstep2/:id" element={<AddProductStep2/>}/>
        <Route path="/products" element={<ProductList/>}/>
        <Route path="/banners" element={<BannerList/>}/>
        <Route path="/addBanner" element={<AddBanner/>}/>
        <Route path="/users" element={<UserList/>}/>
        <Route path="/activeOrder" element={<ActiveOrder/>}/>
        <Route path="/deliveredOrder" element={<DeliveredOrder/>}/>
    </Routes>
  )
}

export default AllRoute
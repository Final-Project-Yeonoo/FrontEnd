import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route, Link, useNavigate, Outlet, Router} from 'react-router-dom'
import Login from "./components/login/Login";
import ProductManagement from "./components/masterData/ProductManagement";
import React from "react";
import DashBoard from "./components/dashboard/DashBoard";
import StoreManagement from "./components/masterData/StoreManagement";
import TradingCompany from "./components/masterData/TradingCompany";
import AdminUser from "./components/admin/AdminUser";
import SearchUser from "./components/admin/SearchUser";
import UserList from "./components/admin/UserList";
import OrderItem from "./components/purchase/OrderItem";
import PurchaseItem from "./components/purchase/PurchaseItem";
import InvenManage from "./components/inventory/InvenManage";
import InvenCheck from "./components/inventory/InvenCheck";
import Mypage from "./components/mypage/Mypage";
import List from "./components/admin/UserList";
import MyComInfo from './components/admin/MyComInfo';
import Yougeun from './components/yougeun/yougeun';



function App() {
    return (
        <>

     
        {/* 여기에서는 DASHBOARD만 렌더링 해주면 됩니디.  */}
        {/* <DashBoard /> */}
            <Routes>
                <Route path="/login" element={<Login/>}/>
                {/*Header&Side포함 DashBoard에 nestedRoute 적용*/}
                <Route path="/" element={<DashBoard/>}>
                        {/*사용자*/}
                        <Route path="admin/user" element={<AdminUser/>}/>
                        <Route path="admin/search" element={<SearchUser/>}/>
                        <Route path="admin/list" element={<UserList/>}/>
                        {/*기준 정보*/}
                        <Route path="masterData/info" element={<TradingCompany/>}/>
                        <Route path="masterData/product" element={<ProductManagement/>}/>
                        <Route path="masterData/store" element={<StoreManagement/>}/>
                        {/*구매*/}
                        <Route path="purchase/order" element={<OrderItem/>}/>
                        <Route path="purchase/buy" element={<PurchaseItem/>}/>
                        {/*재고*/}
                        <Route path="inventory/manage" element={<InvenManage/>}/>
                        <Route path="inventory/check" element={<InvenCheck/>}/>
                        <Route path="yougeun" element={<Yougeun/>}/>
                    <Route path="mypage" element={<Mypage/>}/>
                </Route>
                <Route path="*" element={<div>없는 페이지 입니다.</div>}/>
            </Routes>

        </>
    );

}

export default App

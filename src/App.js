import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route, Link, useNavigate, Outlet, Router} from 'react-router-dom'
import Login from "./components/login/Login";
import ProductManagement from "./components/masterData/ProductManagement";
import React from "react";
import DashBoard from "./components/dashboard/DashBoard";
import StoreManagement from "./components/masterData/StoreManagement";
import TradingCompany from "./components/masterData/TradingCompany";
import ChangeArea from "./components/common/ChangeArea";
import AdminUser from "./components/admin/AdminUser";
import SearchUser from "./components/admin/SearchUser";
import UserList from "./components/admin/UserList";
import OrderItem from "./components/purchase/OrderItem";
import PurchaseItem from "./components/purchase/PurchaseItem";
import InvenManage from "./components/inventory/InvenManage";
import InvenCheck from "./components/inventory/InvenCheck";
import Mypage from "./components/mypage/Mypage";


function App() {
    return (
        <>
            <Routes>
                <Route path="/login" element={<Login/>}/>

                <Route path="/" element={<DashBoard/>}>
                    <Route path="admin" element={<div>사용자관리</div>}>
                        <Route path="user" element={<AdminUser/>}/>
                        <Route path="search" element={<SearchUser/>}/>
                        <Route path="list" element={<UserList/>}/>
                    </Route>
                    <Route path="masterData" element={<div>기준정보</div>}>
                        <Route path="info" element={<TradingCompany/>}/>
                        <Route path="product" element={<ProductManagement/>}/>
                        <Route path="store" element={<StoreManagement/>}/>
                    </Route>
                    <Route path="purchase" element={<div>구매</div>}>
                        <Route path="order" element={<OrderItem/>}/>
                        <Route path="buy" element={<PurchaseItem/>}/>
                    </Route>
                    <Route path="inventory" element={<div>재고</div>}>
                        <Route path="manage" element={<InvenManage/>}/>
                        <Route path="check" element={<InvenCheck/>}/>
                    </Route>
                    <Route path="mypage" element={<Mypage/>}/>
                </Route>
                <Route path="*" element={<div>없는 페이지 입니다.</div>}/>
            </Routes>

        </>
    )
        ;
}

export default App

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route, Link, useNavigate, Outlet, Router} from 'react-router-dom'
import Login from "./components/login/Login";
import ProductManagement from "./components/masterData/ProductManagement";
import React from "react";
import DashBoard from "./components/dashboard/DashBoard";



function App() {
    return (
        <>
            <Routes>
                <Route path="/login" element={<Login/>}/>

                <Route path="/" element={<DashBoard/>}>
                    <Route path="admin" element={<div>사용자관리</div>}>
                        <Route path="user" element={<div>개인정보관리</div>}/>
                        <Route path="manage" element={<div>권한관리</div>}/>
                    </Route>
                    <Route path="masterData" element={<div>기준정보</div>}>
                        <Route path="info" element={<div>기본정보</div>}/>
                        <Route path="product" element={<ProductManagement/>}/>
                        <Route path="store" element={<div>창고정보</div>} d/>
                    </Route>
                    <Route path="purchase" element={<div>구매</div>}>
                        <Route path="order" element={<div>구매발주관리</div>}/>
                        <Route path="buy" element={<div>구매입고권리</div>}/>
                    </Route>
                    <Route path="inventory" element={<div>재고</div>}>
                        <Route path="manage" element={<div>입고관리</div>}/>
                        <Route path="check" element={<div>재고현황</div>}/>
                    </Route>
                    <Route path="mypage" element={<div>마이페이지</div>}/>
                </Route>

                    <Route path="*" element={<div>없는 페이지 입니다.</div>}/>
            </Routes>

        </>
    )
        ;
}

export default App

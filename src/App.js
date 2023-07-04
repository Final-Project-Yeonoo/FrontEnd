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
import StoreYougeun from './components/yougeun/StoreYougeun';
import Yougeun2 from './components/yougeun/Yougeun2';
import RegisterProject from './yougeunWorking/Yougeun01';
import RegisterEstimate from './yougeunWorking/Yougeun02';
import ManageSalesOrder from './yougeunWorking/Yougeun03';
import CreateWorkOrder from './yougeunWorking/Yougeun04';
import AnalyzeMaterialRequirement from './yougeunWorking/Yougeun05';
import PlacePurchaseOrder from './yougeunWorking/Yougeun06';
import RegisterPurchaseReceipt from './yougeunWorking/Yougeun07';
import RegisterPerformance from './yougeunWorking/Yougeun08';
import RegisterDelivery from './yougeunWorking/Yougeun09';
import RegisterReturn from './yougeunWorking/Yougeun10';
import Piechart from './chart/PieChart';
import Barchart from './chart/BarChart';
import LineChart from './chart/LineCharts';
import Message from "./components/common/Message";
import MyComInfo from "./components/admin/MyComInfo";
import errorPage from "./components/errorPage/ErrorPage";
import ErrorPage from "./components/errorPage/ErrorPage";


function App() {
    return (
        <>
            
            {/* 여기에서는 DASHBOARD만 렌더링 해주면 됩니디.  */}
            {/* <DashBoard /> */}
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/" element={<DashBoard/>}>
                    <Route path='/' element={
                        <>
                        <div style={{margin: 'auto 0'}}>
                            <div style={{marginBottom: '20px'}}><LineChart/></div>
                            <div style={{display: 'flex', marginLeft:'80px'}}>
                                <Barchart/>
                                <Piechart/>
                            </div>
                        </div>    
                        </>
                    }/>
                   
                        {/*사용자*/}
                        <Route path="admin/user" element={<AdminUser/>}/>
                        <Route path="user/search" element={<SearchUser/>}/>
                        <Route path="admin/mycom" element={<MyComInfo />} />
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
                        <Route path="yougeun" element={<Yougeun2/>}/>
                        <Route path="yougeun2" element={<StoreYougeun/>}/>
                       
                    <Route path="register/prj" element={<RegisterProject/>}/>
                    <Route path="register/est" element={<RegisterEstimate/>}/>
                    <Route path="sales/order" element={<ManageSalesOrder/>}/>
                    <Route path="prod/order" element={<CreateWorkOrder/>}/>
                    <Route path="analyze/require" element={<AnalyzeMaterialRequirement/>}/>
                    <Route path="place/poder" element={<PlacePurchaseOrder/>}/>
                    <Route path="register/receipt" element={<RegisterPurchaseReceipt/>}/>
                    <Route path="register/perf" element={<RegisterPerformance/>}/>
                    <Route path="register/delivery" element={<RegisterDelivery/>}/>
                    <Route path="register/back" element={<RegisterReturn/>}/>
                    <Route path="message" element={<Message/>}/>
                    <Route path="mypage" element={<Mypage/>}/>
                    
                </Route>
                <Route path="*" element={<ErrorPage/>}/>
            </Routes>

        </>
    );

}

export default App

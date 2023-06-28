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
import Yougeun from './components/yougeun/yougeun';
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
import Yougeun1 from './components/yougeun/Yougeun1';
import Message from "./components/common/Message";
import MyComInfo from "./components/admin/MyComInfo";

function App() {
    return (
        <>


            {/* 여기에서는 DASHBOARD만 렌더링 해주면 됩니디.  */}
            {/* <DashBoard /> */}
            <Routes>
                <Route path="/login" element={<Login/>}/>
                {/*Header&Side포함 DashBoard에 nestedRoute 적용*/}
                <Route path="/" element={<DashBoard/> }>
                <Route path='/' element={<Barchart/>}    />
                        <Route path='/' element={<Piechart/>} />
                        {/*사용자*/}
                        <Route path="admin/user" element={<AdminUser/>}/>
                        <Route path="admin/search" element={<SearchUser/>}/>
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
                        {/*유근작업중
                            1. 프로젝트 등록
                            2. 견적서 등록
                            3. 수주서 관리
                            4. 작업지시
                            5. 자재소요분석
                            6. 구매 발주
                            7. 구매입고등록
                            8. 실적등록
                            9. 납품등록
                            10. 반품등록
                        */}
                        <Route path="yougeun01" element={<RegisterProject/>}/>
                        <Route path="yougeun02" element={<RegisterEstimate/>}/>
                        <Route path="yougeun03" element={<ManageSalesOrder/>}/>
                        <Route path="yougeun04" element={<CreateWorkOrder/>}/>
                        <Route path="yougeun05" element={<AnalyzeMaterialRequirement/>}/>
                        <Route path="yougeun06" element={<PlacePurchaseOrder/>}/>
                        <Route path="yougeun07" element={<RegisterPurchaseReceipt/>}/>
                        <Route path="yougeun08" element={<RegisterPerformance/>}/>
                        <Route path="yougeun09" element={<RegisterDelivery/>}/>
                        <Route path="yougeun10" element={<RegisterReturn/>}/>
                    <Route path="message" element={<Message/>}/>
                    <Route path="mypage" element={<Mypage/>}/>
                </Route>
                <Route path="*" element={<div>없는 페이지 입니다.</div>}/>
            </Routes>

        </>
    );

}

export default App

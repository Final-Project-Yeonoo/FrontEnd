import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/DashBoard";


function App() {

    return (
        <>
            <Routes>

                <Route path="/" element={<Dashboard/>}/>
                <Route path="/login" element={<Login/>}/>

                {/*Nested routes : /about/member /about/location으로 이동 가능*/}
                {/*<Route path="/about" element={ <About/> } >*/}
                {/*    <Route path="member" element={ <div>멤버들</div> } />*/}
                {/*    <Route path="location" element={ <div>회사위치</div> } />*/}
                {/*</Route>*/}

                {/*<Route path="/user" element={<AdminUser/>} />*/}
                <Route path="*" element={<div>없는 페이지 입니다.</div>}/>
            </Routes>
        </>
    );
}

export default App;

// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/DashBoard";
import AdminUser from './components/admin/User';
import Header from './components/common/Header';
// import SideMenu from './components/common/SideMenu';
 

function App() {

    return (
        <>  
        <Header /> 
        {/* <SideMenu />  */}
        <AdminUser />
        {/* <Routes>
            <Route path='admin'>
                <Route path='user' element={<AdminUser />}/>
            </Route>
            <Route path='aa'>
                <Route path='bbb' element={<AdminUser />}/>
            </Route>

        </Routes> */}
       
        </>
    
        );
}

export default App;

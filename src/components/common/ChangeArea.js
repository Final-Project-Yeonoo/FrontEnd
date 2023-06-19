import styles from './css/ChangeArea.module.css';
import { Routes, Route } from 'react-router-dom';
import ProductManagement from "../masterData/ProductManagement";
import StoreManagement from "../masterData/StoreManagement";
import TradingCompany from "../masterData/TradingCompany";
import Mypage from "../mypage/Mypage";
import InvenCheck from "../inventory/InvenCheck";
import Import from "../inventory/Import";
import PurchaseItem from "../purchase/PurchaseItem";
import OrderItem from "../purchase/OrderItem";
import AdminUser from "../admin/AdminUser";
import SearchUser from "../admin/SearchUser";
import UserList from "../admin/UserList";

function ChangeArea(){
    return(
        <>
            <div className={styles.changeArea}>
                <Routes>
                    <Route path="/admin/user" element={<AdminUser/>} />
                    <Route path="/admin/search" element={<SearchUser/>} />
                    <Route path="/admin/list" element={<UserList/>} />

                    <Route path="/masterData/info" element={<TradingCompany />} />
                    <Route path="/masterData/product" element={<ProductManagement />} />
                    <Route path="/masterData/store" element={<StoreManagement />} />

                    <Route path="/purchase/order" element={<OrderItem/>} />
                    <Route path="/purchase/buy" element={<PurchaseItem/>} />

                    <Route path="/inventory/manage" element={<Import/>} />
                    <Route path="/inventory/check" element={<InvenCheck/>} />

                    <Route path="/mypage" element={<Mypage/>} />
                </Routes>
            </div>
        </>
    );
}

export default ChangeArea
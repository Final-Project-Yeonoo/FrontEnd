import './css/DashBoard.module.css';
import Header from "../common/Header";
import SideMenu from "../common/SideMenu";
import ChangeArea from "../common/ChangeArea";
import ProductManagement from "../masterData/ProductManagement";

function DashBoard () {

    return (
        <>
            <Header/>
            <div style={{display: 'flex'}}>
                <SideMenu/>
                <ChangeArea/>
            </div>
        </>
    );
}

export default DashBoard;
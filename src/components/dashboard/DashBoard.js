import styles from './css/DashBoard.module.css';
import Header from "../common/Header";
import SideMenu from "../common/SideMenu";
import {Outlet} from "react-router-dom";
import Piechart from '../../chart/PieChart';
function DashBoard() {

    return (
        <>
            <Header/>
            <div className={styles.mainStyle}>
                <SideMenu/>
                <div className={styles.changeArea}>
                    <div className={styles.piechartContainer}>
                    <p className={styles.piechartHead}>재고현황</p>    
                    <Piechart />
                    </div>
                <Outlet/>
                </div>
            </div>
        </>
    );
}

export default DashBoard;
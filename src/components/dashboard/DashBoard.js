import styles from './css/DashBoard.module.css';
import Header from "../common/Header";
import SideMenu from "../common/SideMenu";
import {Outlet} from "react-router-dom";

function DashBoard() {

    return (
        <>
            <Header/>
            <div className={styles.mainStyle}>
                <SideMenu/>
                <div className={styles.changeArea}>
                    <Outlet/>
                </div>
            </div>
        </>
    );
}

export default DashBoard;
import styles from './css/DashBoard.module.css';
import Header from "../common/Header";
import SideMenu from "../common/SideMenu";
import {Outlet} from "react-router-dom";
import {useState} from "react";


function DashBoard() {

    return (
        <>
            <Header/>
            <div className={styles.mainStyle}>
                <SideMenu/>
                <div className={styles.changeArea}>
                    <div className={styles.topNav}>
                        <TabBar />
                    </div>
                    <Outlet/>
                </div>
            </div>
        </>
    );
}



function TabBar() {
    const [tabs, setTabs] = useState([]); // 탭 목록을 관리하는 상태

    // 탭 추가 함수
    const addTab = (tabId) => {
        if (!tabs.includes(tabId)) {
            setTabs([...tabs, tabId]);
        }
    };

    // 탭 제거 함수
    const removeTab = (tabId) => {
        setTabs(tabs.filter((tab) => tab !== tabId));
    };

    // 탭 목록 콘솔 출력
    console.log(tabs);


    return (
        <div className={styles.tabBar}>
            {tabs.map((tab) => (
                <TabItem key={tab} tabId={tab} onCloseClick={removeTab} />
            ))}
        </div>
    );
}

function TabItem({ tabId, onCloseClick }) {
    return (
        <div className={styles.tabItem}>
            <span>탭 {tabId}</span>
            <button className={styles.tabCloseBtn} onClick={() => onCloseClick(tabId)}>
                X
            </button>
        </div>
    );
}

export {DashBoard, TabBar, TabItem};
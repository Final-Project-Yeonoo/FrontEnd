import styles from './css/DashBoard.module.css';
import Header from "../common/Header";
import SideMenu from "../common/SideMenu";
import Piechart from '../../chart/PieChart';
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";


function DashBoard() {
    const [tabs, setTabs] = useState([]); // 탭 목록을 관리하는 상태
    const navigate = useNavigate();
    const path = useLocation().pathname; // 현재 경로를 가져옴
    console.log('path 입니다', path);

    // 탭 추가 함수
    const addTab = (tabId, tabPath) => { // tabId와 tabPath 매개 변수 받음
        if (!tabs.some(tab => tab.id === tabId)) { // tabId가 이미 존재하는지 확인
            const newTab = {id: tabId, path: tabPath}; // 새로운 탭 객체 생성
            setTabs([...tabs, newTab]); // tabs 배열에 새로운 탭 추가
        }
    };

    // 탭 제거 함수
    const handleTabClose = (tabId) => {
        const tabIndex = tabs.findIndex((tab) => tab.id === tabId); // 탭의 인덱스를 찾음
        const newTabs = tabs.filter((tab) => tab.id !== tabId);
        setTabs(newTabs);

        const nextTab = newTabs[tabIndex - 1]; // 이전 탭을 찾음
        if (nextTab) {
            navigate(nextTab.path); // 이전 탭으로 페이지 전환
            console.log("Navigating to:", nextTab.path);
        } else if (newTabs.length > 0) {
            navigate(newTabs[0].path); // 첫 번째 탭으로 페이지 전환
            console.log("Navigating to the first tab:", newTabs[0].path);
        } else {
            console.log("Navigating to Dashboard");
            navigate('/');
        }
    };

    // 탭 목록 콘솔 출력
    console.log(tabs);

    return (
        <>
            <Header/>
            <div className={styles.mainStyle}>
                <SideMenu addTab={addTab} path={path}/>
                <div className={styles.changeArea}>
                {/* <Outlet/> */}
                    <div className={styles.topNav}>
                        <TabBar tabs={tabs} onCloseTab={handleTabClose}/>
                    </div>
                    <Outlet/>
                </div>
            </div>
        </>
    );
}

function TabBar({tabs, onCloseTab}) { // TabBar 컴포넌트에 tabs(state 배열)와 onCloseTab을 받음
    const navigate = useNavigate();


    // 클릭하면 해당 path로 이동
    const handleTabClick = (path) => {
        navigate(path);
    };

    return (
        <div className={styles.tabBar}>
            {tabs.map((tab) => (  // 하나씩 꺼냄
                <div key={tab.id}
                     className={styles.tabItem}
                     onClick={() => handleTabClick(tab.path)}
                >
                    <span>{tab.id}</span>
                    <button
                        className={styles.tabCloseBtn}
                        onClick={(e) => {
                            e.stopPropagation();
                            onCloseTab(tab.id)}}
                    >
                       x
                    </button>
                </div>
            ))}
        </div>
    );
}


export default DashBoard;
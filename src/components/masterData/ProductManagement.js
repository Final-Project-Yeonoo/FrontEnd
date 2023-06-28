import React, {useEffect, useState} from "react";
import styles from './css/ProductManagement.module.css'
import Nav from "react-bootstrap/Nav";
import {ProductManagementRawTable, OrangeInputforRaw} from "./ProductManagementRawTable";
import {ProductManagementHalfTable, OrangeInputforHalf} from "./ProductManagementHalfTable";
import {ProductManagementFullTable, OrangeInputforFull} from "./ProductManagementFullTable";

function ProductManagement() {

    let [tab, setTab] = useState(0)

    return (
        <>

            <section className={styles.navLeft}>
                <Nav variant="tabs" defaultActiveKey="0">
                    <Nav.Item>
                        <Nav.Link eventKey="0" onClick={() => {
                            setTab(0)
                        }}>원자재</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="1" onClick={() => {
                            setTab(1)
                        }}>반제품</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="2" onClick={() => {
                            setTab(2)
                        }}>제품</Nav.Link>
                    </Nav.Item>
                </Nav>

                <TabContent tab={tab}/>

            </section>

        </>
    );
}


function TabContent({tab}) {

    return (
        <div>
            {tab === 0 && (
                <div>
                    <section className={styles.searchBox} style={{marginBottom: '30px'}}>
                        <OrangeInputforRaw/>
                    </section>
                    <section className={styles.tableArea}>
                        <ProductManagementRawTable/>
                    </section>
                </div>
            )}

            {tab === 1 && (
                <div>
                    <section className={styles.searchBox} style={{marginBottom: '30px'}}>
                        <OrangeInputforHalf/>
                    </section>
                    <section className={styles.tableArea}>
                        <ProductManagementHalfTable/>
                    </section>
                </div>
            )}

            {tab === 2 && (
                <div>
                    <section className={styles.searchBox} style={{marginBottom: '30px'}}>
                        <OrangeInputforFull/>
                    </section>
                    <section className={styles.tableArea}>
                        <ProductManagementFullTable/>
                    </section>
                </div>
            )}
        </div>
    );
}

//
//
// function TabContent({ tab }) {
//     const [content, setContent] = useState('');
//
//     useEffect(() => {
//         // 페이지 로드 시 저장된 데이터 불러오기
//         const savedContent = localStorage.getItem(`tab${tab}Content`);
//         if (savedContent) {
//             setContent(savedContent);
//         }
//     }, [tab]);
//
//     const handleContentChange = (event) => {
//         const newContent = event.target.value;
//         setContent(newContent);
//
//         // 글이 변경될 때마다 로컬 스토리지에 저장
//         localStorage.setItem(`tab${tab}Content`, newContent);
//     };
//
//     return (
//         <div>
//             {tab === 0 && (
//                 <div>
//                     <section className={styles.searchBox} style={{marginBottom: '30px'}}>
//                         <OrangeInputforRaw/>
//                     </section>
//                     <section className={styles.tableArea}>
//                         <ProductManagementRawTable/>
//                     </section>
//                 </div>
//             )}
//
//             {tab === 1 && (
//                 <div>
//                     <section className={styles.searchBox} style={{marginBottom: '30px'}}>
//                         <OrangeInputforHalf value={content} onChange={handleContentChange}/>
//                     </section>
//                     <section className={styles.tableArea}>
//                         <ProductManagementHalfTable/>
//                     </section>
//                 </div>
//             )}
//
//             {tab === 2 && (
//                 <div>
//                     <section className={styles.searchBox} style={{marginBottom: '30px'}}>
//                         <OrangeInputforFull/>
//                     </section>
//                     <section className={styles.tableArea}>
//                         <ProductManagementFullTable/>
//                     </section>
//                 </div>
//             )}
//         </div>
//     );
// }
//


export default ProductManagement;


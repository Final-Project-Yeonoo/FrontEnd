import React from "react";
import styles from './css/ProductManagement.module.css'
import {ColorfulButtons, GrayButtons, TableExample, InputType, InputSelect}
    from "../common/UsefulComponents";


function ProductManagement() {
    return (
        <>
            <div id={styles.divideSections}>
                <section className={styles.buttonsArea}>
                    <div className={styles.navLeft}>
                        <GrayButtons/>
                    </div>
                    <div className={styles.navRight}>
                        <ColorfulButtons/>
                    </div>
                </section>

                <section className={styles.searchBox}>
                        <div className={styles.searchSection1}>
                            <InputSelect/>
                            <InputType/>
                        </div>
                        <div className={styles.searchSection2}>
                            <InputSelect/>
                            <InputType/>
                        </div>
                </section>

                <section className={styles.tableArea}>
                    <TableExample/>
                </section>
            </div>
        </>
    );
}


export default ProductManagement;


import styles from "./css/ErrorPage.module.css";
import React from "react";

function ErrorPage() {
    return (
        <>
            <div className={styles.errorBox}>
                <span className={styles.errorText}>에러를 만나셨습니다. 잠시 쉬어가는 타임...</span>
                <a href={"/"} className={styles.errorSmallText}>메인 페이지로</a>
                <img src="/errorSleep.jpg"
                     alt="에러페이지"
                     style={{
                         maxWidth: "80%",
                         height: "100%",
                     }}
                />
            </div>
        </>
    );
}

export default ErrorPage
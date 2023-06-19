import React from 'react'
import styles from '../admin/css/MyComInfo.module.css';

const MyComInfo = () => {
    const headers = ['회사번호', '회사이름', '사업자등록번호', '대표자 이름' , '전화번호' ];
    const classNames = ['compCode', 'compName', 'compRegNo','compCeo', 'compPhone'];
    
   const cName = () => {
    let classname;   
    for(let i =0; i< classNames.length; i++ ){
            classname =classNames[i]
        }
        return styles.classname;
   }
    
    const headersName = headers.map(function(header){
                return (
                <div className={styles.wrapper}>
                    <div className={styles.empListHead}> {header} </div>
                    <input className={cName} />
               </div>
                );
            });


  return (

    <div className={styles.container}>
     <div className={styles.contentTitleBox}>
         <div className={styles.contentTitle}> 
             {/* 회사정보 입력 */}
            <span>회사정보 입력</span>
         </div>
     </div>
    
     <div className={styles.empListBox}>
         <div className={styles.empListHeaders}>
            {headersName}
        </div>
     </div>
    </div>

   
  )
}

export default MyComInfo
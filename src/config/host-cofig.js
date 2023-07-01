// 브라우저가 현재 클라이언트의 호스트 이름을 얻어오기
const clientHostName = window.location.hostname;

let backEndHostName; //백엔드 서버 호스트 이름


// if(clientHostName === 'localhost') {
    backEndHostName = 'http://localhost:8888/';
// }else if(clientHostName === ''){
   
// }

//  backEndHostName = 'http://last3.store/';
//  backEndHostName = 'http://13.124.224.231/';


export const API_BASE_URL = backEndHostName;
export const COMPANY ='ynfinal/comp';
//회사사원전체조회
export const FINDALL ='ynfinal/employee';
export const TRADING ='ynfinal/trcomp';
export const POSITION = 'ynfinal/position';
// 마이페이지 조회
// export const mypage ='ynfinal/employee/mypage';
export const DEPARTMENT ='ynfinal/department';
export const ADMINPAGE ='ynfinal/admin';
export const RAW ='ynfinal/rawitem';
export const HALF ='ynfinal/halfitem';
export const FINISHED ='ynfinal/finisheditem';
export const STORE ='ynfinal/store';
export const PURCHASE ='ynfinal/order';  // 구매 발주
export const IMPORTS ='ynfinal/inputproduct'; // 구매입고
export const INVENTORY ='ynfinal/stock';
export const ORDERDETAIL ='ynfinal/orderdetail';  // 구매 발주 상세

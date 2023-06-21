// 브라우저가 현재 클라이언트의 호스트 이름을 얻어오기
const clientHostName = window.location.hostname;

let backEndHostName; //백엔드 서버 호스트 이름

// if(clientHostName === 'localhost') {
//     backEndHostName = 'http://localhost:8888/';
// }else if(clientHostName === '.com'){
//     backEndHostName = 'http://';
// }



export const API_BASE_URL = backEndHostName;
export const company ='api/ynfinal/comp';
export const trading ='api/ynfinal/trcomp';
export const mypage ='api/ynfinal/mypage';
export const department ='api/ynfinal/department';
export const adminpage ='api/ynfinal/admin';
export const raw ='api/ynfinal/rawitem';
export const half ='api/ynfinal/halfitem';
export const finished ='api/ynfinal/finisheditem';
export const store ='api/ynfinal/store';
export const purchase ='api/ynfinal/itemorder';
export const imports ='api/ynfinal/inputproduct';
export const inventory ='api/ynfinal/stock';
export const orderdetail ='api/ynfinal/orderdetail';

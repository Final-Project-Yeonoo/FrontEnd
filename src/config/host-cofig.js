// 브라우저가 현재 클라이언트의 호스트 이름을 얻어오기
const clientHostName = window.location.hostname;

let backEndHostName; //백엔드 서버 호스트 이름

// if(clientHostName === 'localhost') {
//     backEndHostName = 'http://localhost:8888/';
// }else if(clientHostName === '.com'){
//     backEndHostName = 'http://';
// }



export const API_BASE_URL = backEndHostName;
export const company ='ynfinal/comp';
export const trading ='ynfinal/trcomp';
export const mypage ='ynfinal/mypage';
export const department ='ynfinal/department';
export const adminpage ='ynfinal/admin';
export const raw ='ynfinal/rawitem';
export const half ='ynfinal/halfitem';
export const finished ='ynfinal/finisheditem';
export const store ='ynfinal/store';
export const purchase ='ynfinal/itemorder';
export const imports ='ynfinal/inputproduct';
export const inventory ='ynfinal/stock';
export const orderdetail ='ynfinal/orderdetail';

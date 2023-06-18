// 브라우저가 현재 클라이언트의 호스트 이름을 얻어오기
const clientHostName = window.location.hostname;

let backEndHostName; //백엔드 서버 호스트 이름

// if(clientHostName === 'localhost') {
//     backEndHostName = 'http://localhost:/';
// }else if(clientHostName === '.com'){
//     backEndHostName = 'http://';
// }



export const API_BASE_URL = backEndHostName;
export const company ='api/ynfinal/comp';
export const trading ='api/ynfinal/trcomp';
export const mypage ='api/ynfinal/mypage';
export const department ='api/ynfinal/department';

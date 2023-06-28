const clientHostName = window.location.hostname;

let backEndHostName; // 백엔드 서버 호스트 이름

// if (clientHostName === 'localhost') {
//   backEndHostName = 'http://localhost:8888';
// } else if (clientHostName === 'vanila.com') {
//   backEndHostName = 'https://api.vanila.co.kr';
// }
backEndHostName ='http://13.124.224.231';

/*
import { API_YGBASE_URL as PROJECT, DELIVERY, DELIVERY_DETAIL, RETURNED,
   RETURN_DETAIL, PERFORMANCE, JOBORDER, ORDERS_DETAIL, ESTIMATE,
   ORDERS, STORE, ORDER, DEPARTMENT, FINISHED_ITEM, HALF_ITEM,
   RAW_ITEM, TR_COMP, EMPLOYEE, COMPANY
} from './yougeunWorking/YougeunConfig';

*/


export const API_YGBASE_URL = backEndHostName; 
export const PROJECT = '/ynfinal/project'; // 프로젝트
export const DELIVERY = '/ynfinal/delivery'; //납품
export const DELIVERY_DETAIL = '/ynfinal/delivery/detail'; // 납품세부
export const RETURNED = '/ynfinal/return'; // 반품
export const RETURN_DETAIL = '/ynfinal/return/detail'; // 반품상세
export const PERFORMANCE = '/ynfinal/performance'; // 실적
export const JOBORDER = '/ynfinal/joborder';  // 작업지시
export const ORDERS_DETAIL = '/ynfinal/orders/detail' // 수주서상세
export const ESTIMATE = '/ynfinal/estimate';  // 견적서
export const ORDERS = '/ynfinal/orders'; // 수주서
export const STORE = '/ynfinal/store'; // 창고
export const ORDER = '/ynfinal/order'; // 발주
export const DEPARTMENT = '/ynfinal/department'; // 부서
export const FINISHED_ITEM = '/ynfinal/finisheditem'; // 완제품
export const HALF_ITEM = '/ynfinal/halfitem'; // 반제품
export const RAW_ITEM = '/ynfinal/rawitem'; // 원자재
export const TR_COMP = '/ynfinal/trcomp'; // 거래처
export const EMPLOYEE = '/ynfinal/employee'; // 사원
export const COMPANY = '/ynfinal/comp'; // 회사


// 토큰및 로그인 유저 데이터를 브라우저에 저장하는 함수
export const setLoginUserInfo = ({ token, empNo, empId, empName, userAuth, infoAuth, purchaseAuth, inventoryAuth, empProfile, productAuth, salesAuth}) => {
    localStorage.setItem('ACCESS_TOKEN', token);
    localStorage.setItem('EMP_NO', empNo);
    localStorage.setItem('EMP_ID', empId);
    localStorage.setItem('EMP_NAME', empName);
    localStorage.setItem('USER_AUTH', userAuth);
    localStorage.setItem('INFO_AUTH', infoAuth);
    localStorage.setItem('PURCHASE_AUTH', purchaseAuth);
    localStorage.setItem('INVENTORY_AUTH', inventoryAuth);
    localStorage.setItem('PRODUCT_AUTH', productAuth);
    localStorage.setItem('SALES_AUTH', salesAuth);
    localStorage.setItem('EMP_IMG', empProfile);

  
};


// 로그인한 유저의 데이터객체를 반환하는 함수
export const getLoginUserInfo = () => {
  return {
    token: localStorage.getItem('ACCESS_TOKEN'),
    empNo: localStorage.getItem('EMP_NO'),
    empId: localStorage.getItem('EMP_ID'),
    empName: localStorage.getItem('EMP_NAME'),
    userAuth: localStorage.getItem('USER_AUTH'),
    infoAuth: localStorage.getItem('INFO_AUTH'),
    purchaseAuth: localStorage.getItem('PURCHASE_AUTH'),
    inventoryAuth: localStorage.getItem('INVENTORY_AUTH'),
    productAuth: localStorage.getItem('PRODUCT_AUTH'),
    salesAuth: localStorage.getItem('SALES_AUTH'),
    empProfile: localStorage.getItem('EMP_IMG'),
  };
};




// 로그인 여부를 확인하는 함수
// const isLogin = () => {
//   const token = localStorage.getItem('ACCESS_TOKEN');
//   if (token === null) return false;
//   return true;
// };

export const isLogin = () => !!localStorage.getItem('ACCESS_TOKEN');
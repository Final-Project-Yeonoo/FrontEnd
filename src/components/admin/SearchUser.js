import './css/SearchUser.module.css';
import {BasicTextFields,BasicSelect, MultipleSelectCheckmarks} from '../common/UsefulComponents'; 
import { useState } from 'react';

function SearchUser() {
   
 //부서정보를 받아와서 부서이름을 보여주고 부서 코드를 보내주는 역할
 const [dept, setDept] = useState([]);
 fetch('api/', {
    method: 'POST',
    headers: requestHeader,
    body: JSON.stringify()
 })
 
    const deptName = [
       
      ];
    
return (    
<>
<div className='container'>
    <div className='contentTitleBox'>
        <div className='contentTitle'> 
            {/* //사용자 조회 제목 */}
            <span>사용자 조회</span>
        </div>
    </div>

    <div className='searchBox'>
         <div className='searchContentsButton'>
            <BasicTextFields className='searchName' placeholder='사원이름' />
            <MultipleSelectCheckmarks names={deptName} tag='부서명' />
             <button className='searchBtn'>조회</button>
         </div>       
     </div>
    </div>
</>
        );
}

export default SearchUser
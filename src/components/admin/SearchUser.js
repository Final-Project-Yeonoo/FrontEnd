import './css/SearchUser.module.css'

function SearchUser() {
   
   
    
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
             <input className='searchName'/>
             <input className='searEmpId'/>
             <input className='searchDept'/>
             <button className='searchBtn'>조회</button>
         </div>       
     </div>
    
    
    
    
    
    </div>
</>
        );
}

export default SearchUser
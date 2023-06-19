import React, { useState, useEffect } from 'react';
import './css/UserList.module.css';
import Layouts from '../common/TableLayout';
import Modal from '../common/Modal';

const UserList = () => {
  const [searchName, setSearchName] = useState(''); // 이름 검색어 상태
  const [searchDept, setSearchDept] = useState(''); // 부서 검색어 상태
  const [departments, setDepartments] = useState([]); // 부서 목록 상태
  const [selectedEmployee, setSelectedEmployee] = useState(null); // 선택된 사원의 정보
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 창 열림 여부


  // 서버에서 부서 목록을 가져오는 함수
  const fetchDepartments = async () => {
    try {
      // 서버로 API 요청을 보내서 부서 목록을 가져옴
      const response = await fetch('/api/departments');
      const data = await response.json();

      // 가져온 부서 목록을 departments 상태로 설정
      setDepartments(data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  // 서버에서 사원 데이터를 가져오는 함수
  const fetchEmployees = async () => {
    try {
      // 서버로 API 요청을 보내서 해당 부서의 사원 데이터를 가져옴
      const response = await fetch(`/api/employees?dept=${searchDept}&name=${searchName}`);
      const data = await response.json();

      // 가져온 데이터를 data 상태로 설정
      setData(data);
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  const [columns] = useState([
    {
      accessor: 'name',
      Header: '이름',
    },
    {
      accessor: 'id',
      Header: '사원ID',
    },
    {
      accessor: 'dept',
      Header: '부서',
    },
    {
      accessor: 'pos',
      Header: '직급',
    },
    {
      accessor: 'num',
      Header: '내선번호',
    },
    {
      accessor: 'phone',
      Header: '휴대전화',
    },
    {
      accessor: 'addr',
      Header: '주소',
    },
  ]);

  const [data, setData] = useState([]);
  const exampleData = [
    {
      name: '고구마',
      id: 'EM0001',
      dept: 'Production',
      pos: 'Senior Specialist',
      num: '1023',
      phone: '010-111-3333',
      addr: '서울시 강남구',
    }

  ];

  useEffect(() => {
    // 페이지가 처음 로드될 때 초기 데이터와 부서 목록을 가져오기 위해 fetchEmployees와 fetchDepartments 함수를 호출
    fetchEmployees();
    fetchDepartments();
    setData(exampleData);
  }, []); // 빈 배열을 전달하여 페이지 로드 시에만 실행되도록 설정

  // 검색 버튼 클릭 시 호출되는 함수
  const handleSearch = () => {
    fetchEmployees();
  };
  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true); // 모달 창 열기
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // 모달 창 닫기
  };

  //사원 업데이트하기
//   const handleEmployeeUpdate = (updatedEmployee) => {
//       // 리스트에서 해당 사원의 인덱스를 찾습니다.
//   const employeeIndex = data.findIndex((employee) => employee.id === updatedEmployee.id);
  
//   if (employeeIndex !== -1) {
//     // 사원의 정보를 업데이트합니다.
//     const updatedData = [...data];
//     updatedData[employeeIndex] = updatedEmployee;
//     setData(updatedData);
//   }
  
//   // 모달 창을 닫습니다.
//   handleModalClose();  };


const handleEmployeeUpdate = async (updatedEmployee) => {
   
    // 리스트에서 해당 사원의 인덱스를 찾습니다.
   const employeeIndex = data.findIndex((employee) => employee.id === updatedEmployee.id);
   
    if (employeeIndex !== -1) {
      // 사원의 정보를 업데이트합니다.
      const updatedData = [...data];
      updatedData[employeeIndex] = updatedEmployee;
      setData(updatedData);
    }
    
    
     try {
       const response = await fetch(`/api/employees/${updatedEmployee.id}`, {
         method: 'PUT',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(updatedEmployee),
       });
   
       if (response.ok) {
         // 데이터가 성공적으로 업데이트되면 상태를 업데이트합니다.
         const updatedData = data.map((employee) =>
           employee.id === updatedEmployee.id ? updatedEmployee : employee
         );
         setData(updatedData);
         handleModalClose();
       } else {
         console.error('Error updating employee data:', response.status);
       }
     } catch (error) {
       console.error('Error updating employee data:', error);
     }
     handleModalClose();
   };
 




  
  return (
    <>
      <div className="container">
        <div className="input-container">
          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="이름을 입력하세요"
          />
          <select
            value={searchDept}
            onChange={(e) => setSearchDept(e.target.value)}
          >
            <option value="">전체 부서</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          <button onClick={handleSearch}>검색</button>
        </div>

        <div className="table-container">
          <Layouts columns={columns} 
          data={data}
          onEmployeeClick={handleEmployeeClick} />
        </div>
      </div>

      {/* 모달 */}
      {isModalOpen && (
        <Modal onClose={handleModalClose}>
          {/* 사원 정보 */}
          {selectedEmployee && (
            <div>
              <h2>{selectedEmployee.name}</h2>
              <span>ID: </span>
              <input type="text" value={selectedEmployee.id}
                onChange={(e) => setSelectedEmployee((prevEmployee) => ({...prevEmployee,
                                 id: e.target.value, }))}/>
              <span>부서:</span>
              <input type="text" value={selectedEmployee.dept}
                onChange={(e) => setSelectedEmployee((prevEmployee) => ({...prevEmployee,
                                 dept: e.target.value, }))}/>
        
              <span>직급:</span>
              <input type="text" value={selectedEmployee.pos}
                onChange={(e) => setSelectedEmployee((prevEmployee) => ({...prevEmployee,
                                 pos: e.target.value, }))}/>
        
              <span>내선번호:</span>
              <input type="text" value={selectedEmployee.num}
                onChange={(e) => setSelectedEmployee((prevEmployee) => ({...prevEmployee,
                                 num: e.target.value, }))}/>

              <span>휴대전화:</span>
              <input type="text" value={selectedEmployee.phone}
                onChange={(e) => setSelectedEmployee((prevEmployee) => ({...prevEmployee,
                                 phone: e.target.value, }))}/>

              <span>주소:</span>
              <input type="text" value={selectedEmployee.addr}
                onChange={(e) => setSelectedEmployee((prevEmployee) => ({...prevEmployee,
                                 addr: e.target.value, }))}/>

              {/* 수정 버튼 */}
              <button onClick={() => handleEmployeeUpdate(selectedEmployee)}>
                수정
              </button>
            </div>
          )}
        </Modal>
      )}
    </>
  );
};

export default UserList;






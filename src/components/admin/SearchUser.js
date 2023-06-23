
import styles from './css/SearchUser.module.css';
import {
  BasicTextFields,
  MultipleSelectCheckmarks
} from "../common/UsefulComponents";
import { useState, useEffect } from "react";

function SearchUser() {
  // 상태 변수 선언
  const [searchName, setSearchName] = useState("");
  const [selectedDept, setSelectedDept] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [deptOptions, setDeptOptions] = useState([]);

  useEffect(() => {
    fetchDeptOptions();
  }, []);
  const fetchDeptOptions = async () => {
    try {
      const response = await fetch("api/fetchDeptOptions");
      const data = await response.json();
      setDeptOptions(data);
    } catch (error) {
      console.error("Error while fetching department options:", error);
    }
  };

  const handleDeptChange = (value) => {
    setSelectedDept(value);
    // 부서 코드를 백엔드로 전달하는 로직 추가
    // 예를 들어, fetch를 사용하여 해당 부서의 코드를 전달하는 API 호출
    fetch("api/fetchDeptCode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ deptName: value })
    }).then((response) => {
      alert("부서코드 send");
    });
  };

 const searchUserTitle = ['이름','사원아이디','부서','직급'];


  // 검색 버튼 클릭 핸들러
  const handleSearch = async () => {
    try {
      if (searchName) {
        // 사원 이름으로 검색
        const response = await fetch("", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ name: searchName })
        });
        const data = await response.json();
        setSearchResults(data);
      } else if (selectedDept) {
        // 부서 이름으로 검색
        const response = await fetch("", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ dept: selectedDept })
        });
        const data = await response.json();
        setSearchResults(data);
      }
    } catch (error) {
      console.error("Error while searching users:", error);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.contentTitleBox}>
          <div className={styles.contentTitle}>
            {/* //사용자 조회 제목 */}
            <span>사용자 조회</span>
          </div>
          <div className={styles.searchBox}>
            <div className={styles.searchContentsButton}>
              <BasicTextFields
                className={styles.searchName}
                width="15ch"
                placeholder="사원이름"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
              <MultipleSelectCheckmarks
                className={styles.searchDept}
                names={deptOptions}
                tag="부서명"
                value={selectedDept}
                onChange={handleDeptChange}
              />
              <button className={styles.searchBtn} onClick={handleSearch}>
                조회
              </button>
            </div>
          </div>
        </div>
        {/*<TableExample tableHeaders={searchUserTitle} data={searchResults} />*/}
      </div>
    </>
  );
}

export default SearchUser;

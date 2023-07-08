# HI-ERP [바로보기🚀](http://last3.store/)
- 여누솔루션과 기업협업 프로젝트로 만든 생산물류ERP, HI-ERP(프로젝트 대상 수상)

![image](https://github.com/Final-Project-Yeonoo/FrontEnd/assets/126743165/21bacf67-a057-430a-892e-4f78257c041c)

## 프로젝트 개요

- 여누 솔루션의 제품 SFOW을 JPA - REACT - AWS 활용하여 LITE형으로 개발

- 클라우드 기반의 EPR-MES 시스템 구성으로 프로그램의 확장성과 유연성 증진

- 생산 관리를 사내에서 공유 및 웹 기반 시스템을 이용하여 어디서든지 조회와 관리로 운영의 효율성 증진

### 시스템 정의서(메뉴별 구현)
 ![image](https://github.com/Final-Project-Yeonoo/FrontEnd/assets/126743165/9010d49e-6dc8-4452-ba21-bc429d85febb)


## 개발환경 및 사용언어 등

![image](https://github.com/Final-Project-Yeonoo/FrontEnd/assets/126743165/9af9ae2e-d19f-4e31-b368-1344ef94eb5d)

## 개발일정

![image](https://github.com/Final-Project-Yeonoo/FrontEnd/assets/126743165/1f994a60-f350-4998-9cd8-9bfc1cfcfd73)



## 팀원별 담당

### 송유근(BE/FE) -TEAM READER [GITHUB:sparkles:](https://github.com/golddrone7)

BE 
> - JPA 활용, BE전반 작성 및 수정
> - config에서 웹페이지 보안처리, 비밀번호 암호화, 로그인을 위한 토큰처리
> - global에서 전역 에러 처리 구현
> - manual, oranization 등 초기 작성 및 수정  
> - 전체 페이지 테스트 및 버그픽스
> - AWS 이미지 업로드 구현
> - ITEM 간의 FK 설정으로 데이터 간 긴밀성 구현

FE
> - REACT활용 FE 작성 및 전체페이지 버그픽스
>   - 개인정보 수정페이지 중 이미지 업로드 기능 구현
>   - localStorage 및 access-token 활용하여 사용자별 메뉴 사용제한 기능 구현
>   - 프로젝트등록, 견적서,수주서 등록, 작업지시, 실적등록 페이지 CRUD 및 검색 구현
>   - 각 페이지에서 다른 페이지 정보 불러오기 구현
>   - FK 구성된 제품-원자재 연결된 테이블 렌더링 구현

        
### 구빛나(FE) [GITHUB:sparkles:](https://github.com/starirene9)
> - 발표자료 작성

> - 페이지 UI/UX 디자인(FIGMA 이용)
>   - 페이지 전체 레이아웃 구성
>   - 로고 제작
> - REACT ROUTER 라이브러리 활용, ROUTE와 OUTLET으로 경로설정 및 컴포넌트화 된 페이지 구현 위치 고정
> - 페이지별 TAB 이동 기능 구현
>   - REACT ROUTER 라이브러리의 useNavigate 활용하여 페이지 이동 기능 구현
> - 로그인 페이지 구현
>   - 전체의 디자인 및 로그인 기능 구현 
> - 기준정보 -> 품목관리(원자재, 반제품, 제품) 페이지 구현
>   - 컴포넌트 내에서 재 컴포넌화를 통한 페이지 이동기능 구현
>   - 각 페이지 테이블에서 직접 작동하는 CRUD 구현
> - 구매 -> 구매발주/입고 페이지 설계
> - 에러 페이지 구현

### 이채원 (FE/BE) [GITHUB:sparkles:](https://github.com/WONI2)
FE
> - 페이지 UI/UX 디자인(FIGMA 이용)
>   - 관리자 페이지 전체 레이아웃 구성
> - DASHBOARD 그래프 구현
>   - NIVO 라이브러리 활용, 생산실적, 인원현황, 재고현황 별 CHART구현
> - 관리자 페이지 구현
>   - 관리자가 사용자 정보 작성 및 입력권한 테이블 및 사원별 정보수정 구현  
>   - 관리자 및 전체 사원 사용 가능한 사원조회 페이지 조회 및 검색 구현
> - 개인정보 수정 페이지 구현
>   - 사원별 자신의 정보 조회 및 주소, 비밀번호, 전화번호만 수정 가능하도록 제한 
>   - 거래처정보 CRUD 및 검색
>   - 컴포넌트화 한 모달로 데이터 추가 기능 
> - 재고 정보 조회
   
BE
> - oranization - user DTO,CONTROLLER,SERVICE 수정
> - FE와 연관 데이터 수정에 따른 inventory DTO,CONTROLLER,SERVICE 수정 

## 주요 페이지

![image](https://github.com/Final-Project-Yeonoo/FrontEnd/assets/126743165/01c3697d-7e18-4a5b-b884-1f91ee7259ca)

![image](https://github.com/Final-Project-Yeonoo/FrontEnd/assets/126743165/75bad444-576a-45a8-b81a-2ecc59ea4de2)

![image](https://github.com/Final-Project-Yeonoo/FrontEnd/assets/126743165/5d48bcc5-41a0-4cf3-a3da-9dc0f9ce68f1)

![image](https://github.com/Final-Project-Yeonoo/FrontEnd/assets/126743165/45029482-0cf5-4a3c-9065-5b2d1cb8ca9a)

![image](https://github.com/Final-Project-Yeonoo/FrontEnd/assets/126743165/ef92d3e7-dc74-43d7-a807-00b14937c9c6)

![image](https://github.com/Final-Project-Yeonoo/FrontEnd/assets/126743165/e42d4ef0-9281-4df5-b20b-82e88be57475)




## git clone 시 주의사항 
``` 
  npm install
  npm start 
```

### 추가 라이브러리 
```
$ npm install react-icons  // 아이콘
$ npm install classnames   // 클래스 add/remove 편리한거
$ npm install sass // scss 문법 사용
$ npm install react-bootstrap bootstrap
$ npm install @mui/material @emotion/react @emotion/styled
$ npm install @mui/icons-material
$ npm install react-router-dom
$ npm install react-table
$ npm install react-table --save

# Redux : props 없이 state 공유 도와주는 라이브러리 설치 
$ npm install @reduxjs/toolkit react-redux

# axios 설치
$ npm install axios

$ @mui/x-data-grid
$ npm install @mui/x-data-grid-generator
$ npm install @mui/x-data-grid-pro
$ npm install @mui/styled-engine-sc styled-components 
$ npm install react-spinners --force

```


import Nav from "react-bootstrap/Nav";

let purchaseOrderData = [
    {
        title: "조회 시작일",
        content: "선택하세요"
    },
    {
        title: "조회 종료일",
        content: "선택하세요"
    },
    {
        title: "발주일자",
        content: "선택하세요"
    },
    {
        title: "납기일자",
        content: "선택하세요"
    },
    {
        title: "거래처코드",
        content: "입력하세요"
    },
    {
        title: "거래처명",
        content: "입력하세요"
    },
    {
        title: "프로젝트코드",
        content: "입력하세요"
    },
    {
        title: "프로젝트명",
        content: "입력하세요"
    },
    {
        title: "발주담당자",
        content: "입력하세요"
    },
    {
        title: "비고",
        content: "입력하세요"
    }
]

let purchaseItemsData = [
    {
        title: "입고번호",
        content: "입력하세요"
    },
    {
        title: "입고유형",
        content: "입력하세요"
    },
    {
        title: "입고일자",
        content: "날짜를 선택하세요"
    },
    {
        title: "프로젝트코드",
        content: "입력하세요"
    },
    {
        title: "프로젝트명",
        content: "입력하세요"
    },
    {
        title: "무상여부",
        content: "선택하세요"
    },
    {
        title: "수불타입",
        content: "선택하세요"
    },
    {
        title: "거래처코드",
        content: "입력하세요"
    },
    {
        title: "거래처명",
        content: "입력하세요"
    },
    {
        title: "비고",
        content: "입력하세요"
    }
]

let purchaseSearchData = [
    {
       title: "시작일",
       content: "날짜를 선택하세요"
    },
    {
        title: "종료일",
        content: "날짜를 선택하세요"
    },
    {
        title: "품목검색",
        content: "입력하세요"
    },
    {
        title: "거래처명",
        content: "입력하세요"
    },
    {
        title: "프로젝트명",
        content: "입력하세요"
    }

]
let tableHeadersPurchase = [
    [
        "상태", "발주서번호", "발주일자", "구매유형", "거래처코드", "거래처명", "납기일자", "프로젝트코드", "프로젝트명", "발주담당자", "담당자명", "담당자 이메일", "인도장소", "결재조건", "유효기간", "수신", "비고", "등록일자", "수정일자"
    ]
    ,
    [
        "ITEM 코드", "품명", "품목코드", "규격", "재고단위", "입고수량", "미입고수량", "발주수량", "단가", "공급가액", "세금코드", "부가세", "부가세포함", "비고"
    ]
    ,
    [
        "상태", "입고번호", "입고유형", "입고일자", "프로젝트 코드", "프로젝트명", "무상여부", "수불타입", "발주번호", "거래처코드", "거래처명", "비고", "등록일자", "수정일자"
    ]
    ,
    [
        "상태", "ITEM 코드", "품명", "품목코드", "규격", "수입검사여부", "창고코드", "창고명", "LOT번호", "재고단위", "재고상태", "수량", "단가", "공급가액", "세금코드", "부가세", "부가세포함", "비고"
    ]
]
export {purchaseOrderData, purchaseItemsData, tableHeadersPurchase, purchaseSearchData}
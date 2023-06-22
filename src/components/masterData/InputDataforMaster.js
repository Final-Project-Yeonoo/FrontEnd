let productInputData = [
    {
        title: "ITEM 코드",
        content: "자동완성",

    },
    {
        title: "원자재 개수",
        content: "입력하세요"
    },
    {
        title: "원자재 가격",
        content: "입력하세요"
    },
    {
        title: "유형",
        content: "입력하세요"
    }
]

let storeInputData = [
    {
        title: "창고구분",
        content: "선택하세요"
    },
    {
        title: "창고코드",
        content: "입력하세요"
    },
    {
        title: "창고명",
        content: "자동완성"
    },
    {
        title: "비고",
        content: "입력하세요"
    }
]

let tableHeadersProduct = [
    [
        "ITEM 코드", "품명", "품목코드", "유형", "규격", "재고단위", "안전재고", "주거래처", "거래처명", "수입검사", "입고창고", "창고명", "비고", "사용여부", "등록일시", "수정일시"
    ]
    ,
    [
        "ITEM 코드", "품명", "품목코드", "유형", "규격", "재고단위", "안전재고", "lot_size", "수입검사", "비고", "사용여부", "등록일시", "수정일시"
    ]
    ,
    [
        "ITEM 코드", "품명", "품목코드", "유형", "규격", "생산구분", "재고단위", "lot_size", "비고", "사용여부", "등록일시", "수정일시"
    ]
    ,
    [
        "창고구분", "창고코드", "창고명", "거래처코드", "거래처명", "비고", "사용여부", "등록일시", "수정일시"
    ]
    ,
    [
        "구역코드", "구역명"
    ]
    ,
    [
        "렉코드", "렉명칭", "셀코드", "셀명칭", "비고"
    ]
];



export {productInputData, storeInputData, tableHeadersProduct}
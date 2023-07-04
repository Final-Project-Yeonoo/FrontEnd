import {configureStore, createSlice} from '@reduxjs/toolkit'

//state들을 보관하는 Redux 라이브러리
let user = createSlice({
    name : 'user',
    initialState: 'kim',
    reducers : {
        //1. state 수정해주는 함수 만들기
        changeName(state) {
            return 'bitna ' + state // 붙여쓰기 가능
            //array/object의 경우 직접 수정해도 state 변경 됨
            // state.name = 'park' <- 다음과 같이 직접 수정
        },
        increase(state, action) {
            state.age += action.payload
        //     payload 꼭 써야함 increase(10) increase(30) 과 같이 활용 가능
        }
        // changeNames(state) {
        //     return 'jeongwoo' + state // 붙여쓰기 가능
        // },
    }
})
// 2. export 해야함 : 아래의 형태에 export 하고 싶은 함수명을 넣어준다.
export let {changeName} = user.actions

let stock = createSlice({
    name : 'stock',
    initialState: [1, 2, 3]
})

// name: state이름
// 중요 하단에 등록 필수! 작명: .reducer 필수 붙이기
export default configureStore({
    reducer: {
        user : user.reducer
    }
})

//사용시 꺼내는 법 : Redux store에 있는 모든 변수가 남음 // 그러나 일부만 갖다 쓰고 싶으면 .user 이렇게 하면 됨
// let state = useSelector((state)=>{return state})
// console.log(state.user)
// let dispatch = useDispatch() // 3. 만든 함수 import 해서 사용

//map 반복문
//{ key={i}
// state.cart.map((a, i)=>{
// {state.cart[i].name}
// <button onClick={()=>{
// 3. 만든 함수 import 해서 사용
// dispatch(changeName()) <= 이렇게 사용해야함
// }}>+</button>
// })
// }


// let copy = [...글기본값];
// let [modal, setModal] = useState(false);
// // false & true 혹은 0, 1 등 상태의 기본값 정해주기 : 모달 띄울때 바꿔주기
//
// const toggleModal = () => {
//     setModal(prevModal => !prevModal);
// };

// { // 조건문 쓰고 싶을때 삼항연산자 사용
    // 조건식? 참일때 실행할 코드 : 거짓일때 실행할 코드 ('' or null)
    // state가 false면 <Modal> 안보이고 true이면 <Modal> 보이게

    // modal == true ? < Modal color={'pink'}
    //                         글기본값={글기본값}
    //                         글기본값변경={글기본값변경}
    //                         title={title}
    // /> : ''
// }
// import React from "react";
// import "../common/css/Modal.module.css";

// const Modal = ({ onClose, children }) => {
//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <button className="modal-close" onClick={onClose}>
//           &times;
//         </button>
//         {children}
//       </div>
//     </div>
//   );
// };

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ onClose, children }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {children}
          </Typography>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
        </Box>
      </Modal>
    </div>
  );
}

// import React from "react";
// import styles from "./css/Modal.module.css";

// const BasicModal = (props) => {
//   // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
//   const { open, close, header } = props;

//   return (
//     // 모달이 열릴때 openModal 클래스가 생성된다.
//     <div className={open ? "openModal modal" : "modal"}>
//       {open ? (
//         <section>
//           <header>
//             {header}
//             <button className={styles.close} onClick={close}>
//               &times;
//             </button>
//           </header>
//           <main>{props.children}</main>
//           <footer>
//             <button className={styles.close} onClick={close}>
//               close
//             </button>
//           </footer>
//         </section>
//       ) : null}
//     </div>
//   );
// };

// export default BasicModal;
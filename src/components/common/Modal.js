import React from "react";
import "./css/Modal.css";

const Modal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header, onSave, mode } = props;

  const handleSubmit = () => {
    if (mode === "send") {
      // 입력값을 main 페이지로 전달하는 로직
      // 예: props.onValueChange(inputValue);
    } else if (mode === "receive") {
      // 입력값을 백엔드로 전송하는 로직
      // 예: fetch('/api/data', { body: JSON.stringify({ value: inputValue }), ... });
      // onSave(value);
    }
  };

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>
            {props.children} 
            <button className="close" onClick={close}>
              close
            </button>
          </main>
          {/* <footer>
            {/* <button onClick={() => handleSubmit(item)}>Save</button> */}
              {/* close */}
            {/* </button> 
          </footer> */}
       
        </section>
      ) : null}
    </div>
  );
};
export default Modal;
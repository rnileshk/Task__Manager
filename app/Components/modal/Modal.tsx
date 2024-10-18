"use client"

import { useGlobalState } from "@/app/Context/globalProvider";
import React from "react";
import styled from "styled-components";

interface Props {
    content: React.ReactNode;
}

function Modal({ content }: Props) {

    const { closeModal } = useGlobalState();

    const { theme } = useGlobalState();

  return (
    <ModalStyled theme={theme}>
        <div className="modal-overlay" onClick={closeModal}></div>
        <div className="modal-content">{content}</div>
       
    </ModalStyled>
  );
}

const ModalStyled = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100vh;
z-index: 100;

display: flex;
justify-content: center;
align-items: center;

.modal-overlay{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.45);
    filter: blur(4px);
}

.modal-content{
    padding: 2rem;
    position: relative;
    max-width: 630px;
    z-index: 100;

    border-radius: 1rem;
    background-color:  #212121;
    box-shadow: 0 0 1rem rgb(240, 240, 240);
    border-radius: 1rem;
}
`;

export default Modal;
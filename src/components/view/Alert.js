import { useEffect } from 'react';
import ReactModal from 'react-modal';

import styled from "styled-components";

export default function Alert(props) {
    let { style = {
        overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.45)",
            zIndex: 10,
        },
        content: {
            display: "flex",
            justifyContent: "center",
            background: "#ffffff",
            overflow: "auto",
            top: "42vh",
            left: "38vw",
            right: "38vw",
            bottom: "42vh",
            WebkitOverflowScrolling: "touch",
            borderRadius: "14px",
            outline: "none",
            zIndex: 10
        }
    }} = props;

    return (
        <>
            <ReactModal
                isOpen={props.isOpen}
                style={style}
            >
                { props.content}
                <StButton onClick={()=>props.onRequestClose()}>
                    확인
                </StButton>
            </ReactModal>
        </>
    );
}

const StButton = styled.button`
    display: block;
    margin: 60px auto;
    height: 50px;
    width: 70px;
    background-color: #2F76E6;
    border-style: none;
    font-size: 20px;
    font-weight: bold;
    color: #ffffff;
`;
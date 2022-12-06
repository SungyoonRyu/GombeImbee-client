import ReactModal from 'react-modal';

import styled from "styled-components";

export default function CreatePopup(props) {
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
            top: "20vh",
            left: "20vw",
            right: "20vw",
            bottom: "20vh",
            WebkitOverflowScrolling: "touch",
            borderRadius: "14px",
            outline: "none",
            zIndex: 10
        }
    }} = props;

    const stateForm = () => {
        switch (props.data.state) {
            case 'input': return inputForm();
            case 'completed': return completeForm();
            case 'failure': return failedForm();
        }
    }

    const inputForm = () => {
        return (
            <StForm>
                <StLabel>{props.string.title}</StLabel>
                <StLabel>{props.string.label}</StLabel>
                <StInput onChange={props.onChange.input}/>
                <StButton onClick={e=>props.onChange.click(e, true)}>
                    저장
                </StButton>
                <StButton onClick={e=>props.onChange.click(e, false)}>
                    취소
                </StButton>
            </StForm> 
        );
    }

    const completeForm = () => {
        return (
            <StForm>
                <StLabel>{props.string.title}</StLabel>
                <StLabel>{props.data.name}가 추가되었습니다.</StLabel>    
                <StButton onClick={props.onChange.click}>
                    확인
                </StButton>
            </StForm> 
        );
    }

    const failedForm = () => {
        return (
            <StForm>
                <StLabel>{props.string.title}</StLabel>
                <StLabel>{props.string.type}을 추가하지 못했습니다.</StLabel>
                <StLabel>{props.data.error}</StLabel>
                <StButton onClick={props.onChange.click}>
                    확인
                </StButton>
            </StForm>
        );
    }

    return (
        <>
            <ReactModal
                isOpen={props.isOpen}
                style={style}
            >
                { stateForm() }
            </ReactModal>
        </>
    );
}

ReactModal.setAppElement('#root');

const StButton = styled.button`
    display: block;
    margin: 60px auto;
    height: 50px;
    width: 110px;
    background-color: #2F76E6;
    border-style: none;
    font-size: 20px;
    font-weight: bold;
    color: #ffffff;
`;

const StForm = styled.form`
    margin: auto;
    padding: 0px 0px;
    width: 500px;
`;

const StLabel = styled.label`
    display: block;
    margin: 50px auto 10px;
    width: 200px;
    font-size: 18px;
`;

const StInput = styled.input`
    display: block;
    margin: 10px auto;
    height: 40px;
    width: 500px;
    background-color: #EBECEF;
    border-style: none;
`;

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
                <StTitle>{props.string.title}</StTitle>
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
                <StTitle>{props.string.title}</StTitle>
                <STNotice>{props.data.name}가 추가되었습니다.</STNotice>    
                <StButton onClick={props.onChange.click}>
                    확인
                </StButton>
            </StForm> 
        );
    }

    const failedForm = () => {
        return (
            <StForm>
                <StTitle>{props.string.title}</StTitle>
                <STNotice>{props.string.type}을 추가하지 못했습니다.</STNotice>
                <STNotice>{props.data.error}</STNotice>
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
    display: inline-block;
    margin: 40px 30px;
    height: 50px;
    width: 110px;
    background-color: #2F76E6;
    border-style: none;
    font-size: 20px;
    font-weight: bold;
    color: #ffffff;
`;

const StForm = styled.form`
    margin: 20px;
    padding: 0px 0px;
    width: 800px;
    text-align: center;
`;

const StTitle = styled.h1`
    margin: 20px 10px 100px 10px;
    width: 400px;
    font-size: 22px;
    text-align: start;
    text-weight: bold;
`;

const StLabel = styled.label`
    display: block;
    margin: 40px 10px 10px;
    width: 400px;
    font-size: 18px;
    text-align: start;
`;

const STNotice = styled.p`
    margin: 10px;
    padding: 10px;
    font-size: 20px;
    text-align: start;
`;

const StInput = styled.input`
    display: block;
    margin: 10px auto;
    height: 40px;
    width: 90%;
    background-color: #FFFFFF;
    border-style: none;
`;

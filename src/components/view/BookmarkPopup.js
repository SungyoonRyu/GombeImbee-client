import ReactModal from "react-modal";
import styled from "styled-components";

export default function BookmarkPopup(props) {
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
            background: "#EAEAEA",
            overflow: "auto",
            top: "11vh",
            left: "28vw",
            right: "28vw",
            bottom: "12vh",
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
        }
    }

    const inputForm = () => {
        return (
            <StForm>
                <StTitle>{props.string.title}</StTitle>
                <STNotice>{props.string.label}</STNotice>
                <StLabel>Title</StLabel>
                <StInput onChange={e=>props.input(e, 'title')}/>
                <StLabel>URL</StLabel>
                <StInput onChange={e=>props.input(e, 'url')}/>
                <StLabel>Tag</StLabel>
                <StInput onChange={e=>props.input(e, 'tag')}/>
                <StLabel>Info</StLabel>
                <StInput onChange={e=>props.input(e, 'info')}/>
                <StButton onClick={e=>props.handler(e, true)}>
                    저장
                </StButton>
                <StButton onClick={e=>props.handler(e, false)}>
                    취소
                </StButton>
            </StForm> 
        );
    }

    const completeForm = () => {
        return (
            <StForm>
                <StTitle>{props.string.title}</StTitle>
                <STNotice>{props.string.complete}</STNotice>    
                <StButton onClick={props.handler}>
                    확인
                </StButton>
            </StForm> 
        );
    }

    return (
        <ReactModal
            isOpen={props.isOpen}
            style={style}
        >
            { stateForm() }
        </ReactModal>
    );
}


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
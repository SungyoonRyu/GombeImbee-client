import styled from "styled-components";

import axios from "axios";

import ReactModal from "react-modal";

import { useState } from "react";

import { useRecoilValue } from "recoil";
import { workspaceState, isLoginState } from "../../utils/atom";

import { config } from "../../definitions";

export default function EditMember(props) {
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
            top: "10vh",
            left: "10vw",
            right: "10vw",
            bottom: "10vh",
            WebkitOverflowScrolling: "touch",
            borderRadius: "14px",
            outline: "none",
            zIndex: 10
        }
    }} = props;

    const currentWorkspace = useRecoilValue(workspaceState);
    const userState = useRecoilValue(isLoginState);

    const [invite, setInvite] = useState(false);
    const [member, setMember] = useState([]);

    const getMember = async (event) => {
        event.preventDefault();
        try {
            let server = config.ip + config.port;
            let params = {workspace_id: currentWorkspace.id}
            const res = await axios.post(server+'/workspace/workspace_member', params);
            if (res.status == 200) setMember(res.data);
        }
        catch (error) { console.log(error); }
    }

    const delMember = async (event, userId) => {
        event.preventDefault();
        try {
            let server = config.ip + config.port;
            let params = {workspace_id: currentWorkspace.id, user_id: userId}
            const res = await axios.post(server+'/workspace/del_workspace_member', params);
            if (res.status == 200) getMember(event);
            else console.log(res.status);
        }
        catch (error) { console.log(error); }
    }

    return (
        <>
            <StButton onClick={(e)=>{setInvite(true); getMember(e);}}>
                맴버 수정
            </StButton>

            <ReactModal
                isOpen={invite}
                style={style}
            >
                <StTitle>맴버 수정하기</StTitle>
                <StClose onClick={()=>{setInvite(false)}}>X</StClose>
                <StLabel>Workspace: {currentWorkspace.title}</StLabel>
                { member.map(ele=>{
                    if (ele.id == userState.id) return null;
                    return (
                        <StButton key={ele.id} onClick={e=>delMember(e, ele.id) }>
                            {ele.name}
                        </StButton>
                    );
                })}
                <STNotice>맴버를 클릭하여 삭제할 수 있습니다.</STNotice>
            </ReactModal>
        </>
    );
};

const StLabel = styled.label`
    display: block;
    margin: 50px auto 10px;
    width: 200px;
    font-size: 18px;
`;

const StButton = styled.button`
    display: inline-block;
    margin: 5px 10px 5px 10px;
    height: 30px;
    width: 130px;
    background-color: #5999FE;
    border: none;
    border-radius: 20px;
    font-size: 20px;
    color: white;
    &:hover {
        background-color:#00368C;
    }
`;

const StClose = styled.button`
    position: absolute;
    display: block;
    width: 25px;
    height: 25px;
    right: 15px;
    top: 15px;
    border: none;
    color: white;
    background-color: #5999FE;
    &:hover {
        background-color: #00368C;
    }
`;

const StTitle = styled.h1`
    display: block;
    margin: 20px 10px 100px 10px;
    width: 320px;
    font-size: 22px;
    text-align: start;
    text-weight: bold;
`;

const STNotice = styled.p`
    display: block;
    margin: 10px;
    padding: 30px 10px;
    font-size: 20px;
    text-align: start;
`;

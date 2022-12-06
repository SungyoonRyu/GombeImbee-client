import { useRecoilValue } from "recoil";
import styled, { keyframes } from "styled-components"
import { workspaceState } from "../../utils/atom";

export default function InfoView(props) {
    const currentWorkspace = useRecoilValue(workspaceState);

    if (props.node == null) return null;
    return (
        <StInform slideAct={props.slideAct}>
            <div>
                url images
            </div>
            <div>
                Title: {props.node.title}
            </div>
            <div>
                Url: {props.node.url}
            </div>
            <div>
                Tag: {props.node.tag}
            </div>
            <div>
                Info: {props.node.info}
            </div>
            <div>
                분류: {currentWorkspace.title+' > '+props.node.fgroup_title}
            </div>
        </StInform>
    );
}

const slideInLeft = keyframes`
  from {
    left: 100%;
  }
  to {
    left: calc(100% - 700px);
  }
`;

const StInform = styled.div`
  position: absolute;
  top: 100px;
  left: 100%;
  width: 700px;
  height: 100%;
  background-color: white;
  animation: ${(props) => (props.slideAct ? slideInLeft : null)} 1s linear forwards;
`;
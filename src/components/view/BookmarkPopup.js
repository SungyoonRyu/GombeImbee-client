import ReactModal from "react-modal";

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
        }
    }

    const inputForm = () => {
        return (
            <form>
                <label>{props.string.title}</label>
                <label>{props.string.label}</label>
                <label>Title</label>
                <input onChange={e=>props.input(e, 'title')}/>
                <label>URL</label>
                <input onChange={e=>props.input(e, 'url')}/>
                <label>Tag</label>
                <input onChange={e=>props.input(e, 'tag')}/>
                <label>Info</label>
                <input onChange={e=>props.input(e, 'info')}/>
                <button onClick={e=>props.handler(e, true)}>
                    저장
                </button>
                <button onClick={e=>props.handler(e, false)}>
                    취소
                </button>
            </form> 
        );
    }

    const completeForm = () => {
        return (
            <form>
                <label>{props.string.title}</label>
                <label>{props.string.complete}</label>    
                <button onClick={props.handler}>
                    확인
                </button>
            </form> 
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
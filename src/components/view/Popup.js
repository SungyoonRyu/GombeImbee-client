import ReactModal from 'react-modal';

export default function Popup(props) {
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
            background: "#ffffe7",
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
                onRequestClose={props.onRequestClose}
                style={style}
            >
                {props.content}
            </ReactModal>
        </>
    );
}

ReactModal.setAppElement('#root');

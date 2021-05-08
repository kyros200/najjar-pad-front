import ReactModal from 'react-modal';
import "../css/main.css";

function Modal(props) {
    const modalStyle = {
        content : {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: "16px",
            maxHeight: "90%",
            maxWidth: "90%"
        }
    };

    return (
        <div>
            <ReactModal
                isOpen={!!props.errorMsg}
                ariaHideApp={false}
                style={modalStyle}
                shouldCloseOnOverlayClick={false}
            >
                {props.errorMsg}
            </ReactModal>
        </div>
    )

}

export default Modal;
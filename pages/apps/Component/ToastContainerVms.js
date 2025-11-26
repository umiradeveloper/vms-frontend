import { Toast, ToastContainer } from "react-bootstrap";


const ToastContainerVms = ({show, setShow, color, header, message}) => {

    return (
      <ToastContainer className="toast-container position-fixed top-0 end-0 p-3">
            <Toast  id="topright-Toast" className={`toast colored-toast bg-${color}-transparent text-${color}`}
                onClose={() => setShow(false)} show={show} delay={3000} autohide>
                <Toast.Header className={`toast-header bg-${color} text-fixed-white`}>
                    {/* <img className="bd-placeholder-img rounded me-2" src="../../../assets/images/brand-logos/toggle-white.png" alt="..." /> */}
                    <strong className="me-auto">{header}</strong>
                </Toast.Header>
                <Toast.Body className="toast-body">
                    {message}
                </Toast.Body>
            </Toast>
        </ToastContainer>  
    );
}

export default ToastContainerVms;
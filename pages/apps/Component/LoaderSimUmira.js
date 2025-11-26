import Link from "next/link";
import { Button, Col } from "react-bootstrap";
import Rodal from "rodal";




const LoadersSimUmira = ({open}) => {
     if (!open) return null;

    return(
       <div className="loader-backdrop d-flex justify-content-center align-items-center"
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                background: "rgba(0, 0, 0, 0.5)", // backdrop overlay
                zIndex: 9999,
            }}
            >
            <div className="d-flex justify-content-center align-items-center flex-wrap gap-2">
                <div  className="spinner-grow text-secondary" role="status">
                    <span  className="visually-hidden">Loading...</span>
                </div>
                <div  className="spinner-grow text-success" role="status">
                    <span  className="visually-hidden">Loading...</span>
                </div>
                <div  className="spinner-grow text-danger" role="status">
                    <span  className="visually-hidden">Loading...</span>
                </div>
                <div  className="spinner-grow text-warning" role="status">
                    <span  className="visually-hidden">Loading...</span>
                </div>
                <div  className="spinner-grow text-info" role="status">
                    <span  className="visually-hidden">Loading...</span>
                </div>
                <div  className="spinner-grow text-light" role="status">
                    <span  className="visually-hidden">Loading...</span>
                </div>
                <div  className="spinner-grow text-dark" role="status">
                    <span  className="visually-hidden">Loading...</span>
                </div>
            </div>
       </div>
    )
}

export default LoadersSimUmira;
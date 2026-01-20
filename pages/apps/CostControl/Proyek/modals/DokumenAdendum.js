import { Button, Modal } from "react-bootstrap";
import dynamic from "next/dynamic";

const DokumenAdendum = ({openModal, setOpenModal}) => {
    return (
        <Modal
            size="xl"
            show={openModal.open}
            onHide={() => setOpenModal({ ...openModal, open: false })}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Dokumen Pendukung</Modal.Title>
            </Modal.Header>

            <Modal.Body style={{ height: "80vh" }}>
                {openModal.file_url ? (
                    <iframe
                        src={openModal.file_url}
                        width="100%"
                        height="100%"
                        style={{ border: "none" }}
                    />
                ) : (
                    <p className="text-muted">Dokumen tidak tersedia</p>
                )}
            </Modal.Body>

            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={() => setOpenModal({ ...openModal, open: false })}
                >
                    Tutup
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default dynamic(() => Promise.resolve(DokumenAdendum), { ssr: false });
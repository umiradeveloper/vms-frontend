import { useState } from "react";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import { FilePond } from "react-filepond";

const FormIndividu = () => {
    const [files, setFiles] = useState([]);
    return (
        <>
            <hr/>
            <div className="row gy-2 pt-3">
                <Col xl={6}>
					<h6 className="mb-3">KTP :</h6>
					<Row>
						<Col xl={12}>
							<Card className="custom-card">
								<Card.Header>
									<div className="card-title">
										Upload KTP
									</div>
								</Card.Header>
								<Card.Body>
									<FilePond className="multiple-filepond"
										files={files}
										onupdatefiles={setFiles}
										allowMultiple={true}
										maxFiles={3}
										// server="@/pages/api"
										name="files" /* sets the file input name, it's filepond by default */
										labelIdle='Drag & Drop your file here or click '
									/>
								</Card.Body>
							</Card>
						</Col>
                    </Row>
                </Col> 
                <Col xl={6}>
					<h6 className="mb-3">KK :</h6>
					<Row>
						<Col xl={12}>
							<Card className="custom-card">
								<Card.Header>
									<div className="card-title">
										Upload KK
									</div>
								</Card.Header>
								<Card.Body>
									<FilePond className="multiple-filepond"
										files={files}
										onupdatefiles={setFiles}
										allowMultiple={true}
										maxFiles={3}
										server="/api"
										name="files" /* sets the file input name, it's filepond by default */
										labelIdle='Drag & Drop your file here or click '
									/>
								</Card.Body>
							</Card>
						</Col>
                    </Row>
                </Col>  
                <Col xl={6}>
					<h6 className="mb-3">NPWP :</h6>
					<Row>
						<Col xl={12}>
							<Card className="custom-card">
								<Card.Header>
									<div className="card-title">
										Upload NPWP
									</div>
								</Card.Header>
								<Card.Body>
									<FilePond className="multiple-filepond"
										files={files}
										onupdatefiles={setFiles}
										allowMultiple={true}
										maxFiles={3}
										server="/api"
										name="files" /* sets the file input name, it's filepond by default */
										labelIdle='Drag & Drop your file here or click '
									/>
								</Card.Body>
							</Card>
						</Col>
                    </Row>
                </Col>  
                  
               <Col xl={6}>
					<h6 className="mb-3">SKK/Sertifikasi :</h6>
					<Row>
						<Col xl={12}>
							<Card className="custom-card">
								<Card.Header>
									<div className="card-title">
										Upload SKK/Sertifikasi
									</div>
								</Card.Header>
								<Card.Body>
									<FilePond className="multiple-filepond"
										files={files}
										onupdatefiles={setFiles}
										allowMultiple={true}
										maxFiles={3}
										server="/api"
										name="files" /* sets the file input name, it's filepond by default */
										labelIdle='Drag & Drop your file here or click '
									/>
								</Card.Body>
							</Card>
						</Col>
                    </Row>
                </Col> 
                <Col xl={6}>
					<h6 className="mb-3">SPPKP :</h6>
					<Row>
						<Col xl={12}>
							<Card className="custom-card">
								<Card.Header>
									<div className="card-title">
										Upload SPPKP
									</div>
								</Card.Header>
								<Card.Body>
									<FilePond className="multiple-filepond"
										files={files}
										onupdatefiles={setFiles}
										allowMultiple={true}
										maxFiles={3}
										server="/api"
										name="files" /* sets the file input name, it's filepond by default */
										labelIdle='Drag & Drop your file here or click '
									/>
								</Card.Body>
							</Card>
						</Col>
                    </Row>
                </Col>  
                 <Col xl={6}>
					<h6 className="mb-3">Dokumen Pendukung Lainnya (jika Ada) :</h6>
					<Row>
						<Col xl={12}>
							<Card className="custom-card">
								<Card.Header>
									<div className="card-title">
										Upload Dokumen Pendukung Lainnya
									</div>
								</Card.Header>
								<Card.Body>
									<FilePond className="multiple-filepond"
										files={files}
										onupdatefiles={setFiles}
										allowMultiple={true}
										maxFiles={3}
										server="/api"
										name="files" /* sets the file input name, it's filepond by default */
										labelIdle='Drag & Drop your file here or click '
									/>
								</Card.Body>
							</Card>
						</Col>
                    </Row>
                </Col>        
            </div>
        </>
    );

}

export default FormIndividu;

import { useState } from "react";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import { FilePond } from "react-filepond";

const FormBesar = () => {
    const [files, setFiles] = useState([]);
    return (
        <>
            <hr/>
            <div className="row gy-2 pt-3">
                  <Col xl={6}>
					<h6 className="mb-3">Akta Pendirian / Perubahan :</h6>
					<Row>
						<Col xl={12}>
							<Card className="custom-card">
								<Card.Header>
									<div className="card-title">
										Upload Akta Pendirian / Perubahan
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
					<h6 className="mb-3">NIB :</h6>
					<Row>
						<Col xl={12}>
							<Card className="custom-card">
								<Card.Header>
									<div className="card-title">
										Upload NIB
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
					<h6 className="mb-3">SBUJK/SBU :</h6>
					<Row>
						<Col xl={12}>
							<Card className="custom-card">
								<Card.Header>
									<div className="card-title">
										Upload SBUJK/SBU
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
					<h6 className="mb-3">ISO :</h6>
					<Row>
						<Col xl={12}>
							<Card className="custom-card">
								<Card.Header>
									<div className="card-title">
										Upload ISO
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
					<h6 className="mb-3">Compro :</h6>
					<Row>
						<Col xl={12}>
							<Card className="custom-card">
								<Card.Header>
									<div className="card-title">
										Upload Compro
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
					<h6 className="mb-3">SKK :</h6>
					<Row>
						<Col xl={12}>
							<Card className="custom-card">
								<Card.Header>
									<div className="card-title">
										Upload SKK
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
					<h6 className="mb-3">SK Kemenkumham :</h6>
					<Row>
						<Col xl={12}>
							<Card className="custom-card">
								<Card.Header>
									<div className="card-title">
										Upload SK Kemenkumham
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

export default FormBesar;

import { Fragment, useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
const Select = dynamic(() => import("react-select"), { ssr: false });
const SunEditor = dynamic(() => import("suneditor-react"), { ssr: false });
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import Link from "next/link";
import dynamic from "next/dynamic";
registerPlugin(FilePondPluginImagePreview, FilePondPluginImageExifOrientation);
import { TitleOptions } from "../../../../shared/data/apps/blogpostdata";
import PageHeader from "../../../../shared/layout-components/page-header/page-header";
import Seo from "../../../../shared/layout-components/seo/seo";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const Blogpost = () => {

	const [files, setFiles] = useState([]);

	return (

		<Fragment>
			<Seo title={"Blog Post"} />
			<PageHeader title='Blog-Post' item='Blog' active_item='Blog-Post' />
			{/* <!-- Row --> */}
			<Row className="row-sm">
				<Col lg={12} md={12}>
					<Card className="custom-card">
						<Card.Body>
							<Form.Group className="form-group">
								<Form.Label>Title</Form.Label>
								<Form.Control type="text" className="form-control" defaultValue="Title" />
							</Form.Group>
							<Form.Group className="form-group">
								<Form.Label>Category</Form.Label>
								<Select options={TitleOptions} classNamePrefix="Select2" placeholder="Category" />
							</Form.Group>
							<Form.Group className="form-group">
								<Form.Label>Type</Form.Label>
								<div className="d-md-flex ad-post-details">
									<label className="custom-radio mb-2 me-4">
										<Form.Check
											label="Image"
											type="radio" name="radios2" defaultValue="option1" />
									</label>
									<label className="custom-radio  mb-2 me-4">
										<Form.Check
											label="Video"
											type="radio" name="radios2" defaultValue="option2" defaultChecked />
									</label>
									<label className="custom-radio mb-2 me-4">
										<Form.Check
											label="Audio"
											type="radio" name="radios2" defaultValue="option3" />
									</label>
									<label className="custom-radio mb-2">
										<Form.Check
											label="Text"
											type="radio" name="radios2" defaultValue="option4" />
									</label>
								</div>
							</Form.Group>
							<div className="ql-wrapper ql-wrapper-demo mb-3">
								<label className='fw-medium form-label'>Post Description</label>
								<div>
									<SunEditor />
								</div>
							</div>
							<label className='fw-medium form-label'>Upload File</label>
							<Form.Group className="p-4 border rounded-6 mb-4">
								<FilePond files={files} onupdatefiles={setFiles} allowMultiple={true} maxFiles={3} server="/mentioned your API" name="files"
									labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>' />
							</Form.Group>
							<Form.Group className="mb-0">
								<label className="form-label fw-medium">Upload Video URL</label>
								<Form.Control type="text" className="form-control" placeholder="https://videos.com" defaultValue="https://www.youtube.com/embed/tMWkeBIohBs" />
							</Form.Group>
						</Card.Body>
						<Card.Footer className="mb-1">
							<Link href="#!" className="btn btn-primary me-1">Post</Link>
							<Link href="#!" className="btn btn-danger me-1">Cancel</Link>
						</Card.Footer>
					</Card>
				</Col>
			</Row>
			{/* <!-- End Row --> */}
		</Fragment>
	);
};
Blogpost.layout = "Contentlayout";
export default Blogpost;

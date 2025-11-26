
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import { Fragment, useState } from "react";
import { Card, Col, FormGroup, Row, Form } from "react-bootstrap";
const Select = dynamic(() => import("react-select"), { ssr: false });
import { ProductCategory } from "../../../shared/data/ecommerce/addproduct";
import PageHeader from "../../../shared/layout-components/page-header/page-header";
import Link from "next/link";
import dynamic from "next/dynamic";
import Seo from "../../../shared/layout-components/seo/seo";
const SunEditor = dynamic(() => import("suneditor-react"), { ssr: false });
registerPlugin(FilePondPluginImagePreview, FilePondPluginImageExifOrientation);

const AddProduct = () => {
	const [files, setFiles] = useState([]);
	return (

		<Fragment>
			<Seo title={"Add-Product"} />
			<PageHeader title='Add-Product' item='ECommerce' active_item='Add-Product' />
			<Row className="row-sm">
				<Col lg={12} md={12}>
					<Card className="custom-card">
						<Card.Body>
							<FormGroup className="form-group">
								<Form.Label className="tx-medium">Product Name</Form.Label>
								<input type="text" className="form-control" placeholder="Name" />
							</FormGroup>
							<FormGroup className="form-group">
								<Form.Label className="tx-medium">Category</Form.Label>
								<Select options={ProductCategory} classNamePrefix="Select2" placeholder="Any" />
							</FormGroup>
							<FormGroup className="form-group">
								<Form.Label className="tx-medium">Price</Form.Label>
								<input type="text" className="form-control" placeholder="Price" />
							</FormGroup>
							<div className="ql-wrapper ql-wrapper-demo mb-3">
								<Form.Label className="tx-medium">Product Description</Form.Label>
								<div id="quillEditor">
									<SunEditor />
								</div>
							</div>
							<Form.Label className="tx-medium">Upload Product</Form.Label>
							<div className="p-4 border rounded-6 mb-0 form-group">
								<FilePond className="multiple-filepond"
									files={files}
									onupdatefiles={setFiles}
									allowMultiple={true}
									maxFiles={3}
									server="/api"
									name="files" /* sets the file input name, it's filepond by default */
									labelIdle='Drag & Drop your file here or click '
								/>

							</div>
						</Card.Body>
						<div className="card-footer">
							<Link href="#!" className="btn btn-primary  me-1">
								Add Product
							</Link>
							<Link href="#!" className="btn btn-danger">
								Cancel
							</Link>
						</div>
					</Card>
				</Col>
			</Row>
		</Fragment>
	);
};
AddProduct.layout = "Contentlayout";
export default AddProduct;

import React, { useState } from "react";
import { Card } from "react-bootstrap";

const ShowCode = ({
	title,
	code,
	customCardClass,
	customCardHeaderClass,
	customCardBodyClass,
	customCardFooterClass,
	children,
}) => {
	const [showCode, setShowCode] = useState(false);

	const toggleCode = () => {
		setShowCode(!showCode);
	};

	return (
		<Card className={`custom-card ${customCardClass}`}>
			<Card.Header className={`justify-content-between ${customCardHeaderClass}`}>
				<div className="card-title" dangerouslySetInnerHTML={{ __html: title }}></div>
				{/* <div className="prism-toggle">
					<button className="btn btn-sm btn-primary-light" onClick={toggleCode}>
						{showCode ? "Hide Code" : "Show Code"}
						<i className={`${showCode ? "ri-eye-off-line" : "ri-eye-line "} ms-2 fs-14 align-middle d-inline-block`}></i>
					</button>
				</div> */}
			</Card.Header>
			
				<Card.Body className={`${customCardBodyClass}`}>
					
					{children}

				</Card.Body>
		</Card>
	);
};

export default ShowCode;

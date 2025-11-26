

import Link from "next/link";
import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
const FooterVms = () => {
    return (
        <Fragment>
            <footer className="footer mt-auto py-3 bg-white text-center">
                <Container>
                    <span className="text-muted"> Copyright © <span id="year">{new Date().getFullYear()}</span> <Link href="#!" className="text-dark fw-semibold">Sistem Informasi Manajemen Umira</Link>.
                        Designed with by <Link href="#!">
                        <span className="fw-semibold text-primary text-decoration-underline">Umira Sinergi Global</span>
                    </Link> All rights reserved
                    </span>
                </Container>
            </footer>
        </Fragment>
    );
};

export default FooterVms;
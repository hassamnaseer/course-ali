import React from "react";
import {Button, Image} from "semantic-ui-react";
import {Col, Container, Nav, Navbar, Row} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./Header.css";
import { header_logo, contact_button } from "../../analytics/analytics"

const Header = () => {
    return (
        <React.Fragment>
            {/* For Other */}
            <header className="header">
                <Container className="header-container" fluid>
                    <Row lg={3}>
                        <Row>
                            <a onClick={header_logo()} href="/">
                                <Image className="header-logo" src="/assets/logo.png"/>
                            </a>
                        </Row>
                        <Row/>
                        {/*<Nav as="ul">
                            <Nav.Item>
                                <Menu/>
                            </Nav.Item>
                        </Nav>*/}

                        <Row style={{textAlign: "right"}}>
                            <Col>
                                <strong>
                                    <a onClick={contact_button("/contactus")} href="/contactus" className="header-contact">
                                        <Button size="tiny" className="header-contact">
                                            CONTACT US
                                        </Button>
                                    </a>
                                </strong>
                            </Col>
                        </Row>
                    </Row>
                </Container>

            </header>

            {/* For Mobile */}
            <header className="header-mobile">
                <Navbar collapseOnSelect expand="lg" variant="light">
                    <Navbar.Brand href="#home">
                        <a onClick={header_logo()} href="/">
                            <Image className="header-logo-mobile" src="/assets/logo.png"/>
                        </a>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        {/*<Nav className="mr-auto">
                            <NavDropdown title="Categories" id="collasible-nav-dropdown">
                                <MobileMenu/>
                            </NavDropdown>
                        </Nav>*/}
                        <Nav>
                            <Nav.Link onClick={contact_button("/contactus")} href="/contactus">Contact Us</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </header>
        </React.Fragment>
    );
};

export default Header;

import React from "react";
import Container from "react-bootstrap/Container";
import BootstrapNavbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";

class Navbar extends React.Component{
    render(): React.ReactNode {

        return (
            <BootstrapNavbar collapseOnSelect expand="lg" className="bg-light shadow sticky-top">
                <Container>
                    <BootstrapNavbar.Brand href="#home">Navbar</BootstrapNavbar.Brand>
                    <BootstrapNavbar.Toggle aria-controls="responsive-navbar-nav" />
                    <BootstrapNavbar.Collapse className="justify-content-end">

                        <Nav>
                            
                        </Nav>

                    </BootstrapNavbar.Collapse>
                </Container>
            </BootstrapNavbar>
        );
    }
}

export default Navbar;
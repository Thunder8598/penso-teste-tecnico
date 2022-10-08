import React from "react";
import Container from "react-bootstrap/Container";
import BootstrapNavbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import NavLink from "react-bootstrap/NavLink";

enum FilterType {
    NAME = "Nome",
    CITY = "Cidade"
}

interface State {
    searchText: string,
    filterType: FilterType
}

class Navbar extends React.Component<React.PropsWithChildren, State> {
    constructor(props: React.PropsWithChildren) {
        super(props);

        this.state = {
            searchText: "",
            filterType: FilterType.NAME
        };
    }

    render(): React.ReactNode {
        const { searchText, filterType } = this.state;

        return (
            <BootstrapNavbar collapseOnSelect expand="lg" className="bg-light shadow sticky-top">
                <Container>
                    <BootstrapNavbar.Brand>
                        <img src="https://www.penso.com.br/wp-content/uploads/2021/12/logo-penso.svg" />
                    </BootstrapNavbar.Brand>

                    <BootstrapNavbar.Toggle aria-controls="responsive-navbar-nav" />
                    <BootstrapNavbar.Collapse className="justify-content-center">

                        <Nav>
                            <Form className="d-flex">
                                <Dropdown>
                                    <Dropdown.Toggle variant="outline-primary" style={{ marginRight: "20px" }}>
                                        Filtrar por: {filterType}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <NavLink onClick={() => this.setState({ filterType: FilterType.NAME })}>Filtrar por: {FilterType.NAME}</NavLink>
                                        <NavLink onClick={() => this.setState({ filterType: FilterType.CITY })}>Filtrar por: {FilterType.CITY}</NavLink>
                                    </Dropdown.Menu>
                                </Dropdown>

                                <Form.Control
                                    onInput={(evt) => this.setState({ searchText: evt.currentTarget.value })}
                                    value={searchText}
                                    type="search"
                                    placeholder={`Filtrar por ${filterType}`}
                                    className="me-2"
                                />

                                <Button variant="outline-primary" onClick={this.onClickBtnSearch}>Buscar</Button>
                            </Form>
                        </Nav>

                    </BootstrapNavbar.Collapse>
                </Container>
            </BootstrapNavbar>
        );
    }

    private onClickBtnSearch = (): void => {
        const { filterType, searchText } = this.state;
        const url = new URL(window.location.origin);
        const queryParamName = filterType == FilterType.NAME ? "name" : "city";

        url.searchParams.set(queryParamName, searchText);
        window.history.pushState(null, "", url);
    }
}

export default Navbar;
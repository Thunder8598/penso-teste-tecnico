import React from "react";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Axios from "axios";

import Components from "../../components/Components";
import Contracts from "../../contracts/Contracts";
import FilterPersons from "../../helpers/FilterPersons";

import "./home.scss";

interface State {
    persons: Contracts.Person[],
    personsFiltered: Contracts.Person[],
    errorOnLoadingPersons: boolean
}

class Home extends React.Component<React.PropsWithChildren, State> {
    constructor(props: React.PropsWithChildren) {
        super(props);

        this.state = {
            persons: [],
            personsFiltered: [],
            errorOnLoadingPersons: false
        };
    }

    render(): React.ReactNode {
        const { persons, personsFiltered, errorOnLoadingPersons } = this.state;

        return (
            <>
                <Components.Navbar filterPersons={this.filterPersons} />

                <main id="home">
                    <Container>
                        {
                            errorOnLoadingPersons ?
                                (
                                    <Alert variant="danger">
                                        Não foi possivel carregar os dados. Por favor tente novamente mais tarde.
                                    </Alert>
                                ) : <></>
                        }

                        {
                            persons.length ?
                                <Components.Listing persons={personsFiltered} /> : <></>
                        }
                    </Container>
                </main>
            </>
        );
    }

    componentDidMount(): void {
        this.loadPersonsData();
    }

    private loadPersonsData = async (): Promise<void> => {
        try {
            const response = await Axios.get<Contracts.Person[]>("https://jsonplaceholder.typicode.com/users");

            this.setState({ persons: response.data, personsFiltered: FilterPersons.filter(response.data) });
        } catch (error) {
            console.error(error);
            this.setState({ errorOnLoadingPersons: true });
        }
    }

    private filterPersons = (): void => {
        const { persons } = this.state;

        this.setState({ personsFiltered: FilterPersons.filter(persons) });
    }
}

export default Home;
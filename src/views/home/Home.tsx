import React from "react";
import Container from "react-bootstrap/Container";
import Axios from "axios";

import Components from "../../components/Components";
import Contracts from "../../contracts/Contracts";

import "./home.scss";

interface State {
    persons: Contracts.Person[],
    personsFiltered: Contracts.Person[]
}

class Home extends React.Component<React.PropsWithChildren, State> {
    constructor(props: React.PropsWithChildren) {
        super(props);

        this.state = {
            persons: [],
            personsFiltered: []
        };
    }

    render(): React.ReactNode {
        const { personsFiltered } = this.state;

        return (
            <>
                <Components.Navbar filterPersons={this.filterPersons} />

                <main id="home">
                    <Container>
                        <Components.Listing persons={personsFiltered} />
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
            const personsFiltered = response.data.sort((a, b) => a.name.localeCompare(b.name))
                .filter((person, index) => index < 5 ? person : null)

            this.setState({ persons: response.data, personsFiltered });
        } catch (error) {
            console.error(error);
        }
    }

    private filterPersons = (): void => {
        const { searchParams } = new URL(window.location.href);

        if (searchParams.get("name")?.trim()?.length)
            this.setState({ personsFiltered: this.filterPersonsByName(searchParams.get("name")?.trim() ?? "") });

        else if (searchParams.get("city")?.trim()?.length)
            this.setState({ personsFiltered: this.filterPersonsByCity(searchParams.get("city")?.trim() ?? "") });

        else
            this.setState({ personsFiltered: this.filterPersonsDefault() });
    }

    private filterPersonsByName = (name: string): Contracts.Person[] => {
        const { persons } = this.state;

        return persons.filter((person) => person.name.toLowerCase().match(name.toLowerCase()))
            .sort((a, b) => a.name.localeCompare(b.name));
    }

    private filterPersonsByCity = (city: string): Contracts.Person[] => {
        const { persons } = this.state;

        return persons.filter((person) => person.address.city.toLowerCase().match(city.toLowerCase()))
            .sort((a, b) => a.address.city.localeCompare(b.address.city));
    }

    private filterPersonsDefault = (): Contracts.Person[] => {
        const { persons } = this.state;

        return persons.sort((a, b) => a.name.localeCompare(b.name))
            .filter((person, index) => index < 5 ? person : null);
    }
}

export default Home;
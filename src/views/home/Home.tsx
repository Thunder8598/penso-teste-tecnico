import React from "react";
import Container from "react-bootstrap/Container";
import Axios from "axios";

import Components from "../../components/Components";
import Contracts from "../../contracts/Contracts";
import Layout from "../Layout";

import "./home.scss";

interface State {
    persons: Contracts.Person[]
}

class Home extends React.Component<React.PropsWithChildren, State> {
    constructor(props: React.PropsWithChildren) {
        super(props);

        this.state = {
            persons: []
        };
    }

    render(): React.ReactNode {
        const { persons } = this.state;

        return (
            <Layout>

                <main id="home">
                    <Container>
                        <Components.Listing persons={persons} />
                    </Container>
                </main>

            </Layout>
        );
    }

    componentDidMount(): void {
        this.loadPersonsData();
    }

    private loadPersonsData = async (): Promise<void> => {
        try {
            const response = await Axios.get<Contracts.Person[]>("https://jsonplaceholder.typicode.com/users");

            this.setState({ persons: response.data });
        } catch (error) {
            console.error(error);
        }
    }
}

export default Home;
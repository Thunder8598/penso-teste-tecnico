import React from "react";
import Card from "react-bootstrap/Card";

import Contracts from "../../contracts/Contracts";

import "./listing.scss";

interface Props {
    persons: Contracts.Person[]
}

class Listing extends React.Component<Props>{

    render(): React.ReactNode {
        const { persons } = this.props;

        return (
            <section className="listing">
                {
                    persons.map(({ name, email, address, id }) => {
                        return (
                            <Card key={id}>
                                <Card.Body>
                                    <Card.Title>{name}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{address.city}</Card.Subtitle>
                                    <Card.Subtitle className="mb-2 text-muted">{email}</Card.Subtitle>
                                </Card.Body>
                            </Card>
                        )
                    })
                }
            </section>
        );
    }
}

export default Listing;
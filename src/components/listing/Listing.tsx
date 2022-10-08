import React from "react";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";

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
                    !persons.length ?
                        (
                            <Alert>
                                Nenhum item encontrado.
                            </Alert>
                        ) : <></>
                }

                <div className="items">
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
                </div>
            </section >
        );
    }
}

export default Listing;
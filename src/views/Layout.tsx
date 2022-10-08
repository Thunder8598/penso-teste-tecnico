import React from "react";

import Components from "../components/Components";

class Layout extends React.Component<React.PropsWithChildren> {
    render(): React.ReactNode {
        return (
            <>
                <Components.Navbar />

                {this.props.children}
            </>
        );
    }
}

export default Layout;
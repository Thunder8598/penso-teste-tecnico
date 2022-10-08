import NavbarComponent from "./navbar/Navbar";
import ListingComponent from "./listing/Listing";

namespace Components {
    export const Navbar = NavbarComponent;
    export const Listing = ListingComponent;

    export type Navbar = NavbarComponent;
    export type Listing = ListingComponent;
}

export default Components;
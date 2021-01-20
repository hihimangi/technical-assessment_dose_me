import React, { Fragment, PureComponent } from "react";
import { Navbar, NavbarToggler, NavbarBrand } from "reactstrap";

class TopNav extends PureComponent {
  public render(): JSX.Element {
    return (
      <Fragment>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/" className="w-100 text-center">
            Wallet
          </NavbarBrand>
          <NavbarToggler />
        </Navbar>
      </Fragment>
    );
  }
}

export { TopNav };

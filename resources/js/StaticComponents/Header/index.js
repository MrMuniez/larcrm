import React, { useState } from 'react';
import {
  Link as RouterLink, Router
} from 'react-router-dom';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  UncontrolledTooltip
} from 'reactstrap';

import { BookmarkFill, Gear, PersonCircle } from 'react-bootstrap-icons';
import { Box } from 'react-bootstrap-icons';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);


  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand>Niego-Tech CRM</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <RouterLink component={NavLink} to='/orders'>
                <BookmarkFill id="orderNavLink" size={24} />
                <UncontrolledTooltip placement="bottom" target="orderNavLink">
                  Naprawy
                    </UncontrolledTooltip>
              </RouterLink>
            </NavItem>
            <NavItem>
              <RouterLink component={NavLink} to='/clients'>
                <PersonCircle id="clientsNavLink" size={24} />
                <UncontrolledTooltip placement="bottom" target="clientsNavLink">
                  Klienci
                    </UncontrolledTooltip>
              </RouterLink>
            </NavItem>
            {/* <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown> */}
            <NavItem>
              <RouterLink component={NavLink} to='/warehouse'>
                <Box id="warehouseNavLink" size={24} />
                <UncontrolledTooltip placement="bottom" target="warehouseNavLink">
                  Magazyn
                    </UncontrolledTooltip>
              </RouterLink>
            </NavItem>
          </Nav>
          <Nav navbar>

            <NavItem>
              <RouterLink component={NavLink} to='/settings'>
                <Gear id="settingsNavLink" size={24} />
                <UncontrolledTooltip placement="bottom" target="settingsNavLink">
                  Ustawienia
                    </UncontrolledTooltip>
              </RouterLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  )
}
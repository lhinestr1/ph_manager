import React, { useState } from "react";
import { X, Car, LogOut } from "lucide-react";
import { HeaderWrapper, Bar, CloseButton, HamburgerButton, HeaderLeft, Logo, NavDesktop, NavMobile, Overlay, Sidebar } from "./styles";
import { connect } from "react-redux";
import { PHManagerState } from "../../store";
import { NavLink } from "react-router-dom";



interface Props {
    loggedIn: boolean;
}

const Header: React.FC<Props> = ({
    loggedIn
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <HeaderWrapper>
                <HeaderLeft>
                    <HamburgerButton onClick={toggleSidebar} aria-label="Toggle Menu">
                        <Bar open={isOpen} />
                        <Bar open={isOpen} />
                        <Bar open={isOpen} />
                    </HamburgerButton>
                    <Logo>Arrecife</Logo>
                </HeaderLeft>

                {loggedIn && (
                    <NavDesktop>
                        <a href="#">Buscador de vehiculos</a>
                        <a href="#">Cerrar sessión</a>
                    </NavDesktop>
                )}

            </HeaderWrapper>

            <Sidebar $show={isOpen}>
                <CloseButton onClick={toggleSidebar} aria-label="Close Menu">
                    <X size={28} color="red" />
                </CloseButton>
                <NavMobile>
                    {loggedIn && (
                        <>
                            <NavLink to="/search" onClick={toggleSidebar}>
                                <Car size={28} color="white" />
                                <p>Buscador de vehiculos</p>
                            </NavLink>
                            <NavLink to="/logout" onClick={toggleSidebar}>
                                <LogOut size={28} color="white" />
                                <p>Cerrar sessión</p>
                            </NavLink>
                        </>
                    )}
                </NavMobile>
            </Sidebar>

            {isOpen && <Overlay onClick={toggleSidebar} />}
        </>
    );
}

export default connect((state: PHManagerState) => ({
    loggedIn: state.session.loggedIn,
}))(Header);

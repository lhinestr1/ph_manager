import React, { useState } from "react";
import { X, Car, LogOut, Settings } from "lucide-react";
import { HeaderWrapper, Bar, CloseButton, HamburgerButton, HeaderLeft, Logo, NavDesktop, NavMobile, Overlay, Sidebar } from "./styles";
import { connect } from "react-redux";
import { PHManagerState } from "../../store";
import { NavLink } from "react-router-dom";
import LogoImg from "../../images/logoarrecife.png"


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
                <HeaderLeft $loggedIn={loggedIn}>
                    {loggedIn && (
                        <HamburgerButton onClick={toggleSidebar} aria-label="Toggle Menu">
                            <Bar open={isOpen} />
                            <Bar open={isOpen} />
                            <Bar open={isOpen} />
                        </HamburgerButton>
                    )}
                    <div className="logoContainer">
                        { loggedIn && <img src={LogoImg} alt="Logo" className="logoimg"/> }
                        <Logo>Arrecife</Logo>
                    </div>
                </HeaderLeft>

                {loggedIn && (
                    <NavDesktop>
                        <NavLink to="/search" onClick={toggleSidebar}>
                            <p>Buscador de vehiculos</p>
                        </NavLink>
                        <NavLink to="/admin" onClick={toggleSidebar}>
                            <p>Administración</p>
                        </NavLink>
                        <NavLink to="/logout" onClick={toggleSidebar}>
                            <p>Cerrar sessión</p>
                        </NavLink>
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
                            <NavLink to="/admin" onClick={toggleSidebar}>
                                <Settings size={28} color="white" />
                                <p>Administración</p>
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

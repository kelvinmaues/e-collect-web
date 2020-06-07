import React from "react";
// assets
import logo from "../../assets/logo.svg";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <header>
      <img src={logo} alt="Ecoleta Logo" />
      {children}
    </header>
  );
};

export default Header;

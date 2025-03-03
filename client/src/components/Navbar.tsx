/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

// Define the type for navigation items
interface NavItem {
  label: string;
  path: string;
}

// Styled Components
const Nav = styled.nav`
    background: #007bff;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
`;

const Logo = styled(Link)`
    font-size: 1.5rem;
    color: white;
    font-weight: bold;
    text-decoration: none;
`;

const MenuButton = styled.button`
    display: none;
    font-size: 1.8rem;
    color: white;
    background: none;
    border: none;
    cursor: pointer;

    @media (max-width: 768px) {
        display: block;
    }
`;

const NavList = styled.ul<{ isOpen: boolean }>`
    list-style: none;
    display: flex;
    gap: 1.5rem;

    @media (max-width: 768px) {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: #007bff;
        flex-direction: column;
        align-items: center;
        padding: 1rem;
        display: ${(props) => (props.isOpen ? 'flex' : 'none')};
    }
`;

const NavLink = styled(Link)<{ isActive: boolean }>`
    color: ${(props) => (props.isActive ? '#ffcc00' : 'white')};
    font-weight: ${(props) => (props.isActive ? 'bold' : 'normal')};
    text-decoration: none;
    font-size: 1rem;
    transition: 0.3s;

    &:hover {
        color: #ffcc00;
    }
`;

// Define the navigation items array with correct type
const navItems: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Users', path: '/users' },
  { label: 'About', path: '/about' }
];

// Navbar Component
const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const location = useLocation();

  return (
    <Nav>
      <Logo to="/">MyApp</Logo>

      {/* Hamburger Button */}
      <MenuButton onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </MenuButton>

      {/* Navigation Links */}
      <NavList isOpen={menuOpen}>
        {navItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              isActive={location.pathname === item.path}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </NavList>
    </Nav>
  );
};

export default Navbar;

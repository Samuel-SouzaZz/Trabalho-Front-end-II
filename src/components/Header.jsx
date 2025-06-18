import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 0 15px;
  }
`;

const LogoSection = styled(Link)`
  text-decoration: none;
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(45deg, #ff6b6b, #feca57);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;

const LogoText = styled.div`
  h1 {
    margin: 0;
    font-size: 1.8rem;
    font-weight: 700;
    background: linear-gradient(45deg, #fff, #f8f9fa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

    @media (max-width: 768px) {
      font-size: 1.4rem;
    }
  }

  span {
    font-size: 0.8rem;
    opacity: 0.9;
    font-weight: 300;
    letter-spacing: 1px;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  transition: all 0.3s ease;
  position: relative;
  background: ${props => props.$isActive ? 'rgba(255, 255, 255, 0.2)' : 'transparent'};
  border: 2px solid ${props => props.$isActive ? 'rgba(255, 255, 255, 0.3)' : 'transparent'};

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 25px;
    background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
`;

const CartLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(45deg, #ff6b6b, #ee5a24);
  border: 2px solid rgba(255, 255, 255, 0.2);

  &:hover {
    background: linear-gradient(45deg, #ee5a24, #ff6b6b);
    transform: translateY(-2px) scale(1.05);
  }
`;

const CartIcon = styled.div`
  font-size: 1.2rem;
`;

const CartBadge = styled.span`
  background: linear-gradient(45deg, #feca57, #ff9ff3);
  color: #333;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: bold;
  position: absolute;
  top: -8px;
  right: -8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  animation: pulse 2s infinite;

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background-color 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileNav = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);

  ${props => props.$isOpen && `
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `}

  @media (max-width: 768px) {
    ${props => props.$isOpen && `display: flex;`}
  }
`;

const Header = ({ cartItemCount }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <HeaderContainer>
      <Container>
        <LogoSection to="/">
          <LogoIcon>VF</LogoIcon>
          <LogoText>
            <h1>Versatile Fashions</h1>
            <span>STYLE • QUALITY • ELEGANCE</span>
          </LogoText>
        </LogoSection>
        
        <Nav>
          <NavLink to="/" $isActive={isActive('/')}>
            🏠 Home
          </NavLink>
          <NavLink to="/produtos" $isActive={isActive('/produtos')}>
            👕 Produtos
          </NavLink>
          <CartLink to="/carrinho" $isActive={isActive('/carrinho')}>
            <CartIcon>🛒</CartIcon>
            <span>Carrinho</span>
            {cartItemCount > 0 && <CartBadge>{cartItemCount}</CartBadge>}
          </CartLink>
        </Nav>

        <MobileMenuButton onClick={toggleMobileMenu}>
          ☰
        </MobileMenuButton>
      </Container>

      <MobileNav $isOpen={isMobileMenuOpen}>
        <NavLink to="/" $isActive={isActive('/')} onClick={closeMobileMenu}>
          🏠 Home
        </NavLink>
        <NavLink to="/produtos" $isActive={isActive('/produtos')} onClick={closeMobileMenu}>
          👕 Produtos
        </NavLink>
        <CartLink to="/carrinho" $isActive={isActive('/carrinho')} onClick={closeMobileMenu}>
          <CartIcon>🛒</CartIcon>
          <span>Carrinho</span>
          {cartItemCount > 0 && <CartBadge>{cartItemCount}</CartBadge>}
        </CartLink>
      </MobileNav>
    </HeaderContainer>
  );
};

export default Header; 
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: white;
  padding: 3rem 0 1rem;
  margin-top: auto;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FooterSection = styled.div`
  h3 {
    font-size: 1.3rem;
    margin-bottom: 1rem;
    color: #feca57;
    font-weight: 600;
  }

  p {
    line-height: 1.6;
    opacity: 0.9;
    margin-bottom: 1rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 0.5rem;
  }

  a {
    color: white;
    text-decoration: none;
    opacity: 0.8;
    transition: all 0.3s ease;

    &:hover {
      opacity: 1;
      color: #feca57;
      transform: translateX(5px);
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  border-radius: 50%;
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px) scale(1.1);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1rem;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.p`
  margin: 0;
  opacity: 0.7;
  font-size: 0.9rem;
`;

const PaymentMethods = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  span {
    font-size: 0.9rem;
    opacity: 0.7;
    margin-right: 0.5rem;
  }
`;

const PaymentIcon = styled.div`
  background: white;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
  color: #2c3e50;
  font-weight: 600;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Container>
        <FooterContent>
          <FooterSection>
            <h3>Versatile Fashions</h3>
            <p>
              Sua loja de moda versátil, onde estilo encontra qualidade. 
              Oferecemos peças únicas que se adaptam ao seu lifestyle.
            </p>
            <SocialLinks>
              <SocialLink href="#" aria-label="Facebook">
                📘
              </SocialLink>
              <SocialLink href="#" aria-label="Instagram">
                📷
              </SocialLink>
              <SocialLink href="#" aria-label="Twitter">
                🐦
              </SocialLink>
              <SocialLink href="#" aria-label="WhatsApp">
                💬
              </SocialLink>
            </SocialLinks>
          </FooterSection>

          <FooterSection>
            <h3>Links Rápidos</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/produtos">Produtos</Link></li>
              <li><Link to="/carrinho">Carrinho</Link></li>
              <li><a href="#sobre">Sobre Nós</a></li>
              <li><a href="#contato">Contato</a></li>
            </ul>
          </FooterSection>

          <FooterSection>
            <h3>Categorias</h3>
            <ul>
              <li><a href="/produtos">Roupas Femininas</a></li>
              <li><a href="/produtos">Roupas Masculinas</a></li>
              <li><a href="/produtos">Joias</a></li>
              <li><a href="/produtos">Eletrônicos</a></li>
              <li><a href="/produtos">Todos os Produtos</a></li>
            </ul>
          </FooterSection>

          <FooterSection>
            <h3>Atendimento</h3>
            <p>📞 (11) 9999-9999</p>
            <p>📧 contato@versatilefashions.com</p>
            <p>📍 São Paulo, SP - Brasil</p>
            <p>🕒 Seg-Sex: 9h às 18h</p>
          </FooterSection>
        </FooterContent>

        <FooterBottom>
          <Copyright>
            © 2024 Versatile Fashions. Todos os direitos reservados.
          </Copyright>
          <PaymentMethods>
            <span>Aceitamos:</span>
            <PaymentIcon>VISA</PaymentIcon>
            <PaymentIcon>MASTER</PaymentIcon>
            <PaymentIcon>PIX</PaymentIcon>
            <PaymentIcon>BOLETO</PaymentIcon>
          </PaymentMethods>
        </FooterBottom>
      </Container>
    </FooterContainer>
  );
};

export default Footer; 
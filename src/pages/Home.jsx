import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import styled from 'styled-components';

const HomeContainer = styled.div`
  min-height: calc(100vh - 80px);
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

// Hero Section
const HeroSection = styled.section`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 0;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.3;
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #fff, #feca57);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const HeroButton = styled(Link)`
  display: inline-block;
  background: linear-gradient(45deg, #ff6b6b, #ee5a24);
  color: white;
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    background: linear-gradient(45deg, #ee5a24, #ff6b6b);
  }
`;

// About Section
const AboutSection = styled.section`
  padding: 4rem 0;
  background: white;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 3rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(45deg, #667eea, #764ba2);
    border-radius: 2px;
  }
`;

const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const AboutContent = styled.div`
  h3 {
    font-size: 1.8rem;
    color: #2c3e50;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #666;
    margin-bottom: 1.5rem;
  }
`;

const AboutImage = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  color: white;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  .icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }

  h4 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  p {
    opacity: 0.9;
  }
`;

// Features Section
const FeaturesSection = styled.section`
  padding: 4rem 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const FeatureCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  h4 {
    font-size: 1.3rem;
    color: #2c3e50;
    margin-bottom: 1rem;
  }

  p {
    color: #666;
    line-height: 1.6;
  }
`;

// Products Section
const ProductsSection = styled.section`
  padding: 4rem 0;
  background: white;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const ViewAllButton = styled(Link)`
  display: inline-block;
  margin: 2rem auto 0;
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  text-align: center;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const ButtonContainer = styled.div`
  text-align: center;
`;

// Newsletter Section
const NewsletterSection = styled.section`
  padding: 4rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
`;

const NewsletterForm = styled.div`
  max-width: 500px;
  margin: 2rem auto 0;
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const NewsletterInput = styled.input`
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  outline: none;

  &::placeholder {
    color: #999;
  }
`;

const NewsletterButton = styled.button`
  background: linear-gradient(45deg, #ff6b6b, #ee5a24);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
`;

const Home = ({ addToCart }) => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const products = await getProducts();
        // Pegar apenas os primeiros 4 produtos para destaque
        setFeaturedProducts(products.slice(0, 4));
      } catch (error) {
        console.error('Erro ao carregar produtos em destaque:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <HomeContainer>
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <HeroTitle>Versatile Fashions</HeroTitle>
          <HeroSubtitle>
            Descubra o seu estilo único com nossa coleção exclusiva de moda versátil. 
            Qualidade, elegância e tendências que se adaptam ao seu lifestyle.
          </HeroSubtitle>
          <HeroButton to="/produtos">
            Explorar Coleção
          </HeroButton>
        </HeroContent>
      </HeroSection>

      {/* About Section */}
      <AboutSection>
        <Container>
          <SectionTitle>Sobre a Versatile Fashions</SectionTitle>
          <AboutGrid>
            <AboutContent>
              <h3>Nossa História</h3>
              <p>
                Fundada em 2020, a Versatile Fashions nasceu da paixão por criar peças 
                que se adaptam a diferentes momentos da sua vida. Acreditamos que a moda 
                deve ser inclusiva, sustentável e acessível a todos.
              </p>
              <p>
                Nossa missão é oferecer roupas de qualidade que combinam conforto, 
                estilo e versatilidade, permitindo que você expresse sua personalidade 
                única em qualquer ocasião.
              </p>
            </AboutContent>
            <AboutImage>
              <div className="icon">👗</div>
              <h4>Moda Versátil</h4>
              <p>
                Peças que se transformam do casual ao elegante, 
                acompanhando seu ritmo de vida dinâmico.
              </p>
            </AboutImage>
          </AboutGrid>
        </Container>
      </AboutSection>

      {/* Features Section */}
      <FeaturesSection>
        <Container>
          <SectionTitle>Por que escolher a Versatile Fashions?</SectionTitle>
          <FeaturesGrid>
            <FeatureCard>
              <div className="icon">✨</div>
              <h4>Qualidade Premium</h4>
              <p>Materiais selecionados e acabamento impecável em cada peça.</p>
            </FeatureCard>
            <FeatureCard>
              <div className="icon">🌱</div>
              <h4>Sustentabilidade</h4>
              <p>Comprometidos com práticas sustentáveis e responsabilidade ambiental.</p>
            </FeatureCard>
            <FeatureCard>
              <div className="icon">🚚</div>
              <h4>Entrega Rápida</h4>
              <p>Entregamos em todo o Brasil com rapidez e segurança.</p>
            </FeatureCard>
            <FeatureCard>
              <div className="icon">💝</div>
              <h4>Atendimento Especial</h4>
              <p>Suporte personalizado para uma experiência de compra única.</p>
            </FeatureCard>
          </FeaturesGrid>
        </Container>
      </FeaturesSection>

      {/* Featured Products */}
      <ProductsSection>
        <Container>
          <SectionTitle>Produtos em Destaque</SectionTitle>
          {loading ? (
            <p>Carregando produtos...</p>
          ) : (
            <>
              <ProductsGrid>
                {featuredProducts.map(product => (
                  <ProductCard key={product.id} product={product} addToCart={addToCart} />
                ))}
              </ProductsGrid>
              <ButtonContainer>
                <ViewAllButton to="/produtos">
                  Ver Todos os Produtos
                </ViewAllButton>
              </ButtonContainer>
            </>
          )}
        </Container>
      </ProductsSection>

      {/* Newsletter */}
      <NewsletterSection>
        <Container>
          <SectionTitle style={{ color: 'white', marginBottom: '1rem' }}>
            Fique por dentro das novidades
          </SectionTitle>
          <p style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '2rem' }}>
            Receba em primeira mão nossas promoções exclusivas e lançamentos
          </p>
          <NewsletterForm>
            <NewsletterInput 
              type="email" 
              placeholder="Seu melhor e-mail"
            />
            <NewsletterButton>
              Inscrever-se
            </NewsletterButton>
          </NewsletterForm>
        </Container>
      </NewsletterSection>
    </HomeContainer>
  );
};

export default Home; 
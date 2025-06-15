import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getProductById } from '../services/api';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 80vh;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  font-size: 1.2rem;
  color: #666;
`;

const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 20px;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const ProductImage = styled.img`
  max-width: 100%;
  max-height: 400px;
  object-fit: contain;
  border-radius: 15px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const CategoryBadge = styled.span`
  position: absolute;
  top: 15px;
  left: 15px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.9), rgba(118, 75, 162, 0.9));
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  backdrop-filter: blur(10px);
  text-transform: capitalize;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
  line-height: 1.3;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 15px;
  border-left: 4px solid #feca57;
`;

const Stars = styled.span`
  color: #feca57;
  font-size: 1.2rem;
  margin-right: 0.5rem;
`;

const RatingText = styled.span`
  color: #666;
  font-weight: 500;
`;

const Price = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(45deg, #27ae60, #2ecc71);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 1rem 0;
`;

const Description = styled.p`
  color: #555;
  font-size: 1.1rem;
  line-height: 1.7;
  margin: 1.5rem 0;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 15px;
  border-left: 4px solid #667eea;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const AddToCartButton = styled.button`
  flex: 2;
  background: linear-gradient(45deg, #ff6b6b, #ee5a24);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 15px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(255, 107, 107, 0.3);
    background: linear-gradient(45deg, #ee5a24, #ff6b6b);
  }

  &:active {
    transform: translateY(-1px);
  }
`;

const QuantityContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 15px;
  padding: 0.5rem;
  gap: 0.5rem;
`;

const QuantityButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const QuantityDisplay = styled.span`
  flex: 1;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
`;

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error('Erro ao carregar produto:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setQuantity(1);
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐');
    }
    if (hasHalfStar) {
      stars.push('⭐');
    }
    while (stars.length < 5) {
      stars.push('☆');
    }
    return stars.join('');
  };

  if (loading) {
    return (
      <Container>
        <LoadingContainer>
          🔄 Carregando produto...
        </LoadingContainer>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container>
        <LoadingContainer>
          ❌ Produto não encontrado
        </LoadingContainer>
      </Container>
    );
  }

  return (
    <Container>
      <ProductContainer>
        <ImageContainer>
          <ProductImage 
            src={product.image} 
            alt={product.title}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x400?text=Imagem+Indisponível';
            }}
          />
          <CategoryBadge>
            {product.category}
          </CategoryBadge>
        </ImageContainer>

        <InfoContainer>
          <Title>{product.title}</Title>
          
          <RatingContainer>
            <Stars>
              {renderStars(product.rating?.rate || 0)}
            </Stars>
            <RatingText>
              {product.rating?.rate || 0}/5 ({product.rating?.count || 0} avaliações)
            </RatingText>
          </RatingContainer>

          <Price>R$ {product.price?.toFixed(2)}</Price>

          <Description>
            {product.description || 'Descrição não disponível.'}
          </Description>

          <ButtonContainer>
            <QuantityContainer>
              <QuantityButton 
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
              >
                −
              </QuantityButton>
              <QuantityDisplay>{quantity}</QuantityDisplay>
              <QuantityButton onClick={increaseQuantity}>
                +
              </QuantityButton>
            </QuantityContainer>
            
            <AddToCartButton onClick={handleAddToCart}>
              🛒 Adicionar ao Carrinho
            </AddToCartButton>
          </ButtonContainer>
        </InfoContainer>
      </ProductContainer>
    </Container>
  );
};

export default ProductDetail; 
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import styled from 'styled-components';

const Card = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  overflow: hidden;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 20px 20px 0 0;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 1rem;
  transition: transform 0.3s ease;

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const CategoryBadge = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.9), rgba(118, 75, 162, 0.9));
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
  backdrop-filter: blur(10px);
  z-index: 2;
  text-transform: capitalize;
`;

const CardContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 1rem;
`;

const ProductTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Stars = styled.span`
  color: #feca57;
  font-size: 1rem;
`;

const RatingText = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

const ProductDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
`;

const Price = styled.span`
  font-size: 1.3rem;
  font-weight: 700;
  color: #27ae60;
  background: linear-gradient(45deg, #27ae60, #2ecc71);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
`;

const ViewButton = styled(Link)`
  flex: 1;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 15px;
  text-decoration: none;
  font-weight: 600;
  text-align: center;
  transition: all 0.3s ease;
  font-size: 0.9rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  }
`;

const AddButton = styled.button`
  flex: 1;
  background: linear-gradient(45deg, #ff6b6b, #ee5a24);
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
    background: linear-gradient(45deg, #ee5a24, #ff6b6b);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
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

  // Função para truncar texto
  const truncateText = (text, maxLength = 100) => {
    if (!text) return 'Descrição não disponível.';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <Card>
      <ImageContainer>
        <ProductImage 
          src={product.image} 
          alt={product.title}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x300?text=Imagem+Indisponível';
          }}
        />
        <CategoryBadge>
          {product.category}
        </CategoryBadge>
      </ImageContainer>
      
      <CardContent>
        <ProductTitle>{product.title}</ProductTitle>
        
        <RatingContainer>
          <Stars>
            {renderStars(product.rating?.rate || 0)}
          </Stars>
          <RatingText>({product.rating?.count || 0})</RatingText>
        </RatingContainer>
        
        <ProductDescription>
          {truncateText(product.description)}
        </ProductDescription>
        
        <PriceContainer>
          <Price>R$ {product.price?.toFixed(2)}</Price>
        </PriceContainer>
        
        <ButtonContainer>
          <ViewButton to={`/produto/${product.id}`}>
            👁️ Ver Detalhes
          </ViewButton>
          <AddButton onClick={handleAddToCart}>
            🛒 Adicionar
          </AddButton>
        </ButtonContainer>
      </CardContent>
    </Card>
  );
};

export default ProductCard; 
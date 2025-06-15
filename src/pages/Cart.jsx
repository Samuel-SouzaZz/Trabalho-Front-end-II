import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import styled from 'styled-components';

const CartContainer = styled.div`
  min-height: calc(100vh - 80px);
  background-color: #f8f9fa;
  padding: 2rem 0;

  @media (max-width: 768px) {
    padding: 1rem 0;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 768px) {
    padding: 0 15px;
  }
`;

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
`;

const PageTitle = styled.h1`
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const CartContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CartItem = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: 100px 1fr auto auto auto;
  gap: 1rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 80px 1fr;
    grid-template-rows: auto auto auto auto;
    gap: 1rem;
    padding: 1rem;
  }
`;

const ItemImage = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  border-radius: 4px;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
    grid-row: 1 / 3;
  }

  @media (max-width: 480px) {
    width: 60px;
    height: 60px;
  }
`;

const ItemInfo = styled.div`
  flex-grow: 1;

  @media (max-width: 768px) {
    grid-column: 2;
  }
`;

const ItemTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: #333;
  line-height: 1.3;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const ItemPrice = styled.p`
  color: #e74c3c;
  font-weight: bold;
  margin: 0;
`;

const ItemQuantity = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  label {
    font-size: 0.9rem;
    color: #666;
  }

  @media (max-width: 768px) {
    grid-column: 1 / 3;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const QuantityButton = styled.button`
  width: 30px;
  height: 30px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  transition: background-color 0.2s ease;

  &:hover:not(:disabled) {
    background-color: #f8f9fa;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const QuantityValue = styled.span`
  min-width: 30px;
  text-align: center;
  font-weight: bold;
`;

const ItemTotal = styled.div`
  text-align: center;

  p {
    margin: 0;
    font-weight: bold;
    color: #2c3e50;
  }

  @media (max-width: 768px) {
    grid-column: 1 / 3;
    text-align: left;
  }
`;

const ItemActions = styled.div`
  @media (max-width: 768px) {
    grid-column: 1 / 3;
  }
`;

const CartSummary = styled.div`
  position: sticky;
  top: 100px;
  height: fit-content;

  @media (max-width: 768px) {
    position: static;
  }
`;

const SummaryCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  h3 {
    margin: 0 0 1.5rem 0;
    color: #2c3e50;
    text-align: center;
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
  }
`;

const SummaryLine = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;

  &.total {
    border-top: 2px solid #eee;
    padding-top: 1rem;
    font-weight: bold;
    font-size: 1.2rem;
    color: #2c3e50;
  }
`;

const Button = styled.button`
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s ease;
  text-decoration: none;
  text-align: center;
  display: inline-block;
  font-size: 1rem;
`;

const PrimaryButton = styled(Button)`
  background-color: #3498db;
  color: white;

  &:hover {
    background-color: #2980b9;
  }
`;

const SecondaryButton = styled(Button)`
  background-color: #95a5a6;
  color: white;

  &:hover {
    background-color: #7f8c8d;
  }
`;

const DangerButton = styled(Button)`
  background-color: #e74c3c;
  color: white;

  &:hover {
    background-color: #c0392b;
  }
`;

const SmallButton = styled(Button)`
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
`;

const LargeButton = styled(Button)`
  padding: 1rem 2rem;
  font-size: 1.1rem;
  width: 100%;
`;

const CheckoutButton = styled(LargeButton)`
  background-color: #3498db;
  color: white;
  margin-bottom: 1rem;

  &:hover {
    background-color: #2980b9;
  }
`;

const ContinueButton = styled(LargeButton)`
  background-color: #95a5a6;
  color: white;
  text-decoration: none;

  &:hover {
    background-color: #7f8c8d;
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  p {
    font-size: 1.2rem;
    color: #666;
    margin-bottom: 2rem;
  }
`;

const Cart = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal, 
    clearCart 
  } = useCart();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId) => {
    if (window.confirm('Tem certeza que deseja remover este item do carrinho?')) {
      removeFromCart(productId);
    }
  };

  const handleClearCart = () => {
    if (window.confirm('Tem certeza que deseja limpar todo o carrinho?')) {
      clearCart();
    }
  };

  if (cartItems.length === 0) {
    return (
      <CartContainer>
        <Container>
          <PageTitle>Carrinho de Compras</PageTitle>
          <EmptyCart>
            <p>Seu carrinho está vazio</p>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <PrimaryButton>
                Continuar Comprando
              </PrimaryButton>
            </Link>
          </EmptyCart>
        </Container>
      </CartContainer>
    );
  }

  return (
    <CartContainer>
      <Container>
        <CartHeader>
          <PageTitle>Carrinho de Compras</PageTitle>
          <SmallButton as={DangerButton} onClick={handleClearCart}>
            Limpar Carrinho
          </SmallButton>
        </CartHeader>

        <CartContent>
          <CartItems>
            {cartItems.map(item => (
              <CartItem key={item.id}>
                <ItemImage>
                  <img src={item.image} alt={item.title} />
                </ItemImage>
                
                <ItemInfo>
                  <ItemTitle>{item.title}</ItemTitle>
                  <ItemPrice>R$ {item.price.toFixed(2)}</ItemPrice>
                </ItemInfo>
                
                <ItemQuantity>
                  <label>Quantidade:</label>
                  <QuantityControls>
                    <QuantityButton 
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </QuantityButton>
                    <QuantityValue>{item.quantity}</QuantityValue>
                    <QuantityButton 
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      +
                    </QuantityButton>
                  </QuantityControls>
                </ItemQuantity>
                
                <ItemTotal>
                  <p>Total: R$ {(item.price * item.quantity).toFixed(2)}</p>
                </ItemTotal>
                
                <ItemActions>
                  <SmallButton 
                    as={DangerButton}
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Remover
                  </SmallButton>
                </ItemActions>
              </CartItem>
            ))}
          </CartItems>
          
          <CartSummary>
            <SummaryCard>
              <h3>Resumo do Pedido</h3>
              <SummaryLine>
                <span>Subtotal:</span>
                <span>R$ {getCartTotal().toFixed(2)}</span>
              </SummaryLine>
              <SummaryLine className="total">
                <span>Total:</span>
                <span>R$ {getCartTotal().toFixed(2)}</span>
              </SummaryLine>
              <CheckoutButton>
                Finalizar Compra
              </CheckoutButton>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <ContinueButton>
                  Continuar Comprando
                </ContinueButton>
              </Link>
            </SummaryCard>
          </CartSummary>
        </CartContent>
      </Container>
    </CartContainer>
  );
};

export default Cart; 
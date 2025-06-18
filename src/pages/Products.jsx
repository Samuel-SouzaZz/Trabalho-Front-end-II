import React, { useState, useEffect } from 'react';
import { getProducts, getProductsByCategory } from '../services/api';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import styled from 'styled-components';

const ProductsContainer = styled.div`
  min-height: calc(100vh - 80px);
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
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

const PageTitle = styled.h1`
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const StatusMessage = styled.div`
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
  color: #666;
`;

const LoadingMessage = styled(StatusMessage)`
  color: #3498db;
`;

const ErrorMessage = styled(StatusMessage)`
  color: #e74c3c;
  background-color: #fdf2f2;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
`;

const NoProductsMessage = styled(StatusMessage)`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Products = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let productsData;
        if (selectedCategory) {
          productsData = await getProductsByCategory(selectedCategory);
        } else {
          productsData = await getProducts();
        }
        setProducts(productsData);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        setError('Erro ao carregar produtos. Tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  if (loading) {
    return (
      <ProductsContainer>
        <Container>
          <LoadingMessage>Carregando produtos...</LoadingMessage>
        </Container>
      </ProductsContainer>
    );
  }

  if (error) {
    return (
      <ProductsContainer>
        <Container>
          <ErrorMessage>{error}</ErrorMessage>
        </Container>
      </ProductsContainer>
    );
  }

  return (
    <ProductsContainer>
      <Container>
        <PageTitle>Nossos Produtos</PageTitle>
        
        <CategoryFilter 
          onCategoryChange={handleCategoryChange}
          selectedCategory={selectedCategory}
        />

        <ProductsGrid>
          {products.map(product => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </ProductsGrid>

        {products.length === 0 && (
          <NoProductsMessage>
            Nenhum produto encontrado nesta categoria.
          </NoProductsMessage>
        )}
      </Container>
    </ProductsContainer>
  );
};

export default Products; 
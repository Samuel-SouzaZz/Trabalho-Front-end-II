import React, { useState, useEffect } from 'react';
import { getCategories } from '../services/api';
import styled from 'styled-components';

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0;
  gap: 1rem;
`;

const FilterTitle = styled.h3`
  color: #2c3e50;
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0;
  text-align: center;
`;

const FilterWrapper = styled.div`
  position: relative;
  min-width: 280px;
  max-width: 400px;
  width: 100%;
`;

const FilterSelect = styled.select`
  width: 100%;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: #2c3e50;
  background: linear-gradient(135deg, #fff 0%, #f8f9fa 100%);
  border: 2px solid transparent;
  border-radius: 25px;
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease;
  appearance: none;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23667eea' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 20px;
  padding-right: 3rem;

  &:hover {
    border-color: rgba(102, 126, 234, 0.3);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }

  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  @media (max-width: 768px) {
    min-width: 250px;
    padding: 0.875rem 1.25rem;
    font-size: 0.95rem;
  }
`;

const FilterOption = styled.option`
  padding: 0.75rem;
  font-weight: 500;
  color: #2c3e50;
  background: white;

  &:hover {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }
`;

const FilterBadges = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 1rem;
  max-width: 600px;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const FilterBadge = styled.button`
  padding: 0.5rem 1rem;
  background: ${props => props.$isActive 
    ? 'linear-gradient(45deg, #667eea, #764ba2)' 
    : 'rgba(255, 255, 255, 0.9)'};
  color: ${props => props.$isActive ? 'white' : '#2c3e50'};
  border: 2px solid ${props => props.$isActive ? 'transparent' : 'rgba(102, 126, 234, 0.2)'};
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    ${props => !props.$isActive && `
      background: linear-gradient(45deg, #667eea, #764ba2);
      color: white;
      border-color: transparent;
    `}
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
`;

const LoadingMessage = styled.div`
  color: #667eea;
  font-style: italic;
  text-align: center;
  padding: 1rem;
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  text-align: center;
  padding: 1rem;
  background: rgba(231, 76, 60, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(231, 76, 60, 0.2);
`;

// Mapeamento das categorias em inglês para português
const categoryTranslations = {
  "men's clothing": "Roupas Masculinas",
  "women's clothing": "Roupas Femininas",
  "jewelery": "Joias & Acessórios",
  "electronics": "Eletrônicos"
};

const CategoryFilter = ({ onCategoryChange, selectedCategory }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Erro ao carregar categorias:', error);
        setError('Erro ao carregar categorias');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSelectChange = (event) => {
    const value = event.target.value;
    onCategoryChange(value === '' ? null : value);
  };

  const handleBadgeClick = (category) => {
    const newCategory = selectedCategory === category ? null : category;
    onCategoryChange(newCategory);
  };

  const getTranslatedCategory = (category) => {
    return categoryTranslations[category] || category;
  };

  if (loading) {
    return (
      <FilterContainer>
        <LoadingMessage>Carregando categorias...</LoadingMessage>
      </FilterContainer>
    );
  }

  if (error) {
    return (
      <FilterContainer>
        <ErrorMessage>{error}</ErrorMessage>
      </FilterContainer>
    );
  }

  return (
    <FilterContainer>
      <FilterTitle>🏷️ Filtrar por Categoria</FilterTitle>
      
      {/* Dropdown para desktop */}
      <FilterWrapper>
        <FilterSelect 
          value={selectedCategory || ''} 
          onChange={handleSelectChange}
        >
          <FilterOption value="">✨ Todas as Categorias</FilterOption>
          {categories.map(category => (
            <FilterOption key={category} value={category}>
              {getTranslatedCategory(category)}
            </FilterOption>
          ))}
        </FilterSelect>
      </FilterWrapper>

      {/* Badges para uma experiência mais visual */}
      <FilterBadges>
        <FilterBadge
          $isActive={selectedCategory === null}
          onClick={() => handleBadgeClick(null)}
        >
          ✨ Todos
        </FilterBadge>
        {categories.map(category => (
          <FilterBadge
            key={category}
            $isActive={selectedCategory === category}
            onClick={() => handleBadgeClick(category)}
          >
            {category === "men's clothing" && "👔"} 
            {category === "women's clothing" && "👗"} 
            {category === "jewelery" && "💎"} 
            {category === "electronics" && "📱"} 
            {getTranslatedCategory(category)}
          </FilterBadge>
        ))}
      </FilterBadges>
    </FilterContainer>
  );
};

export default CategoryFilter; 
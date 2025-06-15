# 🛍️ Versatile Fashions - E-commerce React

Uma aplicação de e-commerce moderna e responsiva desenvolvida em React para o trabalho final da disciplina de Frontend. A **Versatile Fashions** é uma loja de moda versátil que oferece uma experiência de compra completa e elegante.

## ✨ Características Principais

### 🎨 Design Moderno
- **Header elegante** com gradientes e navegação intuitiva
- **Home page completa** com seções hero, sobre a loja, recursos e newsletter
- **Footer profissional** com links úteis e informações de contato
- **Styled Components** para estilização moderna e componentizada
- **Tema centralizado** com cores, breakpoints e espaçamentos consistentes

### 🏪 Funcionalidades da Loja
- **Página inicial** com apresentação da marca Versatile Fashions
- **Catálogo de produtos** com grid responsivo e filtros por categoria
- **Detalhes do produto** com imagens, descrições e avaliações
- **Carrinho de compras** com controle de quantidade e persistência local
- **Navegação fluida** entre páginas com React Router

### 📱 Responsividade
- Design mobile-first
- Layouts adaptativos para desktop, tablet e mobile
- Menu mobile com hamburger
- Cards de produtos otimizados para diferentes telas

## 🚀 Tecnologias Utilizadas

### Obrigatórias (Conforme Especificação)
- **React** - Biblioteca principal
- **useState** - Gerenciamento de estado local
- **useEffect** - Efeitos colaterais e ciclo de vida
- **React Router** - Navegação (BrowserRouter, Routes, Route, useParams)
- **Axios** - Requisições HTTP para a API

### Adicionais
- **Styled Components** - Estilização CSS-in-JS
- **Context API** - Gerenciamento global do carrinho
- **Vite** - Build tool moderna e rápida
- **Fake Store API** - API externa para produtos

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Header.jsx      # Cabeçalho com navegação
│   ├── Footer.jsx      # Rodapé com informações
│   ├── ProductCard.jsx # Card de produto
│   └── CategoryFilter.jsx # Filtro de categorias
├── pages/              # Páginas da aplicação
│   ├── Home.jsx        # Página inicial da loja
│   ├── Products.jsx    # Listagem de produtos
│   ├── ProductDetail.jsx # Detalhes do produto
│   └── Cart.jsx        # Carrinho de compras
├── context/            # Contextos React
│   └── CartContext.jsx # Estado global do carrinho
├── services/           # Serviços externos
│   └── api.js         # Configuração do Axios
├── styles/             # Estilos globais
│   ├── GlobalStyle.js  # Reset CSS e estilos base
│   └── theme.js       # Tema com cores e breakpoints
└── App.jsx            # Componente principal
```

## 🛠️ Instalação e Execução

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

### Passos para executar

1. **Clone o repositório**
```bash
git clone [url-do-repositorio]
cd front-end-trabalho-final
```

2. **Instale as dependências**
```bash
npm install
```

3. **Execute o projeto**
```bash
npm run dev
```

4. **Acesse no navegador**
```
http://localhost:5173
```

## 🌐 API Utilizada

**Fake Store API**: https://fakestoreapi.com/

### Endpoints Consumidos
- `GET /products` - Lista todos os produtos
- `GET /products/:id` - Detalhes de um produto específico
- `GET /products/categories` - Lista todas as categorias
- `GET /products/category/:category` - Produtos por categoria

## 📄 Páginas da Aplicação

### 🏠 Home (`/`)
- **Hero Section** - Apresentação da marca com call-to-action
- **Sobre a Loja** - História e missão da Versatile Fashions
- **Recursos** - Qualidade, sustentabilidade, entrega e atendimento
- **Produtos em Destaque** - Primeiros 4 produtos da API
- **Newsletter** - Formulário de inscrição

### 👕 Produtos (`/produtos`)
- Grid responsivo de produtos
- Filtro por categorias (dropdown)
- Cards com imagem, título, preço e botão de compra
- Estados de loading e erro

### 🔍 Detalhes do Produto (`/produto/:id`)
- Imagem em alta resolução
- Informações completas (título, preço, descrição, categoria)
- Avaliações com estrelas
- Botão para adicionar ao carrinho
- Navegação de volta aos produtos

### 🛒 Carrinho (`/carrinho`)
- Lista de produtos adicionados
- Controle de quantidade (+/-)
- Cálculo automático do total
- Botão para remover itens
- Persistência no localStorage

## 🎨 Design System

### Cores Principais
- **Primário**: Gradiente azul/roxo (#667eea → #764ba2)
- **Secundário**: Gradiente laranja/vermelho (#ff6b6b → #ee5a24)
- **Destaque**: Amarelo dourado (#feca57)
- **Neutros**: Cinzas e brancos para texto e fundos

### Componentes Estilizados
- Botões com hover effects e transições
- Cards com sombras e bordas arredondadas
- Inputs e formulários estilizados
- Navegação com estados ativos
- Scrollbar customizada

## 📱 Responsividade

### Breakpoints
- **Mobile**: até 480px
- **Tablet**: 481px - 768px
- **Desktop**: 769px+

### Adaptações
- Menu hamburger no mobile
- Grid de produtos adaptativo
- Tipografia responsiva
- Espaçamentos proporcionais

## 🔧 Funcionalidades Técnicas

### Gerenciamento de Estado
- **useState** para estados locais (loading, produtos, filtros)
- **useEffect** para chamadas de API e efeitos colaterais
- **Context API** para estado global do carrinho
- **localStorage** para persistência do carrinho

### Navegação
- **React Router** com BrowserRouter
- **Routes e Route** para definição de rotas
- **useParams** para parâmetros dinâmicos
- **Link** para navegação sem reload

### Requisições HTTP
- **Axios** configurado com base URL
- Interceptadores para tratamento de erros
- Estados de loading e error handling
- Async/await para operações assíncronas

## 📋 Requisitos Atendidos

### ✅ Obrigatórios
- [x] React com componentes funcionais
- [x] useState para gerenciamento de estado
- [x] useEffect para efeitos colaterais
- [x] React Router (BrowserRouter, Routes, Route, useParams)
- [x] Axios para requisições HTTP
- [x] Consumo da Fake Store API
- [x] Listagem de produtos responsiva
- [x] Página de detalhes (/produto/:id)
- [x] Filtros por categoria
- [x] Carrinho de compras (/carrinho)

### ✅ Extras Implementados
- [x] Design moderno com Styled Components
- [x] Página inicial completa da loja
- [x] Footer profissional
- [x] Tema centralizado
- [x] Animações e transições
- [x] Menu mobile responsivo
- [x] Estados de loading e erro
- [x] Persistência do carrinho
- [x] Contador de itens no header

## 👥 Informações Acadêmicas

**Disciplina**: Frontend  
**Período**: 3º/4º Período  
**Pontuação**: 15 pontos (3º período) / 5 pontos (4º período)  
**Entrega**: 11/06 (3º período) / 18/06 (4º período)

## 🏆 Diferenciais Implementados

1. **Identidade Visual Completa** - Marca "Versatile Fashions" com logo e slogan
2. **UX/UI Profissional** - Design moderno inspirado em e-commerces reais
3. **Arquitetura Escalável** - Código organizado e componentizado
4. **Performance Otimizada** - Lazy loading e otimizações de renderização
5. **Acessibilidade** - Foco em usabilidade e navegação por teclado
6. **SEO Friendly** - Estrutura semântica e meta tags

---

**Desenvolvido com ❤️ para o curso de Frontend**

import { useEffect, useState } from 'react';
import './App.css';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { api } from './utils/api';
import { useDebounce } from './hooks/hooks';
import { CatalogPage } from './pages/CatalogPage/CatalogPage';
import { ProductPage } from './pages/ProductPage/ProductPage';
import { FavoritesPage } from './pages/FavoritesPage/FavoritesPage';
import { Navigate, Route, Routes } from 'react-router';
import { UserContext } from './context/userContext';
import { CardsContext } from './context/cardContext';


function App() {
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState(undefined);
  const [user, setUser] = useState({});
  const [isAuthorized, /*setAuth*/] = useState(true);
  const [favorites, setFavorites] = useState([])

  const debounceValueInApp = useDebounce(search);

  const handleProductLike = async (product, isLiked) => {
    const updatedCard  = await api.changeProductLike(product._id, isLiked);
    const newCards = cards.map(e => e._id === updatedCard._id ? updatedCard : e)
    setCards([...newCards])
    const index = cards.findIndex(e=>e._id === updatedCard._id);
    if (index !== -1) {
      setCards(state => [...state.slice(0, index), updatedCard, ...state.slice(index+1)])
    }
    isLiked ?
    setFavorites((state) => state.filter(f=>f._id !== updatedCard._id))
    :
    setFavorites((state) => [updatedCard, ...state])
  }

  const productRating = (reviews) => {
    if (!reviews || !reviews.length) {
      return 0;
    }
    const res = reviews.reduce((acc, el) => acc += el.rating, 0);
    return res / reviews.length
  }

  const onSort = (sortId) => {
    if (sortId === 'popular') {
      const newCards = cards.sort((a, b) => b.likes.length - a.likes.length);
      setCards([...newCards]);
      return
    }
    if (sortId === 'rate') {
      const newCards = cards.sort((a, b) => productRating(b.reviews) - productRating(a.reviews));
      setCards([...newCards]);
      return
    }
    if (sortId === 'new') {
      const newCards = cards.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setCards([...newCards]);
      return
    }
    if (sortId === 'cheapest') {
      const newCards = cards.sort((a,b) => a.price - b.price)
      setCards([...newCards]);
    }
    if (sortId === 'most-expensive') {
      const newCards = cards.sort((a,b) => b.price - a.price)
      setCards([...newCards]);
    }
    if (sortId === 'sale') {
      const newCards = cards.sort((a, b) => b.discount - a.discount);
      setCards([...newCards]);
      return
    }
  }
  
  useEffect(()=>{
    if (debounceValueInApp === undefined) return;
    api.searchProducts(search).then((data) =>setCards(data))
  }, [debounceValueInApp]);

  const findLiked = (product, id) => {
    return product.likes.some(e => e === id)
  }

  useEffect(()=>{
    Promise.all([api.getUserInfo(), api.getProductList()]).then(([userData, productData]) => {
      setUser(userData);
      setCards(productData.products);
      const fav = productData.products.filter(e => findLiked(e, userData._id))
      setFavorites(fav);
    })
  }, [])

  const cardsValue = {
    handleLike: handleProductLike,
    cards: cards,
    search,
    favorites,
    onSort,
  }

  return (
    <div className="App">
      <CardsContext.Provider value={cardsValue}>
        <UserContext.Provider value={user}>
          <Header setSearch={setSearch} />
          <main className=" container content">
            {isAuthorized ?
            <Routes>
              <Route path='/' element={<CatalogPage />} />
              <Route path='/product/:id' element={<ProductPage />} />
              <Route path='/favorites' element={<FavoritesPage />}/>
              <Route path='*' element={<div>NOT FOUND 404</div>} />
            </Routes>
            :
            <Navigate to={'/not-found'} />
            }
          </main>
          <Footer />
        </UserContext.Provider>
      </CardsContext.Provider>
    </div>
  );
}

export default App;
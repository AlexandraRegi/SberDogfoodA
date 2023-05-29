import { useEffect, useState, useCallback, useContext } from 'react';
import './App.css';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { api } from './utils/api';
import { useDebounce } from './hooks/hooks';
import { CatalogPage } from './pages/CatalogPage/CatalogPage';
import { ProductPage } from './pages/ProductPage/ProductPage';
import { FavoritesPage } from './pages/FavoritesPage/FavoritesPage';
import { Navigate, Route, Routes } from 'react-router';
import { CardsContext } from './context/cardContext';
import { Modal } from './components/Modal/Modal';
import { LoginForm } from "./components/Auth/Login/Login";
import { RegisterForm } from "./components/Auth/Register/Register";
import { ResetPass } from "./components/Auth/ResetPass/ResetPass";


function App() {
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState(undefined);
  const [user, setUser] = useState({});
  const [isAuthorized, setAuth] = useState(true);
  const [favorites, setFavorites] = useState([])
  const [modalActive, setModalActive] = useState(false);

  const debounceValueInApp = useDebounce(search);

  const handleProductLike = useCallback(async (product, isLiked) => {
    const updatedCard  = await api.changeProductLike(product._id, isLiked);
    setCards(s => [...s.map(e => e._id === updatedCard?._id ? updatedCard : e)]);
    isLiked ?
    setFavorites((state) => state.filter(f=>f._id !== updatedCard._id))
    :
    setFavorites((state) => [updatedCard, ...state])
    return isLiked;
  }, [])

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
      return
    }
    if (sortId === 'most-expensive') {
      const newCards = cards.sort((a,b) => b.price - a.price)
      setCards([...newCards]);
      return
    }
    if (sortId === 'sale') {
      const newCards = cards.sort((a, b) => b.discount - a.discount);
      setCards([...newCards]);
      return
    }
  }
  
  useEffect(()=>{
    if (debounceValueInApp === undefined) return;
    api.searchProducts(debounceValueInApp).then((data) =>setCards(data))
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
    setModalActive,
    user
  }

  const authRoutes = <>
    <Route path="/register" element={
      <Modal modalActive={modalActive} setModalActive={setModalActive} >
        <RegisterForm />
      </Modal>
    } />
    <Route path="/login" element={
      <Modal modalActive={modalActive} setModalActive={setModalActive} >
        <LoginForm />
      </Modal>
    } />
      <Route path="/reset-pass" element={
      <Modal modalActive={modalActive} setModalActive={setModalActive} >
        <ResetPass />
      </Modal>
    } />
  </>

useEffect(()=>{
  if (localStorage.getItem('token')) {
    setAuth(true);
  }
},[]);

  return (
    <div className="App">
      <CardsContext.Provider value={cardsValue}>
          <Header setSearch={setSearch} />
          <main className="container content">
            {isAuthorized ?
            <Routes>
              <Route path='/' element={<CatalogPage />} />
              <Route path='/product/:id' element={<ProductPage />} />
              <Route path='/favorites' element={<FavoritesPage />}/>
              {authRoutes}
              <Route path='*' element={<div>NOT FOUND 404</div>} />
            </Routes>
            :
            <Navigate to={'/not-found'} />
            }
          </main>
          <Footer />
      </CardsContext.Provider>
    </div>
  );
}

export default App;
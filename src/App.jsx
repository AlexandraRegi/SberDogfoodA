import { useEffect, useState } from 'react';
import './App.css';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { api } from './utils/api';
import { useDebounce } from './hooks/hooks';
import { CatalogPage } from './pages/CatalogPage/CatalogPage';
import { ProductPage } from './pages/ProductPage/ProductPage';
import { Navigate, Route, Routes } from 'react-router';


function App() {
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState(undefined);
  const [user, setUser] = useState({});
  const [isAuthorized, setAuth] = useState(true);
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
  }

  const onSort = (sortId) => {
    if (sortId === 'popular') {
      const newCards = cards.sort((a, b) => b.likes.length - a.likes.length);
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

  useEffect(()=>{
    Promise.all([api.getUserInfo(), api.getProductList()]).then(([userData, productData]) => {
      setUser(userData);
      setCards(productData.products);
    })
  }, [])

  return (
    <div className="App">
      <Header setSearch={setSearch} favorites={favorites}/>
      <main className=" container ">
        {isAuthorized ?
        <Routes>
        <Route path='/' element={<CatalogPage onSort={onSort} search={search} cards={cards} user={user} handleProductLike = {handleProductLike}/>} />
        <Route path='/product/:id' element={<ProductPage />} />
        <Route path='/favorites' />
        <Route path='*' element={<div>NOT FOUND 404</div>} />
        </Routes>
        :
        <Navigate to={'/not-found'} />
        }
      </main>
      <Footer />
    </div>
  );
}

export default App;
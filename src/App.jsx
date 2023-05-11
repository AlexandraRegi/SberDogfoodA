import { useEffect, useState } from 'react';
import './App.css';
import { CardList } from './components/CardList/CardList';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { api } from './utils/api';
import { useDebounce } from './hooks/hooks';


function App() {
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState(undefined);
  const [user, setUser] = useState({});

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
      <Header setSearch={setSearch} />
      <main className=" container ">
        <CardList cards={cards} userId={user._id} handleLike = {handleProductLike}/>
      </main>
      <Footer />
    </div>
  );
}

export default App;
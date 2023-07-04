import { useEffect, useState } from "react";
import "./App.css";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { useDebounce } from "./hooks/hooks";
import { CatalogPage } from "./pages/CatalogPage/CatalogPage";
import { ProductPage } from "./pages/ProductPage/ProductPage";
import { FavoritesPage } from "./pages/FavoritesPage/FavoritesPage";
import { Navigate, Route, Routes, useNavigate } from "react-router";
import { Modal } from "./components/Modal/Modal";
import { LoginForm } from "./components/Auth/Login/Login";
import { RegisterForm } from "./components/Auth/Register/Register";
import { ResetPass } from "./components/Auth/ResetPass/ResetPass";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage";
import { useDispatch, useSelector } from "react-redux";
import { getMyUser } from "./storage/slices/userSlice";
import { fetchProducts, searchProductsByQuery } from "./storage/slices/productsSlice";
import { parseJwt } from "./utils/utils";


function App() {
  const [isAuthorized, setAuth] = useState(true);
  const [modalActive, setModalActive] = useState(false);
  const { search } = useSelector(s => s.products)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const debounceValueInApp = useDebounce(search);

  useEffect(() => {
    if (debounceValueInApp === null) {
      return;
    }
    dispatch(searchProductsByQuery(debounceValueInApp));
  }, [debounceValueInApp, dispatch]);

  useEffect(() => {
    const token = parseJwt(localStorage.getItem('token'));
    if (token && (new Date() < new Date(token?.exp * 1e3))) {
      setModalActive(false)
      setAuth(true); 
      dispatch(getMyUser()).then(() => dispatch(fetchProducts())) 
    } else {
      setModalActive(true)
      navigate('/login')
    }
  }, [ dispatch, localStorage.getItem('token')]);

  return (
    <div className="App">
      <Header isAuthorized={isAuthorized} />
      <main className="container content">
        {isAuthorized ? 
          <Routes>
            <Route path="/" element={<CatalogPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/register" element={
                <Modal modalActive={modalActive} setModalActive={setModalActive}>
                  <RegisterForm />
                </Modal>
              }/>
            <Route path="/login" element={
                <Modal modalActive={modalActive} setModalActive={setModalActive}>
                  <LoginForm />
                </Modal>
              }/>
            <Route path="/reset-pass" element={
                <Modal modalActive={modalActive} setModalActive={setModalActive}>
                  <ResetPass />
                </Modal>
              }/>
            <Route path="*" element={<div>NOT FOUND 404</div>} />
          </Routes> 
          : 
          <Navigate to={"/not-found"} />
        }
      </main>
      <Footer />
    </div>
  );
}

export default App;
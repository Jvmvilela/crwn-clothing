import './App.css';

import {BrowserRouter, Route, Routes  } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component.jsx';
import ShopPage from './pages/shop/shop.component.jsx'
import Header from './components/header/header.component';
import SignInAndSignOutUpPage from './pages/sign-in-and-sign-out/sign-in-and-sign-up.component';

function App() {
  
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/signin" element={<SignInAndSignOutUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

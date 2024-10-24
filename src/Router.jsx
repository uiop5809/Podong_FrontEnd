import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage.jsx';
import Nav from './components/common/Nav.jsx';
import Footer from './components/common/Footer';
import ScrollTop from './components/common/ScrollTop.jsx';
import PetItemPage from './pages/PetItemPage/PetItemPage.jsx';
import PetItemListPage from './pages/PetItemPage/PetItemListPage.jsx';

function Router() {
  return (
    <BrowserRouter>
      <div className="Router">
        <Nav />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/petitem" element={<PetItemPage />} />
          <Route path="/petitemList" element={<PetItemListPage />} />
        </Routes>
        <Footer />
        <ScrollTop />
      </div>
    </BrowserRouter>
  );
}

export default Router;

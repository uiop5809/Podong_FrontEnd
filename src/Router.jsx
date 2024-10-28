import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage.jsx';
import Nav from './components/common/Nav.jsx';
import Footer from './components/common/Footer';
import ScrollTop from './components/common/ScrollTop.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx';

function Router() {
  return (
    <BrowserRouter>
      <div className="Router">
        <Nav />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/Login" element={<LoginPage />} />
        </Routes>
        <Footer />
        <ScrollTop />
      </div>
    </BrowserRouter>
  );
}

export default Router;

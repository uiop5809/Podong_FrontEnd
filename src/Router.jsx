import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage.jsx';
import Nav from './components/common/Nav.jsx';
import Footer from './components/common/Footer';
import ScrollTop from './components/common/ScrollTop.jsx';
<<<<<<< Updated upstream
import LoginPage from './pages/LoginPage/LoginPage.jsx';
=======
import PGpay from './pages/PaymentPage/PGpay.jsx';
import Payment from './pages/PaymentPage/Payment.jsx';
import PaymentEnd from './pages/PaymentPage/PaymentEnd.jsx';
>>>>>>> Stashed changes
import PetItemPage from './pages/PetItemPage/PetItemPage.jsx';
import PetItemListPage from './pages/PetItemPage/PetItemListPage.jsx';
import PetItemDetailPage from './pages/PetItemPage/PetItemDetailPage.jsx';

function Router() {
  return (
    <BrowserRouter>
      <div className="Router">
        {/* <Nav /> */}
        <Routes>
          <Route path="/" element={<PaymentEnd/>} />
          <Route path="/" element={<MainPage />} />
<<<<<<< Updated upstream
          <Route path="/Login" element={<LoginPage />} />
=======
>>>>>>> Stashed changes
          <Route path="/petitem" element={<PetItemPage />} />
          <Route path="/petitemList" element={<PetItemListPage />} />
          <Route path="/petitemDetail/:no" element={<PetItemDetailPage/>} />
        </Routes>
        {/* <Footer /> */}
        <ScrollTop />
      </div>
    </BrowserRouter>
  );
}

export default Router;

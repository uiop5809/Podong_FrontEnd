import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage.jsx';
import Nav from './components/common/Nav.jsx';
import Footer from './components/common/Footer';
import ScrollTop from './components/common/ScrollTop.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import PGpay from './pages/PaymentPage/PGpay.jsx';
import Payment from './pages/PaymentPage/Payment.jsx';
import PaymentEnd from './pages/PaymentPage/PaymentEnd.jsx';
import PetItemPage from './pages/PetItemPage/PetItemPage.jsx';
import PetItemListPage from './pages/PetItemPage/PetItemListPage.jsx';
import PetItemDetailPage from './pages/PetItemPage/PetItemDetailPage.jsx';
import UserRegisterPage from './pages/RegisterPage/UserRegisterPage.jsx';
import PetEditPage from './pages/MyPage/PetEditPage.jsx';
import UserEditPage from './pages/MyPage/UserEditPage.jsx';
import MyPage from './pages/MyPage/MyPage.jsx';
import RegisterMissingSavePage from './pages/MyPage/RegisterMissingSavePage.jsx';
import RegisterMissing from './pages/MyPage/RegisterMissing.jsx';
import PetRegisterPage from './pages/RegisterPage/PetRegisterPage.jsx';

function Router() {
  return (
    <BrowserRouter>
      <div className="Router">
        <Nav />
        <Routes>
          <Route path="/" element={<PaymentEnd/>} />
          <Route path="/" element={<MainPage />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/petitem" element={<PetItemPage />} />
          <Route path="/petitemList" element={<PetItemListPage />} />
          <Route path="/petitemDetail/:no" element={<PetItemDetailPage/>} />
          <Route path="/user-register" element={<UserRegisterPage />} />
          <Route path="/petRegister" element={<PetRegisterPage/>} />
          <Route path="/editUserRegister" element={<UserEditPage />} />
          <Route path="/editPetRegister" element={<PetEditPage/>} />
          <Route path="/mypage" element={<MyPage />}/>
          <Route path="/missingSave" element={<RegisterMissingSavePage />} /> 
          <Route path="/missingRegister" element={<RegisterMissing/>} />
        </Routes>
        <Footer />
        <ScrollTop />
      </div>
    </BrowserRouter>
  );
}

export default Router;


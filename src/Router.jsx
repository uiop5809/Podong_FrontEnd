import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage.jsx';
import MainNav from './components/common/MainNav.jsx';
import Footer from './components/common/Footer';
import ScrollTop from './components/common/ScrollTop.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import NanumWrite from './pages/NanumPage/NanumWrite.jsx';
import NanumList from './pages/NanumPage/NanumList.jsx';
import NanumDetail from './pages/NanumPage/NanumDetail.jsx';
import UserRegisterPage from './pages/RegisterPage/UserRegisterPage.jsx';
import UserEditPage from './pages/MyPage/UserEditPage.jsx';
import MyPage from './pages/MyPage/MyPage.jsx';
import RegisterMissingSavePage from './pages/MyPage/RegisterMissingSavePage.jsx';
import RegisterMissing from './pages/MyPage/RegisterMissing.jsx';
import PetRegisterPage from './pages/RegisterPage/PetRegisterPage.jsx';
import ShoppingDetail from './pages/MainPage/ShoppingDetail.jsx';
import SideNav from './components/common/SideNav.jsx';
import WalkPage from './pages/WalkPage/WalkPage.jsx';
import WalkMapPage from './pages/WalkPage/WalkMapPage.jsx';
import WalkJournalPage from './pages/WalkPage/WalkJournalPage.jsx';
import Payment from './pages/PaymentPage/Payment.jsx';
import PaymentEnd from './pages/PaymentPage/PaymentEnd.jsx';
import PetEditPage from './pages/MyPage/PetEditPage.jsx';
import PaymentHistory from './pages/PaymentPage/PaymentHistory.jsx';
import ComunityWrite from './pages/CommunityPage/CommunityWrite.jsx';
import CommunityList from './pages/CommunityPage/CommunityList.jsx';
import CommunityDetail from './pages/CommunityPage/CommunityDetail.jsx';
import HealthCare from './pages/HealthCare/HealthCare.jsx';
import ShoppingCart from './pages/ShoppingCart/ShoppingCart.jsx';
import { CartProvider } from './pages/ShoppingCart/CartContext';
import PayCancelReq from './pages/PaymentPage/PayCancelReq.jsx';
import PaymentCancelDone from './pages/PaymentPage/PaymentCancelDone.jsx';
import RecommendedRoutesPage from './pages/WalkPage/RecommendedRoutesPage.jsx';
import OrderList from './pages/OrderPage/OrderList.jsx';
import OrderDetail from './pages/OrderPage/OrderDetail.jsx';

function Router() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollTop />
        <NavSelector />
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route index element={<MainPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="shoppingDetail/:productId" element={<ShoppingDetail />} />
            <Route path="shoppingCart" element={<ShoppingCart />} />
            <Route path="healthCare" element={<HealthCare />} />

            <Route path="payment" element={<Payment />} />
            <Route path="payCancelReq" element={<PayCancelReq />} />
            <Route path="paymentEnd" element={<PaymentEnd />} />
            <Route path="paymentHistory" element={<PaymentHistory />} />
            <Route path="paymentCancelDone" element={<PaymentCancelDone />} />

            <Route path="mainpage/:userId" element={<MainPage />} />
            <Route path="nanumList" element={<Outlet />}>
              <Route index element={<NanumList />} />
              <Route path="write" element={<NanumWrite />} />
              <Route path="detail/:no" element={<NanumDetail />} />
            </Route>

            <Route path="community" element={<Outlet />}>
              <Route index element={<CommunityList />} />
              <Route path="write" element={<ComunityWrite />} />
              <Route path="detail/:no" element={<CommunityDetail />} />
            </Route>

            <Route path="userRegister/:email" element={<UserRegisterPage />} />
            <Route path="petRegister/:userId" element={<PetRegisterPage />} />

            <Route path="walking" element={<WalkPage />}>
              <Route path="map" element={<WalkMapPage />} />
              <Route path="journal" element={<WalkJournalPage />} />
            </Route>
            <Route path="walking/recommend" element={<RecommendedRoutesPage />} />

            <Route path="myPage/:userId" element={<Outlet />}>
              <Route index element={<MyPage />} />
              <Route path="editPetRegister/:petId" element={<PetEditPage />} />
              <Route path="petRegister" element={<PetRegisterPage />} />
              <Route path="editUserRegister/:userId" element={<UserEditPage />} />
              <Route path="missingSave" element={<RegisterMissingSavePage />} />
              <Route path="missingRegister/:petId" element={<RegisterMissing />} />
            </Route>

            <Route path="orderList" element={<Outlet />}>
              <Route index element={<OrderList />} />
              <Route path="orderDetail/:orderId" element={<OrderDetail />} />
            </Route>
          </Route>
        </Routes>
        <Footer />
      </CartProvider>
    </BrowserRouter>
  );
}
function NavSelector() {
  const location = useLocation();
  const path = location.pathname;

  if (path === '/') {
    return <MainNav />;
  }

  const navPaths = [
    '/shoppingDetail',
    '/shoppingCart',
    '/payment',
    '/nanumList/write',
    '/nanumList',
    '/nanumDetail',
    '/healthCare',
    '/walking',
    '/walkingRecord',
    '/community',
    '/communityDetail',
    '/communityWrite',
    '/myPage/editUserRegister',
    '/myPage/editPetRegister',
    '/myPage/missingRegister',
    '/myPage/missingSave',
    '/myPage',
    '/orderList/orderDetail/orderCancel',
    '/orderList/orderDetail',
    '/orderList',
    '/alert',
  ];
  const isNavPath = navPaths.some(navPath => path.startsWith(navPath));

  return isNavPath ? <SideNav /> : <MainNav />;
}
export default Router;

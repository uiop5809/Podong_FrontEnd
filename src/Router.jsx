import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useLocation,
} from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage.jsx";
import MainNav from "./components/common/MainNav.jsx";
import Footer from "./components/common/Footer";
import ScrollTop from "./components/common/ScrollTop.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import NanumWrite from "./pages/NanumPage/NanumWrite.jsx";
import NanumList from "./pages/NanumPage/NanumList.jsx";
import NanumDetail from "./pages/NanumPage/NanumDetail.jsx";
import UserRegisterPage from "./pages/RegisterPage/UserRegisterPage.jsx";
import UserEditPage from "./pages/MyPage/UserEditPage.jsx";
import MyPage from "./pages/MyPage/MyPage.jsx";
import RegisterMissingSavePage from "./pages/MyPage/RegisterMissingSavePage.jsx";
import RegisterMissing from "./pages/MyPage/RegisterMissing.jsx";
import PetRegisterPage from "./pages/RegisterPage/PetRegisterPage.jsx";
import ShoppingDetail from "./pages/MainPage/ShoppingDetail.jsx";
import SideNav from "./components/common/SideNav.jsx";
import WalkPage from "./pages/WalkPage/WalkPage.jsx";
import Payment from "./pages/PaymentPage/Payment.jsx";
import PaymentEnd from "./pages/PaymentPage/PaymentEnd.jsx";
import CancelPay from "./pages/PaymentPage/CancelPay.jsx";
import PetEditPage from "./pages/MyPage/PetEditPage.jsx";

function Router() {
  return (
    <BrowserRouter>
      <ScrollTop />
      <NavSelector />
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route index element={<Payment />} />
          <Route path="login" element={<LoginPage />} />
          <Route
            path="shoppingDetail/:productId"
            element={<ShoppingDetail />}
          />

          <Route path="nanumList" element={<Outlet />}>
            <Route index element={<NanumList />} />
            <Route path="write" element={<NanumWrite />} />
            <Route path="detail/:no" element={<NanumDetail />} />
          </Route>

          <Route path="userRegister/:userId" element={<UserRegisterPage />} />
          
          <Route path="petRegister" element={<PetRegisterPage />} />

          <Route path="walking" element={<WalkPage />} />

          <Route path="myPage" element={<Outlet />}>
            <Route index element={<MyPage />} />
            <Route path="editPetRegister" element={<PetEditPage />} />
            <Route path="editUserRegister" element={<UserEditPage />} />
            <Route path="missingSave" element={<RegisterMissingSavePage />} />
            <Route path="missingRegister" element={<RegisterMissing />} />
            
          </Route>
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

function NavSelector() {
  const location = useLocation();
  const path = location.pathname;
  const navPaths = [
    "/shoppingDetail",
    "/nanumList/write",
    "/nanumList/detail",
    "/myPage",
  ];
  const isNavPath = navPaths.some((navPath) => path.startsWith(navPath));

  return isNavPath ? <SideNav /> : <MainNav />;
}

export default Router;

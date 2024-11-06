import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { FaRegUserCircle, FaRegBell } from 'react-icons/fa';
import { HiArrowLeft } from 'react-icons/hi';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const SideNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const pageTitles = [
    { path: '/shoppingDetail', title: '상품상세정보' },
    { path: '/shoppingCart', title: '장바구니' },
    { path: '/payment', title: '주문&결제' },
    { path: '/nanumList/write', title: '나눔 글 작성' },
    { path: '/nanumList', title: '나눔 목록' },
    { path: '/nanumDetail', title: '나눔상세정보' },
    { path: '/healthCare', title: '건강관리' },
    { path: '/walking', title: '산책' },
    { path: '/walkingRecord', title: '산책일지' },
    { path: '/community', title: '커뮤니티' },
    { path: '/communityDetail', title: '상세 정보' },
    { path: '/communityWrite', title: '커뮤니티 작성' },
    { path: `/myPage/${userId}/editUserRegister`, title: '회원 정보 수정' },
    { path: `/myPage/${userId}/editPetRegister`, title: '응애 정보 수정' },
    { path: `/myPage/${userId}/missingRegister`, title: '실종 등록' },
    { path: `/myPage/${userId}/missingSave`, title: '실종 등록 완료' },
    { path: '/myPage', title: '마이 페이지' },
    { path: '/orderList/orderDetail/orderCancel', title: '주문 취소' },
    { path: '/orderList/orderDetail', title: '주문 상세' },
    { path: '/orderList', title: '주문 내역' },
    { path: '/alert', title: '알림' },
  ];

  const getPageTitle = (pathname) => {
    const sortedPages = pageTitles.sort((a, b) => b.path.length - a.path.length);
    const exactMatch = sortedPages.find((page) => page.path === pathname);
    if (exactMatch) return exactMatch.title;

    const partialMatch = sortedPages.find((page) => pathname.startsWith(page.path));
    return partialMatch ? partialMatch.title : '제목';
  };

  const pageTitle = getPageTitle(location.pathname);

  const handleUserIconClick = () => {
    if (userId) {
      navigate(`/myPage/${userId}`); // userId가 있으면 마이페이지로 이동
    } else {
      navigate('/login'); // userId가 없으면 로그인 페이지로 이동
    }
  };

  const icons = [
    { icon: <FaRegBell />, link: '/notifications' },
    { icon: <HiOutlineShoppingCart size={17} />, link: '/shoppingCart' },
  ];

  return (
    <Navbar $isScrolled={isScrolled}>
      <BackBtn>
        <StyledHiArrowLeft
          size={18}
          onClick={() => {
            navigate(-1);
          }}
        />
      </BackBtn>
      <SideNaveTitle>{pageTitle}</SideNaveTitle>
      <NavIconWrap>
        {icons.map((item, index) => (
          <Link to={item.link} key={index}>
            {item.icon}
          </Link>
        ))}
        {/* 사용자 아이콘에 직접 onClick 추가 */}
        <span onClick={handleUserIconClick} style={{ cursor: 'pointer' }}>
          <FaRegUserCircle />
        </span>
      </NavIconWrap>
    </Navbar>
  );
};

export default SideNav;

const Navbar = styled.div`
  position: fixed;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 64px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ $isScrolled }) => ($isScrolled ? 'rgba(255, 255, 255, 0.7)' : '#ffffff')};
  backdrop-filter: ${({ $isScrolled }) => ($isScrolled ? 'blur(4px)' : 'none')};
  transition: background-color 0.3s ease, backdrop-filter 0.3s ease;

  @media (min-width: 375px) {
    width: 375px;
  }

  @media (max-width: 500px) {
    width: 100vw;
  }
`;
const BackBtn = styled.div`
  width: 75px;
  display: flex;
  justify-content: start;
`;

const StyledHiArrowLeft = styled(HiArrowLeft)`
  cursor: pointer;
`;

const SideNaveTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  padding-bottom: 2px;
`;
const NavIconWrap = styled.div`
  width: 75px;
  display: flex;
  justify-content: space-between;
`;

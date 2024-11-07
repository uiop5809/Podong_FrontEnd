import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { FaRegUserCircle, FaRegBell } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { images } from '../Images';

const MainNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  // localStorage에서 userId 가져오기
  const [userId, setUserId] = useState(localStorage.getItem('userId'));

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
    <>
      <Navbar $isScrolled={isScrolled}>
        <AnimalWrap>
          <AnimalName>
            <img src={images.logo} alt="로고" />
          </AnimalName>
        </AnimalWrap>
        <NavIconWrap>
          {icons.map((item, index) => (
            <Link to={item.link} key={index}>
              {item.icon}
            </Link>
          ))}
          {/* userId 존재 여부에 따라 동작하는 FaRegUserCircle 아이콘 */}
          <span onClick={handleUserIconClick} style={{ cursor: 'pointer' }}>
            <FaRegUserCircle />
          </span>
        </NavIconWrap>
      </Navbar>
    </>
  );
};

export default MainNav;

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

const AnimalWrap = styled.div`
  @font-face {
    font-family: 'yg-jalnan';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.2/JalnanOTF00.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  font-family: 'yg-jalnan';
  font-weight: bold;
  display: flex;
  align-items: center;
`;

const AnimalName = styled.div`
  margin-left: 5px;
  img {
    width: 90px;
  }
`;

const NavIconWrap = styled.div`
  width: 90px;
  display: flex;
  justify-content: space-between;
`;

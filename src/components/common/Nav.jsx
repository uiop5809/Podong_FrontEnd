import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { FaRegUserCircle, FaRegBell } from 'react-icons/fa';
import { PiDogBold } from 'react-icons/pi';
import { Link } from 'react-router-dom';

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const icons = [
    { icon: <FaRegBell />, link: '/notifications' },
    { icon: <HiOutlineShoppingCart size={17} />, link: '/cart' },
    { icon: <FaRegUserCircle />, link: '/profile' },
  ];

  return (
    <Navbar $isScrolled={isScrolled}>
      <AnimalWrap>
        <PiDogBold color="#FF6E00" />
        <AnimalName>반려동물 이름</AnimalName>
      </AnimalWrap>
      <NavIconWrap>
        {icons.map((item, index) => (
          <Link to={item.link} key={index}>
            {item.icon}
          </Link>
        ))}
      </NavIconWrap>
    </Navbar>
  );
};

export default Nav;

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
  margin-left: 4px;
`;

const NavIconWrap = styled.div`
  width: 90px;
  display: flex;
  justify-content: space-between;
`;

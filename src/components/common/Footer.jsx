import { useState } from 'react';
import styled from 'styled-components';
import { FiGift } from 'react-icons/fi';
import { LuCalendarHeart } from 'react-icons/lu';
import { images } from '../Images';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(null);

  const tabs = [
    {
      key: 'gift',
      icon: <FiGift size={20} color={location.pathname === '/#' ? '#FF6E00' : '#000'} />,
      text: '나눔',
      link: '/petitemList',
    },
    {
      key: 'health',
      icon: <LuCalendarHeart size={20} color={location.pathname === '/#' ? '#FF6E00' : '#000'} />,
      text: '건강관리',
      link: '/#',
    },
    { key: 'home', image: images.home, text: '발바닥천국', link: '/' },
    { key: 'walk', image: activeTab === 'walk' ? images.dogWalkingOn : images.dogWalkingOff, text: '산책', link: '/#' },
    {
      key: 'community',
      image: activeTab === 'community' ? images.communityIconOn : images.communityIconOff,
      text: '집사생활',
      link: '/#',
    },
  ];

  const handleTabClick = tab => {
    setActiveTab(tab);
  };

  return (
    <FooterWrap>
      {tabs.map(({ key, icon, image, text, link }) => (
        <Link to={link} key={key}>
          <FooterTap onClick={() => handleTabClick(key)}>
            {icon ? icon : <FooterImage src={image} alt={text} />}
            <FooterText $active={location.pathname === link}>{text}</FooterText>
          </FooterTap>
        </Link>
      ))}
    </FooterWrap>
  );
};

export default Footer;

const FooterWrap = styled.div`
  position: fixed;
  bottom: 0;
  background-color: #ffffff;
  height: 64px;
  padding: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media (min-width: 375px) {
    width: 375px;
  }

  @media (max-width: 500px) {
    width: 100vw;
  }
`;

const FooterTap = styled.div`
  text-align: center;
  padding-top: 6px;
  width: 64px;
  height: 48px;
  cursor: pointer;
`;

const FooterImage = styled.img`
  width: 20px;
  height: 20px;
`;

const FooterText = styled.div`
  @font-face {
    font-family: 'TTLaundryGothicB';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2403-2@1.0/TTLaundryGothicB.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
  }
  font-family: 'TTLaundryGothicB';
  font-size: 12px;
  color: ${({ $active }) => ($active ? '#FF6E00' : '#000000')};
`;

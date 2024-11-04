import { useState } from 'react';
import styled from 'styled-components';
import { FiGift } from 'react-icons/fi';
import { LuCalendarHeart } from 'react-icons/lu';
import { images } from '../Images';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  const tabs = [
    {
      key: 'nanumList',
      icon: <FiGift size={20} color={activeTab === '/nanumList' ? '#FF6E00' : '#000'} />,
      text: '나눔',
      link: '/nanumList',
    },
    {
      key: 'health',
      icon: <LuCalendarHeart size={20} color={activeTab === '/healthCare' ? '#FF6E00' : '#000'} />,
      text: '건강관리',
      link: '/healthCare',
    },
    {
      key: 'home',
      image: activeTab === '/' ? images.home : images.home,
      text: '발바닥천국',
      link: '/',
    },
    {
      key: 'walking',
      image: activeTab === '/walking/map' ? images.dogWalkingOn : images.dogWalkingOff,
      text: '산책',
      link: '/walking/map',
    },
    {
      key: 'community',
      image: activeTab === '/community' ? images.communityIconOn : images.communityIconOff,
      text: '집사생활',
      link: '/community',
    },
  ];

  const handleTabClick = (tab, link) => {
    setActiveTab(link); // 탭 클릭 시 activeTab 상태 업데이트
  };

  return (
    <>
      <FooterWrap>
        {tabs.map(({ key, icon, image, text, link }) => (
          <Link to={link} key={key}>
            <FooterTap onClick={() => handleTabClick(key, link)}>
              {icon ? icon : <FooterImage src={image} alt={text} />}
              <FooterText $active={activeTab === link}>{text}</FooterText>
            </FooterTap>
          </Link>
        ))}
      </FooterWrap>
    </>
  );
};

export default Footer;

const FooterWrap = styled.div`
  position: fixed;
  bottom: 0;
  background-color: #ffffff;
  z-index: 100;
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

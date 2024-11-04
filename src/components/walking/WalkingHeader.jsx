import React, { useState } from 'react';
import styled from 'styled-components';
import Lottie from 'react-lottie-player';
import walkAnimation from './walkHeader.json';
import { useNavigate, useLocation } from 'react-router-dom';

const WalkingHeader = () => {
  const [name, setName] = useState('환타 왕자');
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabClick = path => {
    navigate(path);
  };

  return (
    <>
      <Header>
        <Title>
          <span>{name}</span>님이 <br />
          산책을 기다리고 있어요!
        </Title>
        <Lottie loop animationData={walkAnimation} play style={{ width: 160, height: 160 }} />
      </Header>
      <HeaderContainer>
        <Tab
          selected={location.pathname === '/walking/map'} // 현재 경로가 "/walking/map"인지 확인
          onClick={() => handleTabClick('/walking/map')}>
          산책 하기
        </Tab>
        <Tab
          selected={location.pathname === '/walking/journal'} // 현재 경로가 "/walking/journal"인지 확인
          onClick={() => handleTabClick('/walking/journal')}>
          산책 일지
        </Tab>
      </HeaderContainer>
    </>
  );
};

export default WalkingHeader;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 1rem;
  transform: translateY(-20px);
`;

const Title = styled.h1`
  font-size: 17px;
  font-weight: 700;
  line-height: 1.3;

  span {
    color: #ff6e00;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  transform: translateY(-30px);
`;

const Tab = styled.div`
  width: 100%;
  text-align: center;
  font-size: 14px;
  font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};
  color: ${({ selected }) => (selected ? '#ff6e00' : 'black')};
  padding: 8px 16px;
  cursor: pointer;
  position: relative;

  &:after {
    content: '';
    display: ${({ selected }) => (selected ? 'block' : 'none')};
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 4px;
    background-color: orange;
  }
`;

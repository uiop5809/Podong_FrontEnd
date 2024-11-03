import React, { useState } from "react";
import styled from "styled-components";
import Lottie from "react-lottie-player";
import walkAnimation from "../../../public/images/walk/walkHeader.json";
import { useNavigate } from "react-router-dom";

const WalkingHeader = () => {
  const [name, setName] = useState("환타 왕자");
  const [activeTab, setActiveTab] = useState("산책하기");
  const navigate = useNavigate();

  const handleTabClick = (tabName, path) => {
    setActiveTab(tabName);
    navigate(path);
  };

  return (
    <>
      <Header>
        <Title>
          <span>{name}</span>님이 <br />
          산책을 기다리고 있어요!
        </Title>
        <Lottie
          loop
          animationData={walkAnimation}
          play
          style={{ width: 160, height: 160 }}
        />
      </Header>
      <HeaderContainer>
        <Tab
          selected={activeTab === "산책 하기"}
          onClick={() => handleTabClick("산책 하기", "/walking/map")}
        >
          산책 하기
        </Tab>
        <Tab
          selected={activeTab === "산책 일지"}
          onClick={() => handleTabClick("산책 일지", "/walking/journal")}
        >
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
  font-weight: ${({ selected }) => (selected ? "bold" : "normal")};
  color: ${({ selected }) => (selected ? "#ff6e00" : "black")};
  padding: 8px 16px;
  cursor: pointer;
  position: relative;

  &:after {
    content: "";
    display: ${({ selected }) => (selected ? "block" : "none")};
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 4px;
    background-color: orange;
  }
`;

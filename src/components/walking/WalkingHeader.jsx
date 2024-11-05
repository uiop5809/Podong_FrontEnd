import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Lottie from "react-lottie-player";
import walkAnimation from "./walkHeader.json";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../apis/AxiosInstance";

const WalkingHeader = () => {
  const [name, setName] = useState("환타 왕자");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.error("User ID not found in local storage");
        return;
      }
      try {
        const response = await axios.post(`/user/${userId}`);
        const data = await response.json();
        setName(data.name);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const handleTabClick = (path) => {
    navigate(path);
  };
  const handleRecommendRoutes = () => {
    navigate("/walking/recommend");
  };

  return (
    <>
      <Header>
        <HeaderBox>
          <Title>
            <span>강아지 집사님!</span> <br />
            산책을 기록해보세요
          </Title>
          <OutlineButton onClick={handleRecommendRoutes}>
            산책 경로 추천
          </OutlineButton>
        </HeaderBox>

        <Lottie
          loop
          animationData={walkAnimation}
          play
          style={{ width: 160, height: 160 }}
        />
      </Header>
      <HeaderContainer>
        <Tab
          selected={location.pathname === "/walking/map"} // 현재 경로가 "/walking/map"인지 확인
          onClick={() => handleTabClick("/walking/map")}
        >
          산책 하기
        </Tab>
        <Tab
          selected={location.pathname === "/walking/journal"} // 현재 경로가 "/walking/journal"인지 확인
          onClick={() => handleTabClick("/walking/journal")}
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

const HeaderBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Title = styled.h1`
  font-size: 17px;
  font-weight: 700;
  line-height: 1.5;

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

const OutlineButton = styled.button`
  padding: 5px 10px;
  background-color: #fff;
  color: #ff6e00;
  border: 1px solid #ff6e00;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #ff6e00;
    color: #ffffff;
  }
`;

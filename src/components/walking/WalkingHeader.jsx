import React, { useState } from "react";
import styled from "styled-components";
import Lottie from "react-lottie-player";
import walkAnimation from "../../../public/images/walk/walkHeader.json";

const WalkingHeader = () => {
  // TODO: 유저 닉네임으로 변경
  const [name, setName] = useState("환타 왕자");

  return (
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
  );
};

export default WalkingHeader;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 1rem;
`;

const Title = styled.h1`
  font-size: 17px;
  font-weight: 700;
  line-height: 1.3;

  span {
    color: #ff6e00;
  }
`;

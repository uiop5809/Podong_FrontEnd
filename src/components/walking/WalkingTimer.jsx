import React, { useState, useEffect } from "react";
import styled from "styled-components";

const WalkingTimer = ({ time, setTime, onStart }) => {
  // 타이머 상태 추가
  const [isRunning, setIsRunning] = useState(false);
  const [isStarted, setIsStarted] = useState(false); // Start 버튼이 눌렸는지 여부를 관리

  // 타이머 기능
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const startTimer = () => {
    setIsRunning(true);
    setIsStarted(true);
    onStart();
  };

  const restartTimer = () => {
    setIsRunning(true);
    setIsStarted(true);
  };

  const pauseTimer = () => setIsRunning(false);
  const stopTimer = () => {
    setIsRunning(false);
    setTime(0);
    setIsStarted(false); // 산책 종료 시 Start 버튼이 다시 보이도록 설정
  };

  return (
    <InputContainer>
      {!isStarted && (
        <TimerButton onClick={startTimer}>
          {time === 0 ? "Start!" : "다시 시작"}
        </TimerButton>
      )}
      {isStarted && (
        <ButtonContainer>
          {isRunning ? (
            <TimerButton onClick={pauseTimer}>일시 정지</TimerButton>
          ) : (
            <RestartButton onClick={restartTimer}>다시 시작</RestartButton>
          )}
          <TimerButton onClick={stopTimer}>산책 종료</TimerButton>
        </ButtonContainer>
      )}
      <br />
      <br />
      <br />
      <br />
      <br />
    </InputContainer>
  );
};

export default WalkingTimer;

const InputContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
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

const TimerButton = styled(OutlineButton)`
  padding: 8px 12px;
  font-size: 15px;
  font-weight: bold;
`;

const RestartButton = styled(TimerButton)`
  background-color: #ff6e00;
  color: #ffffff;
  border: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

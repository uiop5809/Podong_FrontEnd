import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "../../apis/AxiosInstance";

const WalkingTimer = ({
  time,
  setTime,
  onStart,
  isStarted,
  setIsStarted,
  isRunning,
  setIsRunning,
  originCoords,
  destinationCoords,
  routeDistance,
}) => {
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
    setIsStarted(false);
    saveWalkRoute();
  };

  const userId = localStorage.getItem("userId");

  const saveWalkRoute = async () => {
    try {
      const response = await axios.post("/walkRoutes", {
        latitude: originCoords.getLat(),
        longitude: originCoords.getLng(),
        distanceKm: (routeDistance / 1000).toFixed(1),
        walkTime: formatTime(time),
        userId: userId,
      });
    } catch (error) {
      console.error("산책 경로 저장 실패:", error);
    }
  };

  // 초기 시간 형식 변환 함수
  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <InputContainer>
      {!isStarted && (!originCoords || !destinationCoords) && (
        <TimerButton disabled>Start!</TimerButton>
      )}
      {!isStarted && originCoords && destinationCoords && (
        <TimerButton onClick={startTimer}>Start!</TimerButton>
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
